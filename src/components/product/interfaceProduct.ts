import type { product, productCartItem } from '../../interfaces/catalog'

interface productsPropsAll{
    Products:product[],
    Product:product,
    SetProducts: (products:product[]) => void,
    AddProduct: (product:product) => void,
    Delete: (key:string) => void,
    Count:(key:string,quantity:number)=> void
}
interface productPropsAdd{
    Product:product,
    AddProduct: (product:productCartItem) => void,
}
interface productPropsCountDelete{
    Product:product,
    Delete: (key:string) => void,
    Count:(key:string,quantity:number)=> void
}
interface productCustomProps{
    Products:product[],
    AddProduct: (product:productCartItem) => void,
}
interface productsProps{
    Products:productCartItem[],
    SetProducts: (products:productCartItem[]) => void,
}
interface productPropsAddOnly{
    AddProduct: (product:productCartItem) => void,
}
export type{productPropsCountDelete,productPropsAdd,productsPropsAll,productCustomProps,productsProps,productPropsAddOnly}