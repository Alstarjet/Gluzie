import { openDatabase,keysDB } from "./indexedDBConect";
import type { client } from '../interfaces/client'

function readClients(): Promise<client[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction(keysDB.clients.Store, "readonly");
            const store = transaction.objectStore(keysDB.clients.Store);

            const request = store.getAll();
            request.onsuccess = function () {
                const clients = request.result.filter(charge => charge.status == "active");
                resolve(clients);
            };

            request.onerror = function () {
                reject(request.error);
            };
        } catch (error) {
            reject(error);
        }
    });
}
async function addClient(clientData:client):Promise<boolean> {
    const db = await openDatabase();
    const transaction = db.transaction(keysDB.clients.Store, "readwrite");
    const store = transaction.objectStore(keysDB.clients.Store);

    const request = store.add(clientData);

    request.onsuccess = function () {
        return true
    };

    request.onerror = function () {
        console.log("Error al guardar los datos: " + (request.error as any).message);
        return false
    };
    return false
}
async function editClient(ClientObjs:client) {
    const db = await openDatabase();
    const transaction = db.transaction("clients", "readwrite");
    const store = transaction.objectStore("clients");


    ClientObjs.cloud = 0;
    const updateRequest = store.put(ClientObjs);
    updateRequest.onsuccess = function () {
        console.log(`Los datos con ID ${ClientObjs} se actualizaron con éxito`);
    };
    updateRequest.onerror = function () {
        console.log(`Error al actualizar los datos con ID ${ClientObjs}: ${(updateRequest.error as any).message}`);
    };

}
async function updateClientCloud(ClientObjs:client) {
    const db = await openDatabase();
    const transaction = db.transaction("clients", "readwrite");
    const store = transaction.objectStore("clients");


    ClientObjs.cloud = 1;
    const updateRequest = store.put(ClientObjs);
    updateRequest.onsuccess = function () {
        console.log(`Los datos con ID ${ClientObjs} se actualizaron con éxito`);
    };
    updateRequest.onerror = function () {
        console.log(`Error al actualizar los datos con ID ${ClientObjs}: ${(updateRequest.error as any).message}`);
    };

}

function findClient(clientuuid:string):Promise<client> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction(keysDB.clients.Store, "readonly");
            const store = transaction.objectStore(keysDB.clients.Store);

            const request = store.get(clientuuid);
            request.onsuccess = function () {
                const client = request.result;
                if (client) {
                    resolve(client);
                } else {
                    reject(new Error("Client not found"));
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
function readClientsOffCloud():Promise<client[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction(keysDB.clients.Store, "readonly");
            const store = transaction.objectStore(keysDB.clients.Store);

            const index = store.index(keysDB.cloud.KeyPath); 
            const request = index.getAll(0); 
            request.onsuccess = function () {
                const client = request.result;
                if (client) {
                    resolve(client);
                } else {
                    reject(new Error("Client not found"));
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

async function GetEditClient(ClientObjs:client) {
    const db = await openDatabase();
    const transaction = db.transaction("clients", "readwrite");
    const store = transaction.objectStore("clients");


    ClientObjs.cloud = 1;
    const updateRequest = store.put(ClientObjs);
    updateRequest.onsuccess = function () {
        console.log(`Los datos con ID ${ClientObjs} se actualizaron con éxito`);
    };
    updateRequest.onerror = function () {
        console.log(`Error al actualizar los datos con ID ${ClientObjs}: ${(updateRequest.error as any).message}`);
    };

}
const clientsDB ={
    readClients,
    addClient,
    editClient,
    updateClientCloud,
    findClient,
    readClientsOffCloud,
    GetEditClient
}
export {clientsDB}