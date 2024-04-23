import type { charge } from '../../interfaces/catalog'
import formatDate from '../../scripts/formatDate'
interface Charge {
    Charge: charge; // Corrección del nombre de la propiedad y del tipo
}

function ChargeSummary({ Charge }: Charge) {
    let StringProduct: string = ""
    Charge.products.forEach((a) => {
      StringProduct = StringProduct + ", " + a.name + "(" + a.quantity + ")"
    })
    return (
        <div className='IteamSummary ChargeIteam'>
                        <h4>Cargo</h4>
            <div>{formatDate(Charge.createat)}</div>
            <div>Cantidad:${Charge.finalprice}</div>
            <div>Productos:{StringProduct}</div>
        </div>
    )
}
export default ChargeSummary;