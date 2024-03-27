import { useState, useEffect } from 'react';
import { paymentsDB } from "../../database/paymentsDBController";
import { chargesDB } from "../../database/chargesDBController";

import type { client } from '../../interfaces/client'
import type { payment } from '../../interfaces/payment'
import type { charge } from '../../interfaces/catalog'


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
    const [payments, setPayments] = useState<payment[]>([]);
    const [charges, setCharges] = useState<charge[]>([]);
    const [showinfo, setShowInfo] = useState<AmoutInfo[]>([]);
    const [debt, setDebt] = useState(0);

    // Cargar los datos del cliente desde la base de datos
    useEffect(() => {
        async function fetchClientData() {
            try {
                let paymentsClient = await paymentsDB.findPayments(DataClient.clientuuid);
                let chargesClient = await chargesDB.findCharges(DataClient.clientuuid);
                let totalPayments = 0
                let totalCharges = 0
                let showAmouts = []
                console.log(chargesClient)
                for (var i = 0; i < paymentsClient.length; i++) {
                    const AmoutInfo:AmoutInfo = {
                        uuid: paymentsClient[i].uuid,
                        date: paymentsClient[i].date,
                        dateString: paymentsClient[i].date.toLocaleString(),
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
                        date: chargesClient[i].date,
                        dateString: chargesClient[i].date.toLocaleString(),
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
                setPayments(paymentsClient);
                setCharges(chargesClient)
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