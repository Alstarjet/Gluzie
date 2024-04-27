import type { payment } from '../../interfaces/payment'
import formatDate from '../../scripts/formatDate'
interface Payment {
    Payment: payment; // Corrección del nombre de la propiedad y del tipo
}

function PaymentSummary({ Payment }: Payment) {
    return (
        <div className='IteamSummary PaymentIteam'>
            <h4>Pago por la Cantidad: ${Payment.amount}</h4>
            <div>{formatDate(Payment.createat)}</div>
        </div>
    )
}
export default PaymentSummary;