import { openDatabase,keysDB } from "./indexedDBConect";
import type { charge } from '../interfaces/catalog'

function readOrders(): Promise<charge[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction(keysDB.orders.Store, "readonly");
            const store = transaction.objectStore(keysDB.orders.Store);

            const request = store.getAll();
            request.onsuccess = function () {
                const charges = request.result.filter(charge => charge.status == "active");
                resolve(charges);
            };

            request.onerror = function () {
                reject(request.error);
            };
        } catch (error) {
            reject(error);
        }
    });
}
async function addOrder(chargeData:charge):Promise<boolean> {
    const db = await openDatabase();
    const transaction = db.transaction(keysDB.orders.Store, "readwrite");
    const store = transaction.objectStore(keysDB.orders.Store);

    const request = store.add(chargeData);

    request.onsuccess = function () {
        return true
    };

    request.onerror = function () {
        console.log("Error al guardar los datos: " + (request.error as any).message);
        return false
    };
    return false
}
async function editOrder(OrderObjs:charge) {
    const db = await openDatabase();
    const transaction = db.transaction("orders", "readwrite");
    const store = transaction.objectStore("orders");


    OrderObjs.cloud = 0;
    const updateRequest = store.put(OrderObjs);
    updateRequest.onsuccess = function () {
        console.log(`Los datos con ID ${OrderObjs} se actualizaron con éxito`);
    };
    updateRequest.onerror = function () {
        console.log(`Error al actualizar los datos con ID ${OrderObjs}: ${(updateRequest.error as any).message}`);
    };

}
async function updateOrderCloud(OrderObjs:charge) {
    const db = await openDatabase();
    const transaction = db.transaction("orders", "readwrite");
    const store = transaction.objectStore("orders");


    OrderObjs.cloud = 1;
    const updateRequest = store.put(OrderObjs);
    updateRequest.onsuccess = function () {
        console.log(`Los datos con ID ${OrderObjs} se actualizaron con éxito`);
    };
    updateRequest.onerror = function () {
        console.log(`Error al actualizar los datos con ID ${OrderObjs}: ${(updateRequest.error as any).message}`);
    };

}

function findOrders(Clienteuuid:string): Promise<charge[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction(keysDB.orders.Store, "readonly");
            const store = transaction.objectStore(keysDB.orders.Store);

            const index = store.index(keysDB.clients.KeyPathClient); // Índice para buscar por clientuuid
            const request = index.getAll(Clienteuuid); // Obtener todos los pagos para el chargeuuid dado
            request.onsuccess = function () {
                const charges = request.result.filter(charge => charge.status == "active");
                resolve(charges);
            };

            request.onerror = function () {
                reject(request.error);
            };
        } catch (error) {
            reject(error);
        }
    });
}
function findOrder(chargeuuid:string):Promise<charge> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction(keysDB.orders.Store, "readonly");
            const store = transaction.objectStore(keysDB.orders.Store);

            const request = store.get(chargeuuid);
            request.onsuccess = function () {
                const charge = request.result;
                if (charge) {
                    resolve(charge);
                } else {
                    reject(new Error("Charge not found"));
                }
            };

            request.onerror = function () {
                reject(request.error);
            };
        } catch (error) {
            reject(error);
        }
    });
}
function readOrdersOffCloud(): Promise<charge[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction(keysDB.orders.Store, "readonly");
            const store = transaction.objectStore(keysDB.orders.Store);

            const index = store.index(keysDB.cloud.KeyPath); 
            const request = index.getAll(0); 
            request.onsuccess = function () {
                resolve(request.result);
            };

            request.onerror = function () {
                reject(request.error);
            };
        } catch (error) {
            reject(error);
        }
    });
}
const ordersDB ={
    readOrders,
    addOrder,
    editOrder,
    updateOrderCloud,
    findOrders,
    findOrder,
    readOrdersOffCloud
}
export {ordersDB}