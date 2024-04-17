import { Link,} from "react-router-dom";
import type { client } from '../../interfaces/client'

interface ClientItemProps {
  DataClient: client; // Corrección del nombre de la propiedad y del tipo
}
function ClientItem({ DataClient }: ClientItemProps) {
  const link = "profile/" + DataClient.uuid; // Corrección de la variable 'link'
  return (
    <div key={DataClient.uuid} className='clientItem cardClear'>
        <p className="texthidden">{DataClient.name} {DataClient.lastname}</p>
        <p>{DataClient.neighborhood}</p>
        <p>{DataClient.address}</p>
      <Link to={link}><button className='button-5'>Seleccionar</button></Link>
    </div>
  )
}
export default ClientItem;