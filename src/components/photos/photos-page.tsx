'use client'

import { Camera, Loader2, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useWorkoutStore } from '@/lib/store/use-workout-store'
import {
  deletePhoto,
  loadPhotos,
  type PhotoMeta,
  uploadPhoto,
} from '@/lib/supabase/photos'

export function PhotosPage() {
  const [photos, setPhotos] = useState<PhotoMeta[]>([])
  const [fullscreen, setFullscreen] = useState<PhotoMeta | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const currentWeek = useWorkoutStore((s) => s.currentWeek)

  useEffect(() => {
    loadPhotos()
      .then(setPhotos)
      .finally(() => setLoading(false))
  }, [])

  const handleAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)

    const dayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
    const photo = await uploadPhoto(file, currentWeek, dayIdx)

    if (photo) {
      setPhotos((prev) => [photo, ...prev])
    } else {
      const localPhoto: PhotoMeta = {
        id: `local-${Date.now()}`,
        url: URL.createObjectURL(file),
        date: new Date().toISOString(),
        week: currentWeek,
        dayIdx,
        storagePath: '',
      }
      setPhotos((prev) => [localPhoto, ...prev])
    }

    setUploading(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleRemove = async (photo: PhotoMeta) => {
    setPhotos((prev) => prev.filter((p) => p.id !== photo.id))
    if (photo.storagePath) await deletePhoto(photo)
  }

  const grouped = photos.reduce<Record<string, PhotoMeta[]>>((acc, p) => {
    const key = `W${p.week}`
    if (!acc[key]) acc[key] = []
    acc[key].push(p)
    return acc
  }, {})

  return (
    <div className="space-y-3 pb-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg tracking-wider">PHOTOS</h2>
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
          {uploading ? 'UPLOADING...' : 'NEW PHOTO'}
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

      {!loading && photos.length === 0 && (
        <div className="rounded-lg border border-border border-dashed bg-card px-4 py-8 text-center">
          <Camera className="mx-auto mb-2 h-8 w-8 text-muted-foreground/40" />
          <p className="text-muted-foreground text-xs">
            No progress photos yet
          </p>
          <p className="mt-0.5 text-[10px] text-muted-foreground/60">
            Take photos to track your visual progress
          </p>
        </div>
      )}

      {!loading &&
        photos.length > 0 &&
        Object.entries(grouped).map(([week, weekPhotos]) => (
          <div key={week}>
            <h3 className="mb-1.5 font-display text-muted-foreground text-xs tracking-wider">
              {week}
            </h3>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {weekPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md"
                >
                  <button
                    type="button"
                    className="h-full w-full"
                    onClick={() => setFullscreen(photo)}
                  >
                    <Image
                      src={photo.url}
                      alt={`Progress ${photo.date}`}
                      className="h-full w-full object-cover"
                      fill
                      unoptimized
                    />
                  </button>
                  <button
                    type="button"
                    className="absolute top-1 right-1 rounded-full bg-black/50 p-0.5"
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
            aria-label="Close fullscreen"
          />
          <button
            type="button"
            className="absolute top-4 right-4 z-10 p-2"
            onClick={() => setFullscreen(null)}
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <Image
            src={fullscreen.url}
            alt={`Progress ${fullscreen.date}`}
            className="max-h-full max-w-full object-contain"
            fill
            unoptimized
          />
        </div>
      )}
    </div>
  )
}
