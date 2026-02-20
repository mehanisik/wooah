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
  dayIdx: number
): Promise<PhotoMeta | null> {
  const supabase = getSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  if (!ALLOWED_MIME_TYPES.has(file.type)) return null
  if (file.size > MAX_PHOTO_SIZE) return null

  const rawExt = (file.name.split('.').pop() || 'jpg')
    .toLowerCase()
    .replace(/[^a-z]/g, '')
  const ext = ALLOWED_EXTENSIONS.has(rawExt) ? rawExt : 'jpg'
  const filename = `${Date.now()}.${ext}`
  const path = `${user.id}/${filename}`

  const { error: uploadErr } = await supabase.storage
    .from('photos')
    .upload(path, file, { contentType: file.type })
  if (uploadErr) return null

  const { data: urlData } = supabase.storage.from('photos').getPublicUrl(path)
  const now = new Date().toISOString()
  const key = `${user.id}-${Date.now()}`

  const { error: metaErr } = await supabase.from('photo_metadata').insert({
    user_id: user.id,
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
    date: now,
    week,
    dayIdx,
    storagePath: path,
  }
}

export async function loadPhotos(): Promise<PhotoMeta[]> {
  const supabase = getSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('photo_metadata')
    .select('*')
    .eq('user_id', user.id)
    .order('timestamp', { ascending: false })

  if (error || !data) return []

  return data.map(
    (row: {
      key: string
      storage_path: string
      timestamp: string
      week: number
      day_idx: number
    }) => {
      const { data: urlData } = supabase.storage
        .from('photos')
        .getPublicUrl(row.storage_path)
      return {
        id: row.key,
        url: urlData.publicUrl,
        date: row.timestamp,
        week: row.week,
        dayIdx: row.day_idx,
        storagePath: row.storage_path,
      }
    }
  )
}

export async function deletePhoto(photo: PhotoMeta): Promise<boolean> {
  const supabase = getSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return false

  if (!photo.storagePath.startsWith(`${user.id}/`)) return false

  await supabase.storage.from('photos').remove([photo.storagePath])
  await supabase
    .from('photo_metadata')
    .delete()
    .eq('key', photo.id)
    .eq('user_id', user.id)
  return true
}
