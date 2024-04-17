import { openDatabase,keysDB } from "./indexedDBConect";
import type { catalog } from '../interfaces/catalog'

function readCatalogs(): Promise<catalog[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction(keysDB.catalogs.Store, "readonly");
            const store = transaction.objectStore(keysDB.catalogs.Store);

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
async function addCatalog(productData:catalog): Promise<boolean> {
    const db = await openDatabase();
    const transaction = db.transaction(keysDB.catalogs.Store, "readwrite");
    const store = transaction.objectStore(keysDB.catalogs.Store);

    const request = store.add(productData);

    request.onsuccess = function () {
        return true
    };

    request.onerror = function () {
        return false
    };

    return true
}
async function editCatalog(CatalogObjs:catalog) {
    const db = await openDatabase();
    const transaction = db.transaction(keysDB.catalogs.Store, "readwrite");
    const store = transaction.objectStore(keysDB.catalogs.Store);


    const updateRequest = store.put(CatalogObjs);
    updateRequest.onsuccess = function () {
        console.log(`Los datos con ID ${CatalogObjs} se actualizaron con éxito`);
    };
    updateRequest.onerror = function () {
        console.log(`Error al actualizar los datos con ID ${CatalogObjs}: ${(updateRequest.error as any).message}`);
    };

}



const catalogsDB ={
    readCatalogs,
    addCatalog,
    editCatalog,
}
export {catalogsDB}