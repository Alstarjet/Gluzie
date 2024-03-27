import { openDatabase,keysDB } from "./indexedDBConect";
import type { productInventoryItem } from '../interfaces/catalog'

function readProducts(): Promise<productInventoryItem[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction(keysDB.products.Store, "readonly");
            const store = transaction.objectStore(keysDB.products.Store);

            const request = store.getAll();
            request.onsuccess = function () {
                resolve(request.result);
            };

            request.onerror = function () {
                console.log(request.error)
                reject(request.error);
            };
        } catch (error) {
            reject(error);
        }
    });
}
async function addProduct(productData:productInventoryItem): Promise<boolean> {
    const db = await openDatabase();
    const transaction = db.transaction(keysDB.products.Store, "readwrite");
    const store = transaction.objectStore(keysDB.products.Store);

    const request = store.add(productData);

    request.onsuccess = function () {
        return true
    };

    request.onerror = function () {
        console.log(request.error)
        return false
    };

    return true
}
async function editProduct(ProductObjs:productInventoryItem) {
    const db = await openDatabase();
    const transaction = db.transaction(keysDB.products.Store, "readwrite");
    const store = transaction.objectStore(keysDB.products.Store);


    const updateRequest = store.put(ProductObjs);
    updateRequest.onsuccess = function () {
        console.log(`Los datos con ID ${ProductObjs} se actualizaron con éxito`);
    };
    updateRequest.onerror = function () {
        console.log(`Error al actualizar los datos con ID ${ProductObjs}: ${(updateRequest.error as any).message}`);
    };

}



const productsDB ={
    readProducts,
    addProduct,
    editProduct,
}
export {productsDB}