import type { productExcelItem } from '../../interfaces/excel/productexcelitem'

interface ProductItemProps {
  DataProduct: productExcelItem; // Corrección del nombre de la propiedad y del tipo
}
function ProductItemExcel({ DataProduct }: ProductItemProps) {

  return (
    <div key={DataProduct.product.uuid} className={'clientItemExcel cardClear '}>
        <p className="texthidden"><b>{DataProduct.product.name}</b></p>
        <p><b>Clave:</b>{DataProduct.product.key}</p>
        <p><b>Precio:</b>{DataProduct.product.price}</p>
        <p><b>Stock:</b>{DataProduct.product.stock}</p>
        <p><b>Medida:</b>{DataProduct.product.type}</p>
    </div>
  )
}
export default ProductItemExcel;