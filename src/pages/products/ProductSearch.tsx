import { useState, useEffect } from 'react';
import { Link,} from "react-router-dom";
import ProductItemList from '../../components/product/ProductItemInventori';
import { productsDB } from "../../database/productsDBController";
import { RiAddCircleFill } from "react-icons/ri";

import type { productInventoryItem } from '../../interfaces/catalog'

function ProductSearch({ }) {
  const [products, setProducts] = useState<productInventoryItem[]>([]);
  const [name, setName] = useState<string>('')
  const [ArrayProductsFilter, setArray] = useState<productInventoryItem[]>(products)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setArray([])
    const { value } = event.target;
    setName(value);
    products.forEach(Product => {
      const SinAcentos = Product.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const upperCase = SinAcentos.toUpperCase();
      const letras = value.toUpperCase()
      const regex = new RegExp(letras.split('').join('.*'), 'i');
      if (regex.test(upperCase)) {
        setArray(prevArray => [...prevArray, Product])
      }
    });

  };
  const loadProducts = async () => {
    try {
      let productsDBs = await productsDB.readProducts();
      setProducts(productsDBs);
      setArray(productsDBs)
    } catch (error) {
      console.error("Error al cargar productos desde la base de datos: ", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);
  return (
    <div>
      <div className='seachAndAdd'>
      <input type="text" id="buscador" value={name} placeholder="Buscar Producte..." onChange={handleChange} className='searchProduct' />
      <Link to="/productregister" className="ToLink"><RiAddCircleFill className='IcoAdd'/><p>Nuevo</p></Link>
      </div>
      {ArrayProductsFilter.map(item => (
        <ProductItemList Product={item} ></ProductItemList>
      ))}
    </div>
  );
}
export default ProductSearch;
