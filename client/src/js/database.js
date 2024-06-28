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

  //console.error('putDb not implemented');
  console.log('Updating database...');

  // Open the database
  const db = await openDB('jate', 1);

  // Create a new transaction
  const transaction = db.transaction('jate', 'readwrite');

  // Get the object store
  const store = transaction.objectStore('jate');

  // Put the content into the store
  const update = store.put({ id: 1, value: content });

  // Wait for the transaction to complete
  const result = await update;
  console.log('Data Saved!', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

  //console.error('getDb not implemented');
  console.log('Retrieving Data...');

  // Open the database
  const db = await openDB('jate', 1);

  // Create a new transaction
  const transaction = db.transaction('jate', 'readonly');

  // Get the object store
  const store = transaction.objectStore('jate');

  // Get all data from the store
  const retrieve = store.getAll();

  // Wait for the transaction to complete
  const result = await retrieve;
  console.log('Date Retrieved!', result);
  return result;
}

initdb();
