import type { product } from '../../interfaces/catalog'
import { Link,} from "react-router-dom";

interface productPropsAdd{
  Product:product,
}

function ProductItemList({Product}:productPropsAdd) {
  const link = "/product/" + Product.uuid; // Corrección de la variable 'link'
  return (
    <div key={Product.key}>
        <td>{Product.key}</td>
        <td>{Product.name}</td>
        <td>{Product.page}</td>
        <td>${Product.price}</td>
        <Link to={link}><button className='button-5'>Seleccionar</button></Link>
    </div>
  )
}
export default ProductItemList;