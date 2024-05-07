import { chargesDB } from "../chargesDBController";
import { clientsDB } from "../clientsDBController";
import { productsDB } from "../productsDBController";
import { paymentsDB } from "../paymentsDBController";
import { ordersDB } from "../ordersDBController";
import type { DataOffCloud } from '../../interfaces/API'

interface ConsutResult {
    data: DataOffCloud,
    hasContent: boolean
}

function ConsutDataOffCloud(): Promise<ConsutResult> {
    return new Promise(async (resolve, reject) => {
        try {
            let consult: ConsutResult = {
                data: {
                    clients: [],
                    payments: [],
                    charges: [],
                    products: [],
                    orders: [],
                    deviceid: ""
                },
                hasContent: false
            }
            consult.data.charges = await chargesDB.readChargesOffCloud()
            consult.data.clients = await clientsDB.readClientsOffCloud()
            consult.data.products = await productsDB.readProductsOffCloud()
            consult.data.payments = await paymentsDB.readPaymentsOffCloud()
            consult.data.orders = await ordersDB.readOrdersOffCloud()
            const DeviceID = localStorage.getItem('Device')
            if (DeviceID != null) {
                consult.data.deviceid = DeviceID
            }
            if (consult.data.charges.length > 0 || consult.data.clients.length > 0 || consult.data.products.length > 0 || consult.data.payments.length > 0 || consult.data.orders.length > 0) {
                consult.hasContent = true
            }
            resolve(consult)
        }
        catch (error) {
            reject(error);
        }
    })
}

function UpdateOffCloud(data: DataOffCloud) {
    data.charges.forEach((iteam) => {
        chargesDB.updateChargeCloud(iteam)
    })
    data.clients.forEach((iteam) => {
        clientsDB.updateClientCloud(iteam)
    })
    data.orders.forEach((iteam) => {
        ordersDB.updateOrderCloud(iteam)
    })
    data.payments.forEach((iteam) => {
        paymentsDB.updatePaymentCloud(iteam)
    })
    data.products.forEach((iteam) => {
        productsDB.updateProductCloud(iteam)
    })
}
export { ConsutDataOffCloud, UpdateOffCloud };