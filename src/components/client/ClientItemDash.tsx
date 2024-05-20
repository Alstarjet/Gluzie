import { Link, } from "react-router-dom";
import type { client } from '../../interfaces/client'
import './ClientItemDash.css'


interface ClientData {
  Client: client
  Debt: number
  LastCharge: number
  LastPayment: number
}

function ClientItemDash({ ClientData }: { ClientData: ClientData }) {
  const link = "/clients/profile/" + ClientData.Client.uuid
  let classstatus = 'cardColorOne'
  if (ClientData.LastPayment < 5 || ClientData.LastCharge < 5) {
    classstatus = 'cardColorTwo'
  }
  return (
    <div key={ClientData.Client.uuid} className={classstatus + ' cardClientDash'}>
      <div >
        <div >
          <h3>{ClientData.Client.name}</h3>
          <h4 >{ClientData.Client.lastname}</h4>
        </div>
        <div className="leftElementDash">
          <h3>Deuda: ${ClientData.Debt}</h3>
          <p>{ClientData.Client.neighborhood}, {ClientData.Client.address}</p>
        </div>
      </div>
      <div>
        <Link to={link}><button className='button-5'>Seleccionar</button></Link>
        <div className="statusClientDash">
          <h4>Ultima Actividad</h4>
          <div className="flexSB">
            <p>Pago: <strong>{formatDays(ClientData.LastPayment)}</strong>,</p>
            <p> Cargo: <strong>{formatDays(ClientData.LastCharge)}</strong></p>
        </div>
        </div>
      </div>
    </div>
  )
}
export default ClientItemDash;
export type { ClientData }
function formatDays(days:number) {
  return days >= 16 ? "+15d" : `${days}días`;
}