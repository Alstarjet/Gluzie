import ProductItemForList from "./ProductItemForList"
import type { productsProps } from './interfaceProduct'

function ProductoPreCharge({ Products, Delete,Update }:productsProps) {

    return (
        <div className='ListScroll50'>
        <table className="TableSimple">
            {Products.map(item => (
                <ProductItemForList Product={item} Delete={Delete} Count={Update} />
            ))}
        </table>
        </div>

    )
}
export default ProductoPreCharge;