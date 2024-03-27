import ProductItemForList from "./ProductItemForList"
import type { productsProps } from './interfaceProduct'

function ProductoPreCharge({ Products, SetProducts }:productsProps) {

    const deleteProduct = (key:string) => {
        // Filtrar la lista para excluir el producto con la key proporcionada
        const updatedProducts = Products.filter(product => product.key !== key);
        // Actualizar el estado con la nueva lista
        SetProducts(updatedProducts);
    };
    const updateQuantity = (key:string, newQuantity:number) => {
        // Crear una nueva lista donde se actualiza la cantidad y el subtotal del producto específico
        const updatedProducts = Products.map(product =>
          product.key === key
            ? {
                ...product,
                quantity: newQuantity,
                total: newQuantity * product.price, // Calcular el nuevo subtotal
              }
            : product
        );
        // Actualizar el estado con la nueva lista
        SetProducts(updatedProducts);
      };
    return (
        <div className='ListScroll50'>
        <table className="TableSimple">
            {Products.map(item => (
                <ProductItemForList Product={item} Delete={deleteProduct} Count={updateQuantity} />
            ))}
        </table>
        </div>

    )
}
export default ProductoPreCharge;