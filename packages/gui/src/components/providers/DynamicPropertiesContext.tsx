import { createContext, ReactChild, useContext, useState } from 'react'

interface DynamicControlsContextProps {
  dynamicProperties?: string[]
  addDynamicProperty?: (property: string) => void
  removeDynamicProperty?: (property: string) => void
}
const DynamicControlsContext = createContext<DynamicControlsContextProps>({})

export function useDynamicControls() {
  const context = useContext(DynamicControlsContext)
  return context
}

interface DynamicControlsProviderProps {
  children: ReactChild
}
export function DynamicControlsProvider({
  children,
}: DynamicControlsProviderProps) {
  const [dynamicProps, setDynamicProps] = useState<string[]>([])
  const handleAddDynamicProperty = (newProperty: string) => {
    setDynamicProps([...dynamicProps, newProperty])
  }
  const handleRemoveDynamicProperty = (property: string) => {
    setDynamicProps(dynamicProps.filter((p) => p !== property))
  }

  return (
    <DynamicControlsContext.Provider
      value={{
        dynamicProperties: dynamicProps,
        addDynamicProperty: handleAddDynamicProperty,
        removeDynamicProperty: handleRemoveDynamicProperty,
      }}
    >
      {children}
    </DynamicControlsContext.Provider>
  )
}
