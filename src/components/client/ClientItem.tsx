import { Link, } from "react-router-dom";
import type { client } from '../../interfaces/client'
import './ClientItem.css'
interface ClientItemProps {
  DataClient: client; // Corrección del nombre de la propiedad y del tipo
}
function ClientItem({ DataClient }: ClientItemProps) {
  const link = "profile/" + DataClient.uuid; // Corrección de la variable 'link'
  return (
    <div key={DataClient.uuid} className='clientItemDash '>
      <h3 className="texthidden">{DataClient.name} {DataClient.lastname}</h3>
      <div className="clientDisplay">
        <div>
          <p>{DataClient.neighborhood}</p>
          <p>{DataClient.address}</p>
        </div>

        <Link to={link}><button className='button-5'>Seleccionar</button></Link>
      </div>
    </div>
  )
}
export default ClientItem;