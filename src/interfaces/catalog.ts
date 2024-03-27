interface charge{
    clientuuid: string,
    clientname: string,
    uuid: string,
    products: productCartItem[],
    discount: number,
    subtotal: number,
    finalprice: number,
    date: Date,
    cloud: 0 | 1,
}

interface catalog {
    catalog:string,
    description:string,
    use:number
}
interface product {
    key: string;
    name: string;
    page: string;
    price: number;
    type: string;
    catalog: string;
    // Agregamos estos campos opcionales para que puedan ser ignorados si no se usan
    quantity?: number;
    total?: number;
    stock?: number;
    productuuid:string,
    cloud?: 0 | 1,
}

// Ejemplo de uso donde se necesita el campo 'quantity'
interface productCartItem extends product {
    quantity: number;
    total: number;
}

// Ejemplo de uso donde se necesita el campo 'stock'
interface productInventoryItem extends product {
    stock: number,
    cloud: 0 | 1,
}
export type{charge,product,productInventoryItem,catalog,productCartItem}