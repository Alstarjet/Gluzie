import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NewCharge from "../../components/charge/NewCharge"
import type { charge } from '../../interfaces/catalog'
import { client } from '../../interfaces/client';
import { v4 as uuidv4 } from 'uuid';
import { clientsDB } from "../../database/clientsDBController";
import { chargesDB } from "../../database/chargesDBController";


function ClientCharge() {
    const { clientId } = useParams();
    const [client, setClient] = useState<client>()
    const [charge, setCharge] = useState<charge>({
        clientuuid: client != undefined ? (client.uuid) : "Error",
        clientname: client != undefined ? (client.name + " " + client.lastname) : "Error",
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
        const fetchClient = async () => {
            if (clientId) {
                try {
                    const clientDB = await clientsDB.findClient(clientId);
                    setClient(clientDB)
                    setCharge(prevState => ({
                        ...prevState,
                        clientuuid: clientDB.uuid,
                        clientname: clientDB.name + " " + clientDB.lastname
                    }))

                } catch (error) {
                    console.error("Error fetching client:", error);
                }
            }
        };
        fetchClient();
    }, [clientId]);

    const goBack = () => {
        window.history.back();
    };
    const saveCharge = () => {

        if (charge.products.length < 1) {
            alert("No tienes productos en la lista")
            return
        }
        const resultado = window.confirm('¿El cargo es correcto?');
        if (!resultado) {
            return
        }
        chargesDB.addCharge(charge)
        alert("Cargo Guardado")
        window.history.back();
    }

    return (
        <div className='ClearForm'>
            <button onClick={goBack}>Atras</button>
            <h2>Nuevo Cargo</h2>
            {(client != undefined && client.uuid.length > 3) ? <div >
                Cliente: {client.name} {client.lastname}
                <NewCharge client={client} charge={charge} setCharge={setCharge} />
                <button onClick={saveCharge}>Guardar Cargo</button>
            </div> : <div>ERRROR</div>}
        </div>
    )
}
export default ClientCharge;