import { openDatabase,keysDB } from "./indexedDBConect";
import type { charge } from '../interfaces/catalog'

function readCharges(): Promise<charge[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction(keysDB.charges.Store, "readonly");
            const store = transaction.objectStore(keysDB.charges.Store);

            const request = store.getAll();
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
function readChargesOffCloud(): Promise<charge[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction(keysDB.charges.Store, "readonly");
            const store = transaction.objectStore(keysDB.charges.Store);

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
async function addCharge(chargeData:charge):Promise<boolean> {
    const db = await openDatabase();
    const transaction = db.transaction(keysDB.charges.Store, "readwrite");
    const store = transaction.objectStore(keysDB.charges.Store);

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
async function editCharge(ChargeObjs:charge) {
    const db = await openDatabase();
    const transaction = db.transaction("charges", "readwrite");
    const store = transaction.objectStore("charges");


    ChargeObjs.cloud = 0;
    const updateRequest = store.put(ChargeObjs);
    updateRequest.onsuccess = function () {
        console.log(`Los datos con ID ${ChargeObjs} se actualizaron con éxito`);
    };
    updateRequest.onerror = function () {
        console.log(`Error al actualizar los datos con ID ${ChargeObjs}: ${(updateRequest.error as any).message}`);
    };

}
async function updateChargeCloud(ChargeObjs:charge) {
    const db = await openDatabase();
    const transaction = db.transaction("charges", "readwrite");
    const store = transaction.objectStore("charges");


    ChargeObjs.cloud = 1;
    const updateRequest = store.put(ChargeObjs);
    updateRequest.onsuccess = function () {
        console.log(`Los datos con ID ${ChargeObjs} se actualizaron con éxito`);
    };
    updateRequest.onerror = function () {
        console.log(`Error al actualizar los datos con ID ${ChargeObjs}: ${(updateRequest.error as any).message}`);
    };

}

function findCharges(clientuuid:string): Promise<charge[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction(keysDB.charges.Store, "readonly");
            const store = transaction.objectStore(keysDB.charges.Store);

            const index = store.index(keysDB.clients.KeyPathClient); // Índice para buscar por clientuuid
            const request = index.getAll(clientuuid); // Obtener todos los pagos para el clientuuid dado
            request.onsuccess = function () {
                const charges = request.result.filter(charge => charge.status != "active");
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
const chargesDB ={
    readCharges,
    addCharge,
    editCharge,
    updateChargeCloud,
    findCharges,
    readChargesOffCloud
}
export {chargesDB}