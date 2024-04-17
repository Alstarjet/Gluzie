import { useState, useEffect } from 'react';
import { paymentsDB } from "../../database/paymentsDBController";
import { chargesDB } from "../../database/chargesDBController";

import type { client } from '../../interfaces/client'



interface ClientItemProps {
  DataClient: client; // Corrección del nombre de la propiedad y del tipo
}
interface AmoutInfo {
    uuid: string;
    date: Date;
    dateString: string;
    amount: number;
    cloud: 0 | 1;
    type: string;
}

function ClientSummary({ DataClient }:ClientItemProps) {

    const [showinfo, setShowInfo] = useState<AmoutInfo[]>([]);
    const [debt, setDebt] = useState(0);

    // Cargar los datos del cliente desde la base de datos
    useEffect(() => {
        async function fetchClientData() {
            try {
                let paymentsClient = await paymentsDB.findPayments(DataClient.uuid);
                let chargesClient = await chargesDB.findCharges(DataClient.uuid);
                let totalPayments = 0
                let totalCharges = 0
                let showAmouts = []
                console.log(chargesClient)
                for (var i = 0; i < paymentsClient.length; i++) {
                    const AmoutInfo:AmoutInfo = {
                        uuid: paymentsClient[i].uuid,
                        date: paymentsClient[i].createat,
                        dateString: paymentsClient[i].createat.toLocaleString(),
                        amount: paymentsClient[i].amount,
                        cloud:paymentsClient[i].cloud,
                        type: "payment"
                    }
                    totalPayments=totalPayments+paymentsClient[i].amount
                    showAmouts.push(AmoutInfo);
                }
                for (var i = 0; i < chargesClient.length; i++) {
                    const AmoutInfo:AmoutInfo = {
                        uuid: chargesClient[i].uuid,
                        date: chargesClient[i].createat,
                        dateString: chargesClient[i].createat.toLocaleString(),
                        amount: chargesClient[i].finalprice,
                        cloud:chargesClient[i].cloud,
                        type: "charge"
                    }
                    totalCharges=totalCharges+chargesClient[i].finalprice
                    showAmouts.push(AmoutInfo);
                }
                showAmouts.sort((a, b) => b.date.getTime() - a.date.getTime());
                setDebt(totalCharges-totalPayments)
                setShowInfo(showAmouts)

            } catch (error) {
                console.error("Error al cargar los pagos o cargos desde la base de datos: ", error);
            }
        }

        fetchClientData();
    }, []);


    return (
        <div className='pageUse'>
            <h3>Total de deuda: {debt}</h3>
            <div className='tableSumamary'>
                {showinfo.map(item => (
                    <div className={"cardSummary class" + item.type+" Cloud"+item.cloud}>
                        {item.type == "charge" ? (
                            <div>Cargo</div>
                        ) : (
                            <div>Pago</div>
                        )}
                        <div>{item.dateString}</div>
                        <div>$ {item.amount}</div>
                        {item.type == "charge" ? (
                            <div><button>Info</button></div>
                        ) : (
                            <div></div>
                        )}
                        
                    </div>
                ))}
            </div>
        </div>
    )
}
export default ClientSummary;