import ProductItemForList from "./ProductItemForList"
import type { productsProps } from './interfaceProduct'

function ProductoPreCharge({ Products, Delete,Update }:productsProps) {

    return (
        <table className="TableResumeCharge">
            {Products.map(item => (
                <ProductItemForList Product={item} Delete={Delete} Count={Update} />
            ))}
        </table>
    )
}
export default ProductoPreCharge;