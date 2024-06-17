import { Link, } from "react-router-dom";
import type { charge } from '../../interfaces/catalog'
import formatDate from'../../scripts/formatDate'

interface OrderItemProps {
  DataOrder: charge;
}
function OrderItem({ DataOrder }: OrderItemProps) {
  const link = "/order/" + DataOrder.uuid;
  const fechaFormateada: string = formatDate(DataOrder.createat)
  let StringProduct: string = ""
  DataOrder.products.forEach((a) => {
    StringProduct = StringProduct + ", " + a.name + "(" + a.quantity + ")"
  })
  return (
    <div key={DataOrder.uuid} className='orderItem cardClear'>
      <p className="texthidden">{fechaFormateada} </p>
      <p><i><b>{(DataOrder.clientname != "Null") ? DataOrder.clientname : "Sin Cliente Asignado"}</b></i> ${DataOrder.finalprice}</p>
      <p>Productos:{StringProduct}</p>
      <Link to={link}><button className='button-5'>Seleccionar</button></Link>
    </div>
  )
}
export default OrderItem;