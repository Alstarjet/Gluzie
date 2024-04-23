import { ReadClientsFromExcel } from "../../scripts/clientsExcel";
import ClientItemExcel from "../../components/client/ClientItemExcel";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { chargesDB } from "../../database/chargesDBController";
import { clientsDB } from "../../database/clientsDBController";

import { clientsExcelData } from "../../interfaces/excel/clientexcelitem";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import type { client } from '../../interfaces/client'
import type { productCartItem, charge } from '../../interfaces/catalog'

function ClientExcel() {
  const [clientsExcel, setClients] = useState<clientsExcelData>()
  const [loading, setLoading] = useState<boolean>(false)
  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const clients = await ReadClientsFromExcel(event)
    setClients(clients)
    setLoading(true)
  }
  const saveClient = (client: client, amount: number) => {
    if (amount > 0) {
      const product: productCartItem = {
        uuid: "nillCustom",
        name: "Adeudo Anterior",
        price: amount,
        key: 'nill',
        page: "",
        quantity: 1,
        total: amount,
        catalog: "",
        type: "Deuda"
      }
      AddChargeDB(product, client)
    }
    clientsDB.addClient(client);
  }
  const AddChargeDB = (product: productCartItem, client: client) => {
    let chargeFinal: charge = {
      clientuuid: client.uuid,
      clientname: client.name +" " +client.lastname,
      uuid: uuidv4(),
      products: [product],
      discount: 0,
      subtotal: product.price,
      finalprice: product.price,
      createat: new Date(),
      updateat: new Date(),
      cloud: 0,
      status:"active"
    }
    chargesDB.addCharge(chargeFinal)
  }
  const saveAllClients = () => {
    const resultado = window.confirm('¿Quieres Guardar estos Clientes?');
    if (!resultado) {
      return
    }
    clientsExcel?.clients.forEach((element) => {
      saveClient(element.client, element.amount)
    })
    setLoading(false)
    setTimeout(() => {
      alert("Clientes Guardados")
    }, 500);
  }
  return (
    <div className='FormView'>
      <h2><PiMicrosoftExcelLogoFill />Carga de Clientes</h2>
      <input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />
      {loading ? <div>
        <h3>Resumen de Clientes</h3>
        <div>
          <p>Total Detectados: {clientsExcel?.clients.length}</p>
          <p>Con Informacion Incompleta: {clientsExcel?.clientsincomplete}</p>
          {(clientsExcel?.issueCharge != undefined && clientsExcel?.issueCharge > 0) && (
            <div>
              <p>Clientes sin cargo previo: {clientsExcel?.issueCharge} </p>
            </div>
          )}

        </div>
        <div>
          <p>Puedes actualizar/completar la información de tus clientes despues de guardarlos, en la pestaña clientes</p>
        </div>
        <button className='grandButton buttonBlue' onClick={() => { saveAllClients() }}>Guardar Clientes</button>
        {clientsExcel?.clients.map(item => (
        <ClientItemExcel DataClient={item} ></ClientItemExcel>
      ))}
      </div> : null}

    </div>
  );
}

export default ClientExcel;
