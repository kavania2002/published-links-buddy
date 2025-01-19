import { DB_NAME, DB_VERSION } from "./constants";

function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("links")) {
        const dbStore = db.createObjectStore("links", {
          keyPath: "id",
          autoIncrement: true,
        });

        dbStore.createIndex("url", "url", { unique: true });
        dbStore.createIndex("title", "title", { unique: false });
        dbStore.createIndex("type", "type", { unique: false });
        dbStore.createIndex("updatedAt", "updatedAt", { unique: false });
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
}

export { openDatabase };
