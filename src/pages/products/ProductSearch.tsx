import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import ProductItemList from '../../components/product/ProductItemInventori';
import { productsDB } from "../../database/productsDBController";
import { RiAddCircleFill } from "react-icons/ri";

import type { productInventoryItem } from '../../interfaces/catalog'

function ProductSearch({ }) {
  const [products, setProducts] = useState<productInventoryItem[]>([]);
  const [name, setName] = useState<string>('')
  const [ArrayProductsFilter, setArray] = useState<productInventoryItem[]>(products)
  const { catalog } = useParams();


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


  useEffect(() => {
    const loadProducts = async () => {
      try {
        if (catalog != "allproducts" && catalog) {
          let productsDBs = await productsDB.readProductPerCatalog(catalog);
          setProducts(productsDBs);
          setArray(productsDBs)
        } else {
          let productsDBs = await productsDB.readProducts();
          setProducts(productsDBs);
          setArray(productsDBs)
        }
      } catch (error) {
        console.error("Error al cargar productos desde la base de datos: ", error);
      }
    };
    loadProducts();
  }, [catalog]);
  return (
    <div className='pageUse'>
      {catalog == "allproducts" ? (
        <h2>Lista de todos los Productos</h2>
      ) : (
        // Si no, no se renderiza nada
        <h2>Productos de {catalog}</h2>
      )}
      <div className='seachAndAdd'>
        <input type="text" id="buscador" value={name} placeholder="Buscar Producte..." onChange={handleChange} className='searchProduct' />
        <Link to="/productregister" className="ToLink"><RiAddCircleFill className='IcoAdd' /><p>Nuevo</p></Link>
      </div>
      {ArrayProductsFilter.map(item => (
        <ProductItemList Product={item} ></ProductItemList>
      ))}
    </div>
  );
}
export default ProductSearch;
