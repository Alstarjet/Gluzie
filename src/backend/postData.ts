import { chargesDB } from "../database/chargesDBController";
import { clientsDB } from "../database/clientsDBController";
import { paymentsDB } from "../database/paymentsDBController";
import { ordersDB } from "../database/ordersDBController";
import type { DataOffCloud } from '../interfaces/API'
const URL_BACK = import.meta.env.VITE_URL_BACK

async function postData():Promise<boolean> {
    try {
        const DataOffCloud = await ConsutDataOffCloud()
        let Token = localStorage.getItem('Token')
        const response = await fetch(URL_BACK+"/UploadData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Token}` // Agregar el token JWT al encabezado Authorization
            },
            body: JSON.stringify(DataOffCloud)
        });
        if (response.status>=200 && response.status<=299) {
            alert("Los datos se respaldaron con exito")
            updateOffCloud(DataOffCloud)
        } else if (response.status >= 400 && response.status<=499) {
            alert("la sesión caduco, inicia secion optener los datos")
            localStorage.setItem('Token', "");
            return false
        } else{
            alert("problema inesperado")
        }
        return true
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return false
    }
}
async function ConsutDataOffCloud(): Promise<DataOffCloud> {
    let data: DataOffCloud = {
        clients: [],
        payments: [],
        charges: [],
        orders: [],
        deviceid: ""
    }
    data.charges = await chargesDB.readChargesOffCloud()
    data.clients = await clientsDB.readClientsOffCloud()
    data.payments = await paymentsDB.readPaymentsOffCloud()
    data.orders = await ordersDB.readOrdersOffCloud()
    const DeviceID = localStorage.getItem('Device')
    if (DeviceID!=null){
        data.deviceid = DeviceID
    }
    console.log(data)
    return data
}
function updateOffCloud(data:DataOffCloud){
    data.charges.forEach((iteam)=>{
        chargesDB.updateChargeCloud(iteam)
    })
    data.clients.forEach((iteam)=>{
        clientsDB.updateClientCloud(iteam)
    })
    data.orders.forEach((iteam)=>{
        ordersDB.updateOrderCloud(iteam)
    })
    data.payments.forEach((iteam)=>{
        paymentsDB.updatePaymentCloud(iteam)
    })

}
export  {postData};