import {
    openDB,

} from 'idb';

async function saveData(data) {
    const dbPromise = await openDB("LaLiga", 1, {
        upgrade(db) {
            // Create a store of objects
            const laligaStore = db.createObjectStore("saved_data", {
                keyPath: 'id',
            });
            laligaStore.createIndex('match_result', 'match_result');
            laligaStore.createIndex('team', 'team');
        }
    });
    const tx = dbPromise.transaction("saved_data", "readwrite");
    const store = tx.objectStore("saved_data");
    store.add(data);
    return tx.done;
}

async function readSavedData(key) {
    const dbPromise = await openDB("LaLiga", 1, {
        upgrade(db) {
            // Create a store of objects
            const laligaStore = db.createObjectStore("saved_data", {
                keyPath: 'id',
            });
            laligaStore.createIndex('match_result', 'match_result');
            laligaStore.createIndex('team', 'team');
        }
    });
    const tx = dbPromise.transaction("saved_data");
    const store = tx.objectStore("saved_data");
    return await store.get(key);
}

async function readAllSavedData() {
    const dbPromise = await openDB("LaLiga", 1, {
        upgrade(db) {
            // Create a store of objects
            const laligaStore = db.createObjectStore("saved_data", {
                keyPath: 'id',
            });
            laligaStore.createIndex('match_result', 'match_result');
            laligaStore.createIndex('team', 'team');
        }
    });
    return await dbPromise.getAll('saved_data');
}


async function removeData(key) {
    const dbPromise = await openDB("LaLiga", 1, {
        upgrade(db) {
            // Create a store of objects
            const laligaStore = db.createObjectStore("saved_data", {
                keyPath: 'id',
            });
            laligaStore.createIndex('match_result', 'match_result');
            laligaStore.createIndex('team', 'team');
        }
    });
    const tx = dbPromise.transaction("saved_data", "readwrite");
    const store = tx.objectStore("saved_data");
    console.log(key)
    return await store.delete(key);
}

export {
    saveData,
    readSavedData,
    readAllSavedData,
    removeData
};