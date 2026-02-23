'use client'

import { useMutation, useQuery } from 'convex/react'
import { Camera, Loader2, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCurrentWeek } from '@/hooks/use-current-week'
import { useT } from '@/lib/i18n'
import { api } from '../../../convex/_generated/api'

export function PhotosPage() {
  const t = useT()
  const currentWeek = useCurrentWeek()
  const photos = useQuery(api.photos.getAll)
  const generateUploadUrl = useMutation(api.photos.generateUploadUrl)
  const savePhoto = useMutation(api.photos.save)
  const removePhoto = useMutation(api.photos.remove)

  const [fullscreen, setFullscreen] = useState<
    NonNullable<typeof photos>[number] | null
  >(null)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const loading = photos === undefined

  const handleAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)

    try {
      const dayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
      const uploadUrl = await generateUploadUrl()
      const result = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
      })
      if (!result.ok) throw new Error(`Upload failed: ${result.status}`)
      const { storageId } = await result.json()
      await savePhoto({
        storageId,
        week: currentWeek,
        dayIndex: dayIdx,
        timestamp: Date.now(),
      })
    } catch {
      // upload failed silently
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const handleRemove = async (photo: NonNullable<typeof photos>[number]) => {
    if (!confirm(t('confirmDeletePhoto'))) return
    await removePhoto({ photoId: photo._id })
  }

  const photoList = photos ?? []
  const grouped = photoList.reduce<Record<string, typeof photoList>>(
    (acc, p) => {
      const key = `W${p.week}`
      if (!acc[key]) acc[key] = []
      acc[key].push(p)
      return acc
    },
    {}
  )

  return (
    <div className="space-y-3 pb-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg tracking-wider">{t('photos')}</h2>
        <Button
          size="sm"
          className="text-xs"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
          ) : (
            <Camera className="mr-1 h-3 w-3" />
          )}
          {uploading ? t('uploading') : t('newPhoto')}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleAdd}
        />
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {!loading && photoList.length === 0 && (
        <div className="rounded-lg border border-border border-dashed bg-card px-4 py-8 text-center">
          <Camera className="mx-auto mb-2 h-8 w-8 text-muted-foreground/40" />
          <p className="text-muted-foreground text-xs">{t('noPhotosYet')}</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground/60">
            {t('trackVisualProgress')}
          </p>
        </div>
      )}

      {!loading &&
        photoList.length > 0 &&
        Object.entries(grouped).map(([week, weekPhotos]) => (
          <div key={week}>
            <h3 className="mb-1.5 font-display text-muted-foreground text-xs tracking-wider">
              {week}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {weekPhotos.map((photo) => (
                <div
                  key={photo._id}
                  className="relative aspect-square overflow-hidden rounded-md"
                >
                  <button
                    type="button"
                    className="h-full w-full"
                    onClick={() => setFullscreen(photo)}
                  >
                    <Image
                      src={photo.url ?? ''}
                      alt={`Progress ${new Date(photo.timestamp).toLocaleDateString()}`}
                      className="h-full w-full object-cover"
                      fill
                      unoptimized
                    />
                  </button>
                  <button
                    type="button"
                    className="absolute top-1 right-1 rounded-full bg-black/50 p-1.5"
                    onClick={() => handleRemove(photo)}
                  >
                    <Trash2 className="h-3 w-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

      {fullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button
            type="button"
            className="absolute inset-0"
            onClick={() => setFullscreen(null)}
            aria-label={t('closeFullscreen')}
          />
          <button
            type="button"
            className="absolute top-6 right-4 z-10 p-2"
            onClick={() => setFullscreen(null)}
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <Image
            src={fullscreen.url ?? ''}
            alt={`Progress ${new Date(fullscreen.timestamp).toLocaleDateString()}`}
            className="max-h-full max-w-full object-contain"
            fill
            unoptimized
          />
        </div>
      )}
    </div>
  )
}
