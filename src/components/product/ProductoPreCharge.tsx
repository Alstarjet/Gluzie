import ProductItemForList from "./ProductItemForList"
import type { productsProps } from './interfaceProduct'
import './ProductoPreCharge.css'
function ProductoPreCharge({ Products, Delete, Update,Status}:productsProps) {
    // Crear una copia del arreglo y luego invertirlo
    const reversedProducts = [...Products].reverse();
    
    return (
        <table className={"TableResumeCharge "+Status}>
            {reversedProducts.map(item => (
                <ProductItemForList key={item.key} Product={item} Delete={Delete} Count={Update} />
            ))}
        </table>
    )
}
export default ProductoPreCharge;
