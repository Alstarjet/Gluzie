import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ProductSearch from "../product/ProductSearch"
import ProductoPreCharge from "../product/ProductoPreCharge"
import ProductoCustom from "../product/ProductoCustom"
import { chargesDB } from "../../database/chargesDBController";

import type { charge,productCartItem } from '../../interfaces/catalog'

import type { client } from '../../interfaces/client'

interface ClientComponents {
    DataClient:client,
  }


function AddCharge({DataClient}:ClientComponents) {
    const [discount, setDiscount] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    const [finalprice, setFinalPrice] = useState(0)
    const [products, setProducts] = useState<productCartItem[]>([])
    const [sourceProd, setSourceProd] = useState("catalog")
    const AddProduct = (product:productCartItem) => {
        // Verificar si el producto ya existe en la lista
        const existingProductIndex = products.findIndex(p => p.productuuid == product.productuuid);
        console.log(products)
        if (existingProductIndex !== -1) {
            console.log("hola")
            const updatedProducts = [...products];
            updatedProducts[existingProductIndex].quantity += 1;
            updatedProducts[existingProductIndex].total += product.price;
            setProducts(updatedProducts);
        } else {
            const productCharge:productCartItem={
                key:product.key,
                name:product.name,
                page:product.page,
                price:product.price,
                quantity:1,
                total:product.price,
                type:product.type,
                catalog:product.catalog,
                productuuid:product.productuuid
            }
            const newListProduct = [...products, productCharge];
            setProducts(newListProduct);
        }
    };

    const handleDiscount = (event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value } = event.target;

        // Validar que el valor sea un número entero
        const discountValue = parseFloat(value);

        if (!isNaN(discountValue)) {
            // Calcular el descuento en función del subtotal
            const discountAmount = (subtotal * discountValue) / 100;

            // Calcular el precio final restando el descuento al subtotal
            const finalPrice = subtotal - discountAmount;

            // Actualizar los estados
            setDiscount(discountValue);
            setFinalPrice(Math.round(finalPrice * 100) / 100);
        } else {
            // Manejar el caso en el que el valor no sea un número válido
            // Puedes mostrar un mensaje de error, por ejemplo
            setDiscount(0);
            setFinalPrice(Math.round(subtotal * 100) / 100);
        }
    };

    const AddChargeDB = () => {
        let chargeFinal:charge = {
            clientuuid: DataClient.clientuuid,
            clientname: DataClient.name,
            uuid: uuidv4(),
            products: products,
            discount: discount,
            subtotal: subtotal,
            finalprice: finalprice,
            date: new Date(),
            cloud:0
        }
        if (chargeFinal.products.length < 1) {
            alert("Necesitas Agregar Productos");
            return
        }
        chargesDB.addCharge(chargeFinal)
        setDiscount(0)
        setSubtotal(0)
        setFinalPrice(0)
        setProducts([])
        setSourceProd("catalog")
    }

    useEffect(() => {
        // Suma de los totales de los productos
        const totalSum = products.reduce((acc, product) => acc + product.total, 0);
        setSubtotal(Math.round(totalSum * 100) / 100)
        if (discount > 0) {
            const discountAmount = (totalSum * discount) / 100;
            // Calcular el precio final restando el descuento al subtotal
            const finalPrice = totalSum - discountAmount;
            setFinalPrice(Math.round(finalPrice * 100) / 100);
        } else {
            setFinalPrice(Math.round(totalSum * 100) / 100);
        }
    }, [products]); // El efecto se ejecutará cuando 'products' cambie

    return (
        <div className='viewFull'>
            <div className='viewFullw'>
                <button onClick={() => setSourceProd('catalog')}>Catálogo</button>
                <button onClick={() => setSourceProd('custom')}>Especial</button>
            </div>
            <div className='view70'>
            {sourceProd == 'catalog' ? (
                <ProductSearch AddProduct={AddProduct}></ProductSearch>
            ) : (
                <ProductoCustom Products={products} AddProduct={AddProduct}></ProductoCustom>
            )}
            {products.length > 0 && <ProductoPreCharge Products={products} SetProducts={setProducts}></ProductoPreCharge>}
            </div>
            <div className='flexRight'>
                <label>
                    Descuento:
                    <input type="number" name="discout" value={discount} onChange={handleDiscount} />
                </label>
                <label>
                    Subtotal:
                    <input type="number" name="discout" value={subtotal} onChange={handleDiscount} disabled />
                </label>
                <label>
                    Total:
                    <input type="number" name="discout" value={finalprice} onChange={handleDiscount} disabled />
                </label>
                <button className="grandButton buttonPurple" onClick={AddChargeDB}>Agregar Cargo</button>
            </div>
        </div>
    )
}
export default AddCharge;