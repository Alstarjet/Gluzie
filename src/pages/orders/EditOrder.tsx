import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewCharge from "../../components/charge/NewCharge"
import type { charge } from '../../interfaces/catalog'
import ClientSearch from '../../components/client/ClientSearch'
import { client } from '../../interfaces/client';
import { v4 as uuidv4 } from 'uuid';
import { ordersDB } from "../../database/ordersDBController";
import { chargesDB } from "../../database/chargesDBController";
import { clientsDB } from "../../database/clientsDBController";


function EditOrder() {
    const { orderId } = useParams();
    const [client, setClient] = useState<client>()
    const [charge, setCharge] = useState<charge>({
        clientuuid: client != undefined ? (client.uuid) : "Null",
        clientname: client != undefined ? (client.name + " " + client.lastname) : "Null",
        uuid: uuidv4(),
        products: [],
        discount: NaN,
        subtotal: 0,
        finalprice: 0,
        createat: new Date(),
        updateat: new Date(),
        cloud: 0,
        status: "active"
    })
    useEffect(() => {
        const fetchOrder = async () => {
            if (orderId) {
                try {
                    const OrderDB = await ordersDB.findOrder(orderId);
                    setCharge(OrderDB)
                    if (OrderDB.clientuuid != "Null") {
                        const ClientDB = await clientsDB.findClient(OrderDB.clientuuid)
                        setCharge(prevState => ({
                            ...prevState,
                            clientname: ClientDB.name+" "+ClientDB.lastname,
                            clientuuid: ClientDB.uuid
                        }));
                        setClient(ClientDB)
                    }

                } catch (error) {
                    console.error("Error fetching client:", error);
                }
            }
        };
        fetchOrder();
    }, [orderId]);
    const saveCharge = () => {
        if (charge.products.length < 1) {
            alert("No tienes productos en la lista")
            return
        }
        const response = window.confirm("¿Quieres guardar el pedido?")
        if (response) {
            ordersDB.editOrder(charge)
            alert("Se Actualizo el Pedido")
            window.history.back();
        }
    }
    useEffect(() => {
        if (client != undefined) {
            setCharge(prevState => ({
                ...prevState,
                clientname: client.name + " " + client.lastname,
                clientuuid: client.uuid
            }));
        } else {
            setCharge(prevState => ({
                ...prevState,
                clientname: "Null",
                clientuuid: "Null"
            }));
        }
    }, [client])
    const goBack = () => {
        window.history.back();
    };
    const credited = () => {
        if (charge.clientname == "Null" || charge.clientuuid.length < 8) {
            alert("Solo se pueden convertir a cargo los Pedidos con cliente asignado")
            return
        }
        const resultado = window.confirm('Al convertir a cargo se eliminara de la lista de pedidos y se agregara como cargo al cliente:'+charge.clientname+ ':¿Continuamos?');
        if (resultado) {
            let chargeDoc = {...charge}
            chargeDoc.status="active"
            chargeDoc.cloud=0
            chargeDoc.createat=new Date()
            chargesDB.addCharge(chargeDoc);
            let crediterDoc = {...charge}
            crediterDoc.status="credited"
            ordersDB.editOrder(crediterDoc)
            goBack()
        }
    }
    return (
        <div className='viewFull ClearForm'>
            <button onClick={goBack}>Atras</button>
            <h3>Pedido del {date(charge.createat)}</h3>
            {(client === undefined) && <div >
                <ClientSearch Select={setClient} />
            </div>}
            {(client != undefined) && <div >
                Pedido de: {client.name} {client.lastname}
                <button onClick={() => { setClient(undefined) }}> Cambiar</button>
            </div>}
            <NewCharge client={client} charge={charge} setCharge={setCharge} />
            <button onClick={credited}>Convertir a Cargo</button>
            <button onClick={saveCharge}>Guardar Cambios</button>
        </div>
    )
}
export default EditOrder;
function date(createat:Date):string{
    const fecha = createat
  const diasSemana: string[] = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const meses: string[] = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  const dia: number = fecha.getDate();
  const diaSemana: string = diasSemana[fecha.getDay()];
  const mes: string = meses[fecha.getMonth()];
  const año: number = fecha.getFullYear();

  const hora: number = fecha.getHours(); // Obtener la hora (0-23)
  const minutos: number = fecha.getMinutes();
  const fechaFormateada: string = `${diaSemana}, ${dia} de ${mes} del ${año}, a las ${hora}:${minutos}`;
  return fechaFormateada
}