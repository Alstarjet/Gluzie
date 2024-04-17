import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import { productsDB } from "../../database/productsDBController";
import type { productInventoryItem} from '../../interfaces/catalog'
import type { productPropsAddOnly } from './interfaceProduct'

function ProductSearch({AddProduct}:productPropsAddOnly) {
    const [name, setName] = useState('')
    const [ProductFilter, setArray] = useState<productInventoryItem[]>([])
    const [stoneListProducts, setProducts] = useState<productInventoryItem[]>([])

    const handleSearch = (event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setArray([])
        const { value } = event.target;
        setName(value);
        if (value.length > 2) {
            stoneListProducts.forEach(Product => {
                const SinAcentos = Product.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const upperCase = SinAcentos.toUpperCase();
                const letras = value.toUpperCase()
                const regex = new RegExp(letras.split('').join('.*'), 'i');
                if (regex.test(upperCase)) {
                    setArray(prevArray => [...prevArray, Product])
                }
            })
        } else {
            setArray([])
        }
    }
    const loadProducts = async () => {
        try {
          let ProductDB = await productsDB.readProducts();
          setProducts(ProductDB)
        } catch (error) {
          console.error("Error al cargar Productos desde la base de datos: ", error);
        }
      };
    
      useEffect(() => {
        loadProducts();
      }, []);

    return (
        
            <div className='ListScroll50'>
                <input type="text" id="buscador" value={name} placeholder="Buscar Producto..." onChange={handleSearch} className='searchProduct' autoComplete ="off"/>
                <table className='itemaSearchProduct'>
                    {ProductFilter.map(item => (
                        <ProductItem Product={item} AddProduct={AddProduct} />
                    ))}</table>
            </div>
        
    )
}
export default ProductSearch;