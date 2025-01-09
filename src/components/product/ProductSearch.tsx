import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import { productsDB } from "../../database/productsDBController";
import type { productInventoryItem } from '../../interfaces/catalog'
import type { productPropsAddOnly } from './interfaceProduct'
import type { productCartItem } from '../../interfaces/catalog';
import searchLever from '../../scripts/searchLever';

function ProductSearch({ AddProduct }: productPropsAddOnly) {
    const [name, setName] = useState('')
    const [ProductFilter, setArray] = useState<productInventoryItem[]>([])
    const [stoneListProducts, setProducts] = useState<productInventoryItem[]>([])

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setArray([])
        const { value } = event.target;
        setName(value);
        if (value.length > 2) {
            const filteredAndSortedProducts = stoneListProducts
                .map(Product => {
                    const level=searchLever(value,Product.name)
                    if (level != null){
                        return{Product,priority:level}
                    }else{
                        return null
                    }
                })
                .filter(item => item !== null) // Elimina los elementos que no coinciden
                .sort((a, b) => a.priority - b.priority) // Ordena por prioridad
                .map(item => item.Product); // Devuelve solo los productos

            setArray(filteredAndSortedProducts);

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
    const AddProductAndClear = (product: productCartItem) => {
        AddProduct(product)
        setName("")
        setArray([])

    }

    return (

        <div className='CatalogSearch'>
            <input type="text" id="buscador" value={name} placeholder="Buscar Producto..." onChange={handleSearch} className='searchProduct' autoComplete="off" />
            <table className='itemaSearchProduct'>
                {ProductFilter.map(item => (
                    <ProductItem Product={item} AddProduct={AddProductAndClear} />
                ))}</table>
        </div>

    )
}
export default ProductSearch;