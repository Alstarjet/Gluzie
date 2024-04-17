import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productsDB } from "../../database/productsDBController";
import ProductForm from '../../components/forms/product'
import type { productInventoryItem } from '../../interfaces/catalog'
import { v4 as uuidv4 } from 'uuid';




function ProductEdit() {
  const { productId } = useParams();
  console.log(productId)
  const [product, setProduct] = useState<productInventoryItem>({
    name: "",
    price: 0,
    key: 'nill',
    page: "",
    type: "",
    catalog: "Default",
    stock: 0,
    uuid: uuidv4(),
    createat: new Date(),
    updateat: new Date(),
    cloud: 0,
    status:"active"
  })
  useEffect(() => {
    consultProduct(); // Llama a la función dentro del efecto
  }, []); // Array de dependencias vacío para que se ejecute solo una vez

  async function consultProduct() {
    if (productId !== undefined) {
      try {
        let productData = await productsDB.findProduct(productId);
        setProduct(productData);
      } catch (error) {
        console.error('Error al consultar producto:', error);
      }
    }
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name == "price" || name == "stock") {
      var valueFloat = parseFloat(value)
      setProduct((prevState) => ({ ...prevState, [name]: valueFloat }))
    }
    else {
      setProduct((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleAddClient = () => {
    if (product.price < 1) {
      const resultado = window.confirm('¿Continuar el Guardado sin Adeudo Anterior?');
      if (!resultado) {
        return
      }
    }
    productsDB.editProduct(product);
  
  }

  return (
    <div className='FormView'>
      <h2>Gestion de Producto</h2>

      <ProductForm product={product} onChange={handleChange} />

      <button onClick={handleAddClient} className='grandButton buttonBlue'>Guardar Cambios</button>
    </div>
  );
}

export default ProductEdit;
