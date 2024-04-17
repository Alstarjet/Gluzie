import { useState, useEffect } from 'react';
import { Link, } from "react-router-dom";
import IteamCardCatalog from '../../components/catalog/IteamCardCatalog';
import { catalogsDB } from "../../database/catalogsDBController";
import { RiAddCircleFill } from "react-icons/ri";

import type { catalog } from '../../interfaces/catalog'

function ProductMenu({ }) {
    const [catalogs, setProducts] = useState<catalog[]>([]);


    const loadProducts = async () => {
        try {
            let catalogsDBs = await catalogsDB.readCatalogs();
            catalogsDBs.push({
                key: "Default",
                name: "allproducts",
                description: "",
                status: "active"
            })
            setProducts(catalogsDBs);
        } catch (error) {
            console.error("Error al cargar catalogos desde la base de datos: ", error);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);
    return (
        <div>
            <div className='seachAndAdd'>
                <Link to="/catalogregister" className="ToLink">
                    <RiAddCircleFill className='IcoAdd' />
                    <p>Nuevo Catalogo</p>
                </Link>
                <Link to="/productregister" className="ToLink">
                    <RiAddCircleFill className='IcoAdd' />
                    <p>Nuevo Producto</p>
                </Link>
            </div>
            <h2>Catalogos:</h2>
            {catalogs.map(item => (
                <IteamCardCatalog Catalog={item} key={item.key} />
            ))}

        </div>
    );
}
export default ProductMenu
