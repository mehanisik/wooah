import type { Metadata } from 'next'
import { PhotosPage as PhotosContent } from '@/components/photos/photos-page'

export const metadata: Metadata = {
  title: 'Photos — IRON PPL',
}

export default function PhotosPage() {
  return <PhotosContent />
}
