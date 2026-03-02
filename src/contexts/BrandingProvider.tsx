'use client'

import { Branding } from '@/payload-types'
import { createContext, useContext, useState } from 'react'

interface BrandingContextType {
  branding: Branding
}

export const BrandingContext = createContext<BrandingContextType | null>(null)

export const useBranding = () => {
  return useContext(BrandingContext)
}

export const BrandingProvider = ({
  branding,
  children,
}: {
  branding: Branding
  children: React.ReactNode
}) => {
  return <BrandingContext.Provider value={{ branding }}>{children}</BrandingContext.Provider>
}
