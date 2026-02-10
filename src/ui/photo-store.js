import { showToast } from './toast.js';

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
  try {
    const db = await openDB();
    const key = `w${week}-d${dayIdx}-${Date.now()}`;
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put({ blob, week, dayIdx, timestamp: Date.now() }, key);
      tx.oncomplete = () => resolve(key);
      tx.onerror = () => { showToast('Photo save failed'); reject(tx.error); };
    });
  } catch {
    showToast('Photo save failed');
  }
}

export async function getPhoto(week, dayIdx) {
  try {
    const photos = await getAllPhotos();
    const session = photos.find(p => p.week === week && p.dayIdx === dayIdx);
    return session || null;
  } catch {
    return null;
  }
}

export async function getAllPhotos() {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const keys = store.getAllKeys();
      const values = store.getAll();
      tx.oncomplete = () => {
        const photos = keys.result.map((key, i) => {
          const val = values.result[i];
          const match = key.match(/w(\d+)-d(\d+)/);
          return {
            key,
            blob: val.blob,
            timestamp: val.timestamp || 0,
            week: val.week ?? (match ? parseInt(match[1]) : 1),
            dayIdx: val.dayIdx ?? (match ? parseInt(match[2]) : 0),
          };
        });
        photos.sort((a, b) => b.timestamp - a.timestamp);
        resolve(photos);
      };
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    return [];
  }
}

export async function deletePhoto(key) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    showToast('Photo delete failed');
  }
}
