import { chargesDB } from "../database/chargesDBController";
import { clientsDB } from "../database/clientsDBController";
import { productsDB } from "../database/productsDBController";
import { paymentsDB } from "../database/paymentsDBController";
import { ordersDB } from "../database/ordersDBController";
import { catalogsDB } from "../database/catalogsDBController";
import { v4 as uuidv4 } from 'uuid';

import type { GetData } from '../interfaces/API'
import { catalog } from "../interfaces/catalog";
const URL_BACK = import.meta.env.VITE_URL_BACK

async function getData(): Promise<boolean> {
    try {
        let Token = localStorage.getItem('Token')
        let device = localStorage.getItem('Device')
        const response = await fetch(URL_BACK + "/GetData?deviceid=" + device, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Token}` // Agregar el token JWT al encabezado Authorization
            },
        });
        if (response.status >= 200 && response.status <= 299) {
            const data: GetData = await response.json();
            console.log(data)
            saveDataOfCloud(data)
            const delet = await deteleIdsCloud()
            if (!delet) {
                alert("Datos descargados con exito parcial")
                return true
            }
            alert("Datos descargados con exito")
            return true
        } else if (response.status >= 400 && response.status <= 499) {
            alert("la sesión caduco, inicia secion optener los datos")
            localStorage.setItem('Token', "");
            return false
        }
        return true
    } catch (error) {
        alert("Hubo un problema con la descarga")
        console.error('Error En la descarga de archivos:', error);
        return false
    }
}
async function deteleIdsCloud(): Promise<boolean> {
    try {
        let Token = localStorage.getItem('Token')
        let device = localStorage.getItem('Device')
        const response = await fetch(URL_BACK + "/DeleteIds?deviceid=" + device, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Token}` // Agregar el token JWT al encabezado Authorization
            },
        });
        if (response.status >= 200 && response.status <= 299) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return false
    }
}
async function saveDataOfCloud(data: GetData) {
    console.log(data)
    if (data.charges != null) {
        data.charges.forEach((iteam) => {
            iteam.createat = new Date(iteam.createat)
            iteam.updateat = new Date(iteam.updateat)
            chargesDB.GetEditCharge(iteam)
        })
    }
    if (data.clients != null) {
        data.clients.forEach((iteam) => {
            iteam.createat = new Date(iteam.createat)
            iteam.updateat = new Date(iteam.updateat)
            clientsDB.GetEditClient(iteam)
        })
    }
    if (data.orders != null) {
        data.orders.forEach((iteam) => {
            iteam.createat = new Date(iteam.createat)
            iteam.updateat = new Date(iteam.updateat)
            ordersDB.GetEditOrder(iteam)
        })
    }
    if (data.payments != null) {
        console.log(data.payments)
        data.payments.forEach((iteam) => {
            iteam.createat = new Date(iteam.createat)
            iteam.updateat = new Date(iteam.updateat)
            paymentsDB.GetEditPayment(iteam)
        })
    }
    if (data.products != null) {
        let catalogs: catalog[] = await catalogsDB.readCatalogs()
        let newCatalogs: catalog[] = []
        data.products.forEach((iteam) => {
            let exist: boolean = false
            for (let c of catalogs) {
                if (c.name == iteam.catalog) {
                    exist = true
                }
            }
            console.log(iteam)
            if (!exist && iteam.catalog != "Default") {
                let exist: boolean = false
                for (let c of newCatalogs) {
                    if (c.name == iteam.catalog) {
                        exist = true
                    }
                }
                if (!exist) {
                    const newCatalog: catalog = {
                        key: uuidv4(),
                        name: iteam.catalog,
                        status: "active"
                    }
                    newCatalogs.push(newCatalog)
                }
            }
            iteam.createat = new Date(iteam.createat)
            iteam.updateat = new Date(iteam.updateat)
            iteam.cloud = 1
            productsDB.GetEditProduct(iteam)
        })
        newCatalogs.forEach((iteam) => {
            catalogsDB.addCatalog(iteam)

        })
    }



}

export { getData, saveDataOfCloud };