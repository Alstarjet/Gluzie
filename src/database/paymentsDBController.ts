import { openDatabase,keysDB } from "./indexedDBConect";
import type { payment } from '../interfaces/payment'

function readPayments(): Promise<payment[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction(keysDB.payments.Store, "readonly");
            const store = transaction.objectStore(keysDB.payments.Store);

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
async function addPayment(paymentData:payment) {
    const db = await openDatabase();
    const transaction = db.transaction(keysDB.payments.Store, "readwrite");
    const store = transaction.objectStore(keysDB.payments.Store);

    const request = store.add(paymentData);

    request.onsuccess = function () {
        showAlert("Los datos se guardaron con éxito");
    };

    request.onerror = function () {
        showAlert("Error al guardar los datos: " + (request.error as any).message);
    };
}
async function editPayment(PaymentObjs:payment) {
    const db = await openDatabase();
    const transaction = db.transaction("payments", "readwrite");
    const store = transaction.objectStore("payments");


    PaymentObjs.cloud = 0;
    const updateRequest = store.put(PaymentObjs);
    updateRequest.onsuccess = function () {
        console.log(`Los datos con ID ${PaymentObjs} se actualizaron con éxito`);
    };
    updateRequest.onerror = function () {
        console.log(`Error al actualizar los datos con ID ${PaymentObjs}: ${(updateRequest.error as any).message}`);
    };

}
async function updatePaymentCloud(PaymentObjs:payment) {
    const db = await openDatabase();
    const transaction = db.transaction("payments", "readwrite");
    const store = transaction.objectStore("payments");


    PaymentObjs.cloud = 1;
    const updateRequest = store.put(PaymentObjs);
    updateRequest.onsuccess = function () {
        console.log(`Los datos con ID ${PaymentObjs} se actualizaron con éxito`);
    };
    updateRequest.onerror = function () {
        console.log(`Error al actualizar los datos con ID ${PaymentObjs}: ${(updateRequest.error as any).message}`);
    };

}
function showAlert(message:string) {
    alert(message);
}
function findPayments(clientuuid:string): Promise<payment[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction(keysDB.payments.Store, "readonly");
            const store = transaction.objectStore(keysDB.payments.Store);

            const index = store.index(keysDB.clients.KeyPathClient); // Índice para buscar por clientuuid

            const request = index.getAll(clientuuid); // Obtener todos los pagos para el clientuuid dado
            request.onsuccess = function () {
                const payments = request.result.filter(item => item.status == "active");
                resolve(payments);
            };

            request.onerror = function () {
                reject(request.error);
            };
        } catch (error) {
            reject(error);
        }
    });
}
function readPaymentsOffCloud(): Promise<payment[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction(keysDB.payments.Store, "readonly");
            const store = transaction.objectStore(keysDB.payments.Store);

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


const paymentsDB ={
    readPayments,
    addPayment,
    editPayment,
    updatePaymentCloud,
    findPayments,
    readPaymentsOffCloud
}
export {paymentsDB}