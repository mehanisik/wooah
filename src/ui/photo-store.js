const DB_NAME = 'iron-ppl-photos';
const STORE_NAME = 'photos';

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE_NAME);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function savePhoto(week, dayIdx, blob) {
  const db = await openDB();
  const key = `w${week}-d${dayIdx}`;
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put({ blob, timestamp: Date.now() }, key);
    tx.oncomplete = () => resolve(key);
    tx.onerror = () => reject(tx.error);
  });
}

export async function getPhoto(week, dayIdx) {
  const db = await openDB();
  const key = `w${week}-d${dayIdx}`;
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).get(key);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}
