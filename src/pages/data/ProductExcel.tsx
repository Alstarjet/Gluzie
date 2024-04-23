import { useState,useEffect } from "react";
import { Link, } from "react-router-dom";
import { RiAddCircleFill } from "react-icons/ri";
import { ReadProductsFromExcel } from "../../scripts/productsExcel";
import ProductItemExcel from "../../components/product/ProductItemExcel";
import { productsDB } from "../../database/productsDBController";

import { productsExcelData } from "../../interfaces/excel/productexcelitem";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { catalogsDB } from "../../database/catalogsDBController";
import type { catalog } from '../../interfaces/catalog';
function ProductExcel() {
  const [productsExcel, setproducts] = useState<productsExcelData>()
  const [loading, setLoading] = useState<boolean>(false)
  const [catalogCh, setCatalogCh] = useState<string>("Default")

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const products = await ReadProductsFromExcel(event)
    setproducts(products)
    setLoading(true)
  }

  const saveAllproducts = () => {
    if (catalogCh=="Default"){
      const resultado = window.confirm('¿Continuar sin asignar un Catalogo?');
      if (!resultado) {
        return
      }
    }

    const resultado = window.confirm('¿Quieres Guardar estos productos?');
    if (!resultado) {
      return
    }
    productsExcel?.products.forEach((element) => {
      element.product.catalog=catalogCh
      productsDB.addProduct(element.product);
    })
    setLoading(false)
    setTimeout(() => {
      alert("Productos Guardados")
    }, 500);
  }
  const [catalog, setCatalog]=useState<catalog[]>()
  useEffect(() => {
    const fetchClient = async () => {
        
            try {
                const clientDB = await catalogsDB.readCatalogs();
                setCatalog(clientDB);
            } catch (error) {
                console.error("Error fetching ctalogs:", error);
            }
        
    }
    fetchClient();
}, []);
  return (
    <div className='FormView'>
      <h2><PiMicrosoftExcelLogoFill />Carga de Productos</h2>
      {!loading ?
        <input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" /> : null}
      {loading ? <div>
        <h3>Resumen de Productos</h3>
        <div>
          <p>Total Detectados: {productsExcel?.products.length}</p>
          <p>Con Informacion Incompleta: {productsExcel?.productsincomplete}</p>
        </div>
        <div>
          <p>Puedes actualizar/completar la información de tus productos despues de guardarlos, en la pestaña Productos</p>
        </div>
        <div className="seachAndAdd">
          Catalogo:
          <select name="catalog" value={catalogCh} onChange={(e)=>{setCatalogCh(e.target.value)}} required>
            <option value="Default">Default</option>
            {catalog && catalog.map(item => (
              <option value={item.name} key={item.key}>{item.name}</option>
            ))}
          </select>
          <Link to="/catalogregister" className="ToLink">
                    <RiAddCircleFill className='IcoAdd' />
                    <p>Nuevo Catalogo</p>
                </Link>
        </div>
        <button className='grandButton buttonBlue' onClick={() => { saveAllproducts() }}>Guardar Productos</button>
        {productsExcel?.products.map(item => (
          <ProductItemExcel DataProduct={item} ></ProductItemExcel>
        ))}
      </div> : null}

    </div>
  );
}

export default ProductExcel;
