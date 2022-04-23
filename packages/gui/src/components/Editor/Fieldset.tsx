import * as React from 'react'

type FieldsetContextProps = {
  type: 'element' | 'pseudo'
  name: string
}
const DEFAULT_FIELDSET_CONTEXT: FieldsetContextProps = {
  type: 'element',
  name: 'div',
}

const FieldsetContext = React.createContext<FieldsetContextProps | null>(null)

export const useFieldset = (): FieldsetContextProps | null =>
  React.useContext(FieldsetContext)

type FieldsetProps = FieldsetContextProps & { children: any }
export const Fieldset = ({ type, name, children }: FieldsetProps) => {
  // TODO: Merge fieldset
  const fullName = type === 'pseudo' ? '::' + name : name
  return (
    <FieldsetContext.Provider value={{ type, name: fullName }}>
      {children}
    </FieldsetContext.Provider>
  )
}
