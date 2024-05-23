import { useState } from 'react';
import type { productCartItem } from '../../interfaces/catalog'
import type { productCustomProps } from './interfaceProduct'

function ProductoCustom({ Products, AddProduct }: productCustomProps) {
    const [product, setProduct] = useState<productCartItem>({
        name: "",
        price: 0,
        key: 'nill',
        page: 'nill',
        type: "",
        catalog: "",
        quantity: 1,
        total: 0,
        uuid: "null"
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name == "price") {
            var intValue = parseFloat(value)
            setProduct(prevProduct => ({
                ...prevProduct,
                [name]: intValue,
                ["total"]:intValue
            }));
        } else {
            setProduct(prevProduct => ({
                ...prevProduct,
                [name]: value
            }));
        }

    }

    const handleSubmit = () => {
        let NewProduct = product
        NewProduct.key = "X" + (+Math.floor(Math.random() * 899) + 100) + Products.length
        NewProduct.uuid=NewProduct.key
        if (NewProduct.name == "" || NewProduct.price == 0 || isNaN(NewProduct.price)) {
            alert("Precio o Nombre no valido");
            return
        }
        AddProduct(product)

        setProduct({
            name: "",
            price: 0,
            key: 'nill',
            page: "nill",
            type: "",
            catalog: "",
            quantity: 1,
            total: 0,
            uuid: "null"
        })
    }

    return (
        <div className='CatalogSearch'>
            <label>
                Nombre:
                <input type="text" name="name" value={product.name} onChange={handleChange} />
            </label>
            <br />
            <label>
                Precio:
                <input type="number" name="price" value={product.price} onChange={handleChange} />
            </label>
            <br></br>
            <button onClick={handleSubmit}>Agregar Producto</button>
        </div>
    )
}

export default ProductoCustom;
