import { showToast } from './toast.js';

const DB_NAME = 'iron-ppl-photos';
const STORE_NAME = 'photos';
const BUCKET = 'photos';
const SIGNED_URL_EXPIRY = 3600;

let supabaseClient = null;
let getAuthUserFn = null;

export function setSupabaseClient(client, getAuthUser) {
  supabaseClient = client;
  getAuthUserFn = getAuthUser || null;
}

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE_NAME);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idbPut(key, value) {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put(value, key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      }),
  );
}

function idbDelete(key) {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).delete(key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      }),
  );
}

function idbGetAll() {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
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
              week: val.week ?? (match ? parseInt(match[1], 10) : 1),
              dayIdx: val.dayIdx ?? (match ? parseInt(match[2], 10) : 0),
            };
          });
          photos.sort((a, b) => b.timestamp - a.timestamp);
          resolve(photos);
        };
        tx.onerror = () => reject(tx.error);
      }),
  );
}

function getCloudUser() {
  return supabaseClient && getAuthUserFn ? getAuthUserFn() : null;
}

export async function savePhoto(week, dayIdx, blob) {
  const timestamp = Date.now();
  const key = `w${week}-d${dayIdx}-${timestamp}`;

  try {
    await idbPut(key, { blob, week, dayIdx, timestamp });
  } catch {
    showToast('Photo save failed');
    return;
  }

  const user = getCloudUser();
  if (supabaseClient && user) {
    const storagePath = `${user.id}/w${week}/d${dayIdx}/${timestamp}`;
    try {
      const { error: uploadErr } = await supabaseClient.storage.from(BUCKET).upload(storagePath, blob);
      if (uploadErr) throw uploadErr;

      const { error: metaErr } = await supabaseClient
        .from('photo_metadata')
        .insert({ user_id: user.id, key, week, day_idx: dayIdx, timestamp, storage_path: storagePath });
      if (metaErr) throw metaErr;
    } catch {
      // Cloud failed, local cache still saved
    }
  }

  return key;
}

export async function getPhoto(week, dayIdx) {
  const photos = await getAllPhotos();
  return photos.find((p) => p.week === week && p.dayIdx === dayIdx) || null;
}

export async function getAllPhotos() {
  const user = getCloudUser();
  if (supabaseClient && user) {
    try {
      const { data, error } = await supabaseClient
        .from('photo_metadata')
        .select('*')
        .order('timestamp', { ascending: false });

      if (!error && data && data.length > 0) {
        const paths = data.map((m) => m.storage_path);
        const { data: signed, error: signErr } = await supabaseClient.storage
          .from(BUCKET)
          .createSignedUrls(paths, SIGNED_URL_EXPIRY);

        const urlMap = {};
        if (!signErr && signed) {
          signed.forEach((s) => {
            if (s.signedUrl) urlMap[s.path] = s.signedUrl;
          });
        }

        return data.map((m) => ({
          key: m.key,
          url: urlMap[m.storage_path] || null,
          blob: null,
          timestamp: m.timestamp,
          week: m.week,
          dayIdx: m.day_idx,
        }));
      }
    } catch {
      // Fall through to IndexedDB
    }
  }

  try {
    return await idbGetAll();
  } catch {
    return [];
  }
}

export async function deletePhoto(key) {
  const user = getCloudUser();
  if (supabaseClient && user) {
    try {
      const { data } = await supabaseClient.from('photo_metadata').select('storage_path').eq('key', key).single();

      if (data) {
        await supabaseClient.storage.from(BUCKET).remove([data.storage_path]);
        await supabaseClient.from('photo_metadata').delete().eq('key', key);
      }
    } catch {
      // Cloud delete failed, still remove local
    }
  }

  try {
    await idbDelete(key);
  } catch {
    showToast('Photo delete failed');
  }
}
