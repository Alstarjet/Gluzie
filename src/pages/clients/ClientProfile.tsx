import { useState, useEffect } from 'react';
import {
    useParams, Link,
} from 'react-router-dom';
import AddPayment from "../../components/payment/AddPayment"
import ClientSummary from "../../components/client/ClientSummary"
import ClientEdit from "../../components/client/ClientEdit"

import { clientsDB } from "../../database/clientsDBController";
import type { client } from '../../interfaces/client'


function ClientProfile() {
    const { clientId } = useParams();
    const [client, setClient] = useState<client>();
    const [contex, setContext] = useState("summary")
    const [update, setUpdate] = useState(2);

    useEffect(() => {
        const fetchClient = async () => {
            if (clientId) {
                try {
                    const clientDB = await clientsDB.findClient(clientId);
                    setClient(clientDB);
                } catch (error) {
                    console.error("Error fetching client:", error);
                }
            }
        };
        fetchClient();
    }, [clientId, update]);

    // Asegurarse de que el cliente exista antes de realizar operaciones basadas en él
    if (!client) {
        return <div>Cargando datos del cliente...</div>;
    }
    const updatefun = () => {
        setUpdate(update + 1)
        setContext("summary")
    }

    return (
        <div key={client.uuid} className='pageUse'>
            <div className='headClient'>
                <button onClick={() => setContext('edit')} className='minButton2 buttonBlue'>Ediar</button>
                <h2>{client.name} {client.lastname}</h2>
            </div>

            <div className="flexdist">
                <button onClick={() => setContext('summary')} className="minButton buttonBlue">Resumen</button>
                <Link to={"/clients/newcharge/" + client.uuid}><button className="minButton buttonPurple">Agregar Cargo</button></Link>
                <button onClick={() => setContext('payment')} className="minButton buttonGreen">Agregar Pago</button>
            </div>
            {contex == "summary" &&
                <div className='viewDataClient'>
                    <p>Dir: {client.address}</p>
                    <p>Tel: {client.phone}</p>
                    <p>Dia Agendado: {client.daywork}</p>
                </div>
            }
            {contex == "summary" && <ClientSummary DataClient={client}></ClientSummary>}
            {contex == "payment" && <AddPayment DataClient={client}></AddPayment>}
            {contex == "edit" && <ClientEdit DataClient={client} Reload={() => updatefun()}></ClientEdit>}


        </div>
    )
}
export default ClientProfile;
 