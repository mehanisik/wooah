'use client'

import { useConvexAuth } from 'convex/react'

export function useAuth() {
  const { isAuthenticated, isLoading } = useConvexAuth()
  return {
    isAuthenticated,
    loading: isLoading,
  }
}
