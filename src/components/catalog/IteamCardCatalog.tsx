import type { catalog } from '../../interfaces/catalog'
import { Link,} from "react-router-dom";

interface cardCatalogPro{
    Catalog:catalog,
}

const IteamCardCatalog:React.FC<cardCatalogPro>=({Catalog})=> {
  const link = "search/" + Catalog.name
  const name:string=(Catalog.name=="allproducts") ? "Todos Los Productos" : Catalog.name;

  return (
    <div key={Catalog.key}>
        <td>{name}</td>
        <Link to={link}><button className='button-5'>Seleccionar</button></Link>
    </div>
  )
}
export default IteamCardCatalog;