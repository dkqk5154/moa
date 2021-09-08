import { openDb, deleteDb } from 'idb'
// wrap, unwrap


async function openLocalDB(dbName, ver) {
    try {
        let version = ver === undefined ? 1 : ver
        const db = await openDb(dbName, version)
        return db
    }
    catch (err) {
        console.log(err)
        return null
    }

}

function createLocalDB(dbName, ver, storeName) {
    return new Promise((resolve, reject) => {
        const db = openDb(dbName, ver, upgradeDB => {
            // Note: we don't use 'break' in this switch statement,
            // the fall-through behaviour is what we want.
            upgradeDB.createObjectStore(storeName, {keyPath: 'id', autoIncrement: true }, );
        });
        resolve(db)
    })
}

async function insertOne(db, dbName, params) {
      try{
        const tx = await db.transaction([dbName], 'readwrite');
        await tx.objectStore(dbName).put(params);
        return tx.complete
      }  
      catch(err){
        console.log('idb insert_one err : ', err)
        return null
      }
}

async function insertAll(db, dbName, list) {
    try {
        const tx = await db.transaction([dbName], 'readwrite');
        list.forEach(async (j) => {
            await tx.objectStore(dbName).put(j);
        })
        return tx.complete
    }
    catch (err) {
        console.log('idb insert_all err : ', err)
        return null
    }
}

function deleteLocalDB(name){
    return new Promise(function(resolve, reject){
        deleteDb(name, {
            blocked() {
                // …
            },
        });
        resolve(true)
    })
}

async function getOne(db, keyword) {
    try {
        const keywordFormat = keyword === undefined ? 'plant' : keyword

        const result = await db.transaction(keywordFormat)
        .objectStore(keywordFormat).get(1);

        return result
    }
    catch (err) {
        console.log('getAll err : ',err)
        return null
    }
}

async function getAll(db, keyword) {
    try {
        const keywordFormat = keyword === undefined ? 'plant' : keyword

        const result = []

        const store = await db.transaction(keywordFormat).objectStore(keywordFormat)

        let getLength = await store.get(1)
        for(let i = 2; i < getLength.length + 2; i++){
            const formatOne = await store.get(i)
            result.push(formatOne)
        }


        return result
    }
    catch (err) {
        console.log('getAll err : ',err)
        return null
    }
}



export {
    openLocalDB,
    createLocalDB,
    insertOne,
    insertAll,
    getOne,
    getAll,
    deleteLocalDB,
}
