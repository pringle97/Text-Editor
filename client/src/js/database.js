import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
console.error('putDb not implemented');
const jateDb = await openDB('jate', 1);
const tx = jateDb.transaction('jate', 'readwrite');
const store = tx.objectStore('jate');
const req = store.put({ id: 1, value: content });
const res = await req;
  if (res) {
    console.log("data retrieved from db", res.value)
  } else {
    console.log("data not found")
  }
  return res?.value
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("get from database")
  const editorDb = await openDB("jate", 1)
  const trans = editorDb.transaction("jate", "readonly")
  const store = trans.objectStore("jate")
  const req = store.get(1)
  const res = await req
  if(res){
    console.log("data retrieved from db", res.value)
  } else {
    console.log("data not found")
  }
  return res?.value
};

initdb();
