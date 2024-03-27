import { ReadProductsFromExcel } from "../../scripts/productsExcel";
import ProductItemExcel from "../../components/product/ProductItemExcel";
import { useState } from "react";
import { productsDB } from "../../database/productsDBController";

import { productsExcelData } from "../../interfaces/excel/productexcelitem";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";

function ProductExcel() {
  const [productsExcel, setproducts] = useState<productsExcelData>()
  const [loading, setLoading] = useState<boolean>(false)
  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const products = await ReadProductsFromExcel(event)
    setproducts(products)
    setLoading(true)
  }

  const saveAllproducts=()=>{
    productsExcel?.products.forEach((element)=>{
      productsDB.addProduct(element.product);   
    })
    setLoading(false)
  }
  return (
    <div className='FormView'>
      <h2><PiMicrosoftExcelLogoFill />Carga de productes</h2>
      <input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />
      {loading ? <div>
        <h3>Resumen de Productos</h3>
        <div>
          <p>Total Detectados: {productsExcel?.products.length}</p>
          <p>Con Informacion Incompleta: {productsExcel?.productsincomplete}</p>
        </div>
        <div>
          <p>Puedes actualizar/completar la información de tus productes despues de guardarlos, en la pestaña productes</p>
        </div>
        <button className='grandButton buttonBlue' onClick={()=>{saveAllproducts()}}>Guardar productes</button>
      </div> : null}
      {productsExcel?.products.map(item => (
        <ProductItemExcel DataProduct={item} ></ProductItemExcel>
      ))}
    </div>
  );
}

export default ProductExcel;
