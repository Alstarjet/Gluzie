import { useState } from 'react';
import { productsDB } from "../../database/productsDBController";
import ProductForm from '../../components/forms/product'
import type { productInventoryItem } from '../../interfaces/catalog'
import { v4 as uuidv4 } from 'uuid';

function ProductRegister() {
  const [product, setProduct] = useState<productInventoryItem>({
    name: "",
    price: 0,
    key: '',
    page: "",
    type: "",
    catalog: "Default",
    stock: 0,
    uuid: uuidv4(),
    createat: new Date(),
    updateat: new Date(),
    cloud: 0,
    status: "active"
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
      alert("Falta Precio")
      return
    }
    if (product.name == "") {
      alert("Nombre Invalido")
      return
    }
    if(product.catalog=="Default"){
      const resultado = window.confirm('¿Continuar el guardado sin catalogo asignado?');
      if (!resultado) {
          return
      }
    }

    productsDB.addProduct(product);
    alert(product.name+" Ha si agregado")

    setProduct({
      uuid: uuidv4(),
      name: "",
      price: 0,
      key: '',
      page: "",
      type: "",
      catalog: "Default",
      stock: 0,
      createat: new Date(),
      updateat: new Date(),
      cloud: 0,
      status: "active"
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
