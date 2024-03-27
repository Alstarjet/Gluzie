import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { chargesDB } from "../../database/chargesDBController";
import { clientsDB } from "../../database/clientsDBController";
import ClientForm from '../../components/forms/clients'
import type { client } from '../../interfaces/client'
import type { productCartItem,charge } from '../../interfaces/catalog'



function ClientRegister() {
  const [client, setClient] = useState<client>({
    name: '',
    lastname:'',
    age:0,
    clientuuid: uuidv4(),
    city:'',
    neighborhood:'',
    address: '',
    phone: "",
    daywork: '',
    cloud: 0,
    createat:new Date(),
    updateat:new Date()
  });
  const [product, setProduct] = useState<productCartItem>({
    name: "Adeudo Anterior",
    price: 0,
    key: 'nill',
    page: "",
    quantity:1,
    total:0,
    catalog:"",
    type:"Deuda",
    productuuid:uuidv4()
  })

  const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(client)
    const { name, value } = event.target;
    if (name == "age") {
      var valueF = parseFloat(value)
      setClient((prevState) => ({ ...prevState, [name]: valueF }));
    } else {
      setClient((prevState) => ({ ...prevState, [name]: value }));
    }

  };

  const handleAddClient = () => {
    if (
      client.name &&

      client.clientuuid &&
      client.address &&
      client.phone &&
      client.daywork
    ) {
      const resultado = window.confirm('¿Los datos del cliente son correctos?');
      if (resultado) {
        if (product.price < 1) {
          const resultado = window.confirm('¿Continuar el Guardado sin Adeudo Anterior?');
          if (!resultado) {
            return
          }
        }
        AddChargeDB(product, client)
        clientsDB.addClient(client);
        setClient({
          name: '',
          lastname:'',
          age:0,
          clientuuid: uuidv4(),
          city:'',
          neighborhood:'',
          address: '',
          phone: '',
          daywork: '',
          cloud: 0,
          createat:new Date(),
          updateat:new Date()
        })
        setProduct({
          name: "Adeudo Anterior",
          price: 0,
          key: 'nill',
          page: "",
          quantity:1,
          total:0,
          catalog:"",
          type:"Deuda",
          productuuid:uuidv4()
        })
      } else {
        alert('Guardado Cancelado');
      }

    }
    else {
      alert("Faltan Datos")
    }
  }


  const handleChang = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name == "price") {
      var intValue = parseFloat(value)
      setProduct(prevProduct => ({
        ...prevProduct,
        [name]: intValue
      }));
    } else {
      setProduct(prevProduct => ({
        ...prevProduct,
        [name]: value
      }));
    }

  }
  const AddChargeDB = (product:productCartItem, client:client) => {
    let chargeFinal:charge = {
      clientuuid: client.clientuuid,
      clientname: client.name,
      uuid: uuidv4(),
      products: [product],
      discount: 0,
      subtotal: product.price,
      finalprice: product.price,
      date: new Date(),
      cloud: 0
    }
    if (chargeFinal.products.length < 1 || chargeFinal.finalprice < 1) {
      alert("Necesitas Agregar Productos");
      return
    }
    chargesDB.addCharge(chargeFinal)

  }

  return (
      <div className='FormView'>
              <h2>Registrar Cliente</h2>

        <ClientForm client={client} onChange={handleChange} />
          <h4>Adeudo Anterior:</h4>
          <label>
            Cantidad $:
            <input type="number" name="price" value={product.price} onChange={handleChang} />
          </label>
        <button onClick={handleAddClient} className='grandButton buttonBlue'>Crear Cliente</button>
      </div>
  );
}

export default ClientRegister;
