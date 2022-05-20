import { createContext, ReactChild, useContext, useState } from 'react'

// TODO - on remove of property
interface DynamicControlsContextProps {
  dynamicProperties?: string[]
  addDynamicProperty?: (property: string) => void
}
const DynamicControlsContext = createContext<DynamicControlsContextProps>({})

export function useDynamicControls() {
  const context = useContext(DynamicControlsContext)
  return context
}

interface DynamicControlsProviderProps {
  dynamicProperties: string[]
  children: ReactChild
}
export function DynamicControlsProvider({
  children,
}: DynamicControlsProviderProps) {
  const [dynamicProps, setDynamicProps] = useState<string[]>([])
  const handleAddDynamicProperty = (newProperty: string) => {
    console.log(newProperty)
    setDynamicProps([...dynamicProps, newProperty])
  }

  return (
    <DynamicControlsContext.Provider
      value={{
        dynamicProperties: dynamicProps,
        addDynamicProperty: handleAddDynamicProperty,
      }}
    >
      {children}
    </DynamicControlsContext.Provider>
  )
}
