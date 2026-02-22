import { getSupabaseClient } from './client'

export interface PhotoMeta {
  id: string
  url: string
  date: string
  week: number
  dayIdx: number
  storagePath: string
}

const ALLOWED_EXTENSIONS = new Set([
  'jpg',
  'jpeg',
  'png',
  'webp',
  'heic',
  'heif',
  'gif',
])
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
  'image/gif',
])
const MAX_PHOTO_SIZE = 20 * 1024 * 1024 // 20MB

export async function uploadPhoto(
  file: File,
  week: number,
  dayIdx: number,
  userId?: string
): Promise<PhotoMeta | null> {
  const supabase = getSupabaseClient()
  const uid = userId ?? (await supabase.auth.getSession()).data.session?.user.id
  if (!uid) return null

  if (!ALLOWED_MIME_TYPES.has(file.type)) return null
  if (file.size > MAX_PHOTO_SIZE) return null

  const rawExt = (file.name.split('.').pop() || 'jpg')
    .toLowerCase()
    .replace(/[^a-z]/g, '')
  const ext = ALLOWED_EXTENSIONS.has(rawExt) ? rawExt : 'jpg'
  const filename = `${Date.now()}.${ext}`
  const path = `${uid}/${filename}`

  const { error: uploadErr } = await supabase.storage
    .from('photos')
    .upload(path, file, { contentType: file.type })
  if (uploadErr) return null

  const { data: urlData } = supabase.storage.from('photos').getPublicUrl(path)
  const now = Date.now()
  const key = `${uid}-${now}`

  const { error: metaErr } = await supabase.from('photo_metadata').insert({
    user_id: uid,
    key,
    week,
    day_idx: dayIdx,
    timestamp: now,
    storage_path: path,
  })
  if (metaErr) return null

  return {
    id: key,
    url: urlData.publicUrl,
    date: new Date(now).toISOString(),
    week,
    dayIdx,
    storagePath: path,
  }
}

export async function loadPhotos(userId?: string): Promise<PhotoMeta[]> {
  const supabase = getSupabaseClient()

  const uid = userId ?? (await supabase.auth.getSession()).data.session?.user.id
  if (!uid) return []

  const { data, error } = await supabase
    .from('photo_metadata')
    .select('*')
    .eq('user_id', uid)
    .order('timestamp', { ascending: false })

  if (error || !data) return []

  return data.map(
    (row: {
      key: string
      storage_path: string
      timestamp: number
      week: number
      day_idx: number
    }) => {
      const { data: urlData } = supabase.storage
        .from('photos')
        .getPublicUrl(row.storage_path)
      return {
        id: row.key,
        url: urlData.publicUrl,
        date: new Date(row.timestamp).toISOString(),
        week: row.week,
        dayIdx: row.day_idx,
        storagePath: row.storage_path,
      }
    }
  )
}

export async function deletePhoto(
  photo: PhotoMeta,
  userId?: string
): Promise<boolean> {
  const supabase = getSupabaseClient()
  const uid = userId ?? (await supabase.auth.getSession()).data.session?.user.id
  if (!uid) return false

  if (!photo.storagePath.startsWith(`${uid}/`)) return false

  await supabase.storage.from('photos').remove([photo.storagePath])
  await supabase
    .from('photo_metadata')
    .delete()
    .eq('key', photo.id)
    .eq('user_id', uid)
  return true
}
