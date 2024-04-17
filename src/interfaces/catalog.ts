interface charge{
    uuid: string,
    clientuuid: string,
    clientname: string,
    products: productCartItem[],
    discount: number,
    subtotal: number,
    finalprice: number,
    createat:Date,
    updateat:Date,
    status:"deleted"|"active"|"credited"
    cloud: 0 | 1,
}

interface catalog {
    key:string
    name:string,
    description:string,
    status:"deleted"|"active"
}
interface product {
    uuid:string,
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
    cloud?: 0 | 1,
    createat?:Date,
    updateat?:Date
    
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
    createat:Date,
    updateat:Date
    status:"deleted"|"active"
}

export type{charge,product,productInventoryItem,catalog,productCartItem}