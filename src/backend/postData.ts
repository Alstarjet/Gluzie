import { chargesDB } from "../database/chargesDBController";
import { clientsDB } from "../database/clientsDBController";
import { productsDB } from "../database/productsDBController";
import { paymentsDB } from "../database/paymentsDBController";
import { ordersDB } from "../database/ordersDBController";
import type { DataOffCloud } from '../interfaces/API'

const URL_BACK = import.meta.env.VITE_URL_BACK

async function ConsutDataOffCloud(): Promise<DataOffCloud> {
    console.log("Holas")
    console.log("Aqui esta:" + URL_BACK)
    let data: DataOffCloud = {
        clients: [],
        payments: [],
        charges: [],
        products: [],
        orders: [],
        deviceid: ""
    }
    data.charges = await chargesDB.readChargesOffCloud()
    data.clients = await clientsDB.readClientsOffCloud()
    data.products = await productsDB.readProductsOffCloud()
    data.payments = await paymentsDB.readPaymentsOffCloud()
    data.orders = await ordersDB.readOrdersOffCloud()
    const DeviceID = localStorage.getItem('Device')
    if (DeviceID!=null){
        data.deviceid = DeviceID
    }
    console.log(data)
    return data
}
export default ConsutDataOffCloud;