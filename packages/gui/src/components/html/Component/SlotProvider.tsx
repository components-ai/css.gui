import { createContext, ReactNode, useContext } from 'react'
import { ElementPath, Slot } from '../types'

const DEFAULT_SLOT_VALUE = {}

type SlotProviderType = {
  value?: Slot
  path?: ElementPath
}

export function useSlot() {
  const context = useContext(SlotContext)
  return context
}

const SlotContext = createContext<SlotProviderType>(DEFAULT_SLOT_VALUE)

type SlotProviderProps = {
  value: Slot
  path: ElementPath
  children: ReactNode
}

export function SlotProvider({ value, path, children }: SlotProviderProps) {
  return (
    <SlotContext.Provider value={{ value, path }}>
      {children}
    </SlotContext.Provider>
  )
}
