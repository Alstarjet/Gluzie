import { useState, useEffect } from 'react';
import NewCharge from "../../components/charge/NewCharge"
import type { charge } from '../../interfaces/catalog'
import ClientSearch from '../../components/client/ClientSearch'
import { client } from '../../interfaces/client';
import { v4 as uuidv4 } from 'uuid';
import { ordersDB } from "../../database/ordersDBController";


function NewOrder() {
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
    const saveCharge = () => {
        if (charge.products.length < 1) {
            alert("No tienes productos en la lista")
            return
        }
        const response = window.confirm("¿Quieres guardar el pedido?")
        if (response) {
            ordersDB.addOrder(charge)
            alert("Se Guardo el Pedido")
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
    return (
        <div className='ClearForm'>
            <div className='HeadFormsBack'>
            <button onClick={goBack}>Atras</button>
            <h2>Nuevo Pedido</h2>
            </div>
            {(client === undefined) && <div >
                <ClientSearch Select={setClient} />
            </div>}
            {(client != undefined) && <div >
                Pedido de: {client.name} {client.lastname}
                <button onClick={() => { setClient(undefined) }}> Cambiar</button>
            </div>}
            <NewCharge charge={charge} setCharge={setCharge} />
            <button onClick={saveCharge} className='saveButton'>Guardar Pedido</button>
        </div>
    )
}
export default NewOrder;