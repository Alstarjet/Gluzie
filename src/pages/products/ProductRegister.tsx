import { useState } from 'react';
import { productsDB } from "../../database/productsDBController";
import ProductForm from '../../components/forms/product'
import type { productInventoryItem } from '../../interfaces/catalog'
import { v4 as uuidv4 } from 'uuid';




function ProductRegister() {
  const [product, setProduct] = useState<productInventoryItem>({
    name: "",
    price: 0,
    key: 'nill',
    page: "",
    type: "",
    catalog: "Default",
    stock: 0,
    productuuid: uuidv4(),
    cloud: 0,
  })

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
    productsDB.addProduct(product);
    setProduct({
      productuuid: "nillCustom",
      name: "",
      price: 0,
      key: 'nill',
      page: "",
      type: "",
      catalog: "Default",
      stock: 0,
      cloud: 0
    })
  }

  return (
    <div className='FormView'>
      <h2>Agregar Producto</h2>

      <ProductForm product={product} onChange={handleChange} />

      <button onClick={handleAddClient} className='grandButton buttonBlue'>Agregar Producto</button>
    </div>
  );
}

export default ProductRegister;
