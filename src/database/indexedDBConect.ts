const nameDB = "CloudStone"
const version = 1
const keysDB = {
  clients: { Store: "clients", KeyPath: "clientuuid" },
  charges: { Store: "charges", KeyPath: "uuid" },
  payments: { Store: "payments", KeyPath: "uuid" },
  catalogs: { Store: "catalogs", KeyPath: "key" },
  cloud: { Store: "cloud", KeyPath: "cloud" },
  products:{Store: "products", KeyPath: "productuuid",KeyPath2:"key" }
};

let db: IDBDatabase

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (db) {
      console.log("La base ya esta habierta")
      // Si la base de datos ya está abierta, resuelve inmediatamente
      resolve(db);
    } else {
      console.log("Iniciando Base de datos")
      const openRequest = indexedDB.open(nameDB, version);

      openRequest.onupgradeneeded = function (event) {
        console.log("no existe la base de datos")
        // la versión de la base existente es menor que 2 (o ni siquiera existe)
        let db = openRequest.result;
        switch (event.oldVersion) { // versión de db existente
          case 0:
            const clientStore = db.createObjectStore(keysDB.clients.Store, { keyPath: keysDB.clients.KeyPath });
            const chargesStore = db.createObjectStore(keysDB.charges.Store, { keyPath: keysDB.charges.KeyPath });
            const paymentsStore = db.createObjectStore(keysDB.payments.Store, { keyPath: keysDB.payments.KeyPath });
            const productsStore = db.createObjectStore(keysDB.products.Store, { keyPath: keysDB.products.KeyPath });

            db.createObjectStore(keysDB.catalogs.Store, { keyPath: keysDB.catalogs.KeyPath });
            //busqueda por cliente
            chargesStore.createIndex(keysDB.clients.KeyPath, keysDB.clients.KeyPath, { unique: false });
            chargesStore.createIndex(keysDB.cloud.KeyPath, keysDB.cloud.KeyPath, { unique: false });

            paymentsStore.createIndex(keysDB.clients.KeyPath, keysDB.clients.KeyPath, { unique: false });
            paymentsStore.createIndex(keysDB.cloud.KeyPath, keysDB.cloud.KeyPath, { unique: false });

            productsStore.createIndex(keysDB.products.KeyPath, keysDB.products.KeyPath, { unique: false });
            productsStore.createIndex(keysDB.cloud.KeyPath, keysDB.cloud.KeyPath, { unique: false });
            productsStore.createIndex(keysDB.products.KeyPath2, keysDB.products.KeyPath2, { unique: false });

            clientStore.createIndex(keysDB.cloud.KeyPath, keysDB.cloud.KeyPath, { unique: false })
            break
          case 1:
            // el cliente tiene la versión 1
            // actualizar
            break
        }
      };

      openRequest.onsuccess = function () {
        db = openRequest.result;
        console.log("Se logró, ya podemos usarla");
        resolve(db);
      };

      openRequest.onerror = function () {
        console.error("Error", openRequest.error);
        reject(openRequest.error);
      };
    }
  });
}

export { openDatabase, keysDB };
