import { useState, useEffect } from 'react';
import ProductSearch from "../product/ProductSearch"
import ProductoPreCharge from "../product/ProductoPreCharge"
import ProductoCustom from "../product/ProductoCustom"
import type { charge, productCartItem } from '../../interfaces/catalog'
import { client } from '../../interfaces/client';

interface ClientComponents {
    client:client | undefined;
    setCharge: React.Dispatch<React.SetStateAction<charge>>,
    charge: charge
  }

function NewCharge({client,charge,setCharge}:ClientComponents) {
    const [sourceProd, setSourceProd] = useState("catalog")

    const AddProduct = (product: productCartItem) => {
        // Verificar si el producto ya existe en la lista
        const existingProductIndex = charge.products.findIndex(p => p.uuid == product.uuid);
        if (existingProductIndex !== -1) {
            const updatedProducts = [...charge.products];
            updatedProducts[existingProductIndex].quantity += 1;
            updatedProducts[existingProductIndex].total += product.price;
            setCharge(prevState => ({
                ...prevState,
                products: updatedProducts
            }));
        } else {
            setCharge(prevState => ({
                ...prevState,
                products: [...charge.products, product]
            }));
        }
    };
    const DeleteProduct = (key: string) => {
        // Filtrar la lista para excluir el producto con la key proporcionada
        const updatedProducts = charge.products.filter(product => product.key !== key);
        // Actualizar el estado con la nueva lista
        setCharge(prevState => ({
            ...prevState,
            products: updatedProducts
        }));
    }
    const UpdateProduct = (key: string, newQuantity: number) => {
        // Crear una nueva lista donde se actualiza la cantidad y el subtotal del producto específico
        const updatedProducts = charge.products.map(product =>
            product.key === key
                ? {
                    ...product,
                    quantity: newQuantity,
                    total: newQuantity * product.price, // Calcular el nuevo subtotal
                }
                : product
        );
        // Actualizar el estado con la nueva lista
        setCharge(prevState => ({
            ...prevState,
            products: updatedProducts
        }));
    };
    const handleDiscount = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value } = event.target;
        // Validar que el valor sea un número entero
        const discountValue = parseFloat(value);
        setCharge(prevState => ({
            ...prevState,
            discount: discountValue
        }));

    };
    const calculateFinalWDiscount = () => {
        let discountAmount:number
        if (isNaN(charge.discount)){
            discountAmount = (charge.subtotal * 0) / 100;

        }else{
            discountAmount = (charge.subtotal * charge.discount) / 100;
        }
        const finalPrice = charge.subtotal - discountAmount;
        setCharge(prevState => ({
            ...prevState,
            finalprice: (Math.round(finalPrice * 100) / 100)
        }));
    }

    console.log(client)
    useEffect(() => {
        // Suma de los totales de los productos
        const totalSum = charge.products.reduce((acc, product) => acc + product.total, 0);
        setCharge(prevState => ({
            ...prevState,
            subtotal: (Math.round(totalSum * 100) / 100)
        }));
    }, [charge.products]); // El efecto se ejecutará cuando 'products' cambie
    useEffect(() => {
        calculateFinalWDiscount()
    }, [charge.products, charge.subtotal, charge.discount]);
    return (
        <div className='viewFull'>
            <div className='flexdist'>
                <button onClick={() => setSourceProd('catalog')}>Catálogo</button>
                <button onClick={() => setSourceProd('custom')}>Especial</button>
            </div>
            <div className='view70'>
                {sourceProd == 'catalog' ? (
                    <ProductSearch AddProduct={AddProduct}></ProductSearch>
                ) : (
                    <ProductoCustom Products={charge.products} AddProduct={AddProduct}></ProductoCustom>
                )}
                {charge.products.length > 0 && <ProductoPreCharge Products={charge.products} Delete={DeleteProduct} Update={UpdateProduct}></ProductoPreCharge>}
            </div>
            <div className='flexRight'>
                <label>
                    Descuento:
                    <input type="number" name="discout" value={charge.discount} onChange={handleDiscount} />
                </label>
                <label>
                    Subtotal:
                    <input type="number" name="discout" value={charge.subtotal} disabled />
                </label>
                <label>
                    Total:
                    <input type="number" name="discout" value={charge.finalprice} disabled />
                </label>
            </div>
        </div>
    )
}
export default NewCharge;