'use client'

import { createContext, useContext, useRef } from 'react'

import { ColorStore, ColorsHydrateValues, createColorStore } from '@/store/store'
import { useStore } from 'zustand'

export type ColorStoreApi = ReturnType<typeof createColorStore>

const ColorStoreContext = createContext<ColorStoreApi | null>(null)

export interface ColorStoreProviderProps extends ColorsHydrateValues {
  children: any
}

export function ColorStoreProvider({ children, ...rest }: ColorStoreProviderProps) {
  const storeRef = useRef<ColorStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createColorStore(rest)
  }

  return <ColorStoreContext.Provider value={storeRef.current}>{children}</ColorStoreContext.Provider>
}

export const useColorStore = <T,>(selector: (store: ColorStore) => T): T => {
  const storeContent = useContext(ColorStoreContext)
  if (!storeContent) {
    throw new Error('useColorStore must be used within a ColorStoreProvider')
  }
  return useStore(storeContent, selector)
}
