import { useState, useEffect,Fragment } from 'react';
import { paymentsDB } from "../../database/paymentsDBController";
import { chargesDB } from "../../database/chargesDBController";
import ChargeSummary from '../charge/ChargeSummary'
import PaymentSummary from '../payment/PaymentSummary'

import type { client } from '../../interfaces/client'
import type { charge } from '../../interfaces/catalog'
import type { payment } from '../../interfaces/payment'
import './ClientSummary.css'


interface ClientItemProps {
    DataClient: client; // Corrección del nombre de la propiedad y del tipo
}
interface AmoutInfo {
    payment: payment | undefined
    charge: charge | undefined
    date: Date
    type: string;
}

function ClientSummary({ DataClient }: ClientItemProps) {

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
                    const AmoutInfo: AmoutInfo = {
                        payment: paymentsClient[i],
                        date: paymentsClient[i].createat,
                        charge: undefined,
                        type: "payment"
                    }
                    totalPayments = totalPayments + paymentsClient[i].amount
                    showAmouts.push(AmoutInfo);
                }
                for (var i = 0; i < chargesClient.length; i++) {
                    const AmoutInfo: AmoutInfo = {
                        charge: chargesClient[i],
                        date: chargesClient[i].createat,
                        payment: undefined,
                        type: "charge"
                    }
                    totalCharges = totalCharges + chargesClient[i].finalprice
                    showAmouts.push(AmoutInfo);
                }
                showAmouts.sort((a, b) => b.date.getTime() - a.date.getTime());
                setDebt(totalCharges - totalPayments)
                setShowInfo(showAmouts)

            } catch (error) {
                console.error("Error al cargar los pagos o cargos desde la base de datos: ", error);
            }
        }

        fetchClientData();
    }, []);


    return (
        <div className='pageUse'>
            <h3>Total de deuda: ${debt.toFixed(2)}</h3>
            <div className='tableSummary'>
                {showinfo.map((item, index) => (
                <Fragment key={index}>
                {item.type === "charge" && item.charge ? (
                            <ChargeSummary Charge={item.charge} />
                        ) : (
                            item.type === "payment" && item.payment ? (
                                <PaymentSummary Payment={item.payment} />
                            ) : null
                        )}
                    </Fragment>
                ))}
            </div>
        </div>
    );
}
export default ClientSummary;