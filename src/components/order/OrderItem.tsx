import { Link, } from "react-router-dom";
import type { charge } from '../../interfaces/catalog'

interface OrderItemProps {
  DataOrder: charge;
}
function OrderItem({ DataOrder }: OrderItemProps) {
  const link = "order/" + DataOrder.uuid;
  const fecha = DataOrder.createat
  const diasSemana: string[] = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const meses: string[] = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

  const dia: number = fecha.getDate();
  const diaSemana: string = diasSemana[fecha.getDay()];
  const mes: string = meses[fecha.getMonth()];
  const año: number = fecha.getFullYear();

  const hora: number = fecha.getHours(); // Obtener la hora (0-23)
  const minutos: number = fecha.getMinutes();
  const fechaFormateada: string = `${diaSemana}, ${dia} de ${mes} del ${año}, a las ${hora}:${minutos}`;
  let StringProduct: string = ""
  DataOrder.products.forEach((a) => {
    StringProduct = StringProduct + ", " + a.name + "(" + a.quantity + ")"
  })
  return (
    <div key={DataOrder.uuid} className='orderItem cardClear'>
      <p className="texthidden">Creado: {fechaFormateada} </p>
      <p><i><b>{(DataOrder.clientname != "Null") ? DataOrder.clientname : "Sin Cliente Asignado"}</b></i> ${DataOrder.finalprice}</p>
      <p>Productos:{StringProduct}</p>
      <Link to={link}><button className='button-5'>Seleccionar</button></Link>
    </div>
  )
}
export default OrderItem;