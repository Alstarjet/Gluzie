import type { productPropsAdd } from './interfaceProduct'
import type {  productCartItem } from '../../interfaces/catalog'


function ProductItem({Product,AddProduct}:productPropsAdd) {
  const productCart:productCartItem={
    key: Product.key,
    name: Product.name,
    page: Product.page,
    price: Product.price,
    type: Product.type,
    catalog: Product.catalog,
    quantity: 1,
    total: Product.price,
    uuid:Product.uuid,
  }

  return (
    <tr key={Product.key}>
        <td>{Product.key}</td>
        <td>{Product.name}</td>
        <td>${Product.price}</td>
        <td><button onClick={()=>AddProduct(productCart)}>Add</button></td>
    </tr>
  )
}
export default ProductItem;