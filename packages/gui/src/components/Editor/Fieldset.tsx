import * as React from 'react'
import { elements } from '../../data/elements'
import { pseudoClasses } from '../../data/pseudo-classes'
import { pseudoElements } from '../../data/pseudo-elements'
import { getFieldsetPropsFromName } from './util'

type PseudoElementTypes = typeof pseudoElements[number]
type PseudoClassTypes = typeof pseudoClasses[number]
type ElementTypes = typeof elements[number]
type ClassTypes = string

type FieldsetNames =
  | PseudoElementTypes
  | PseudoClassTypes
  | ElementTypes
  | ClassTypes

export type FieldsetContextProps = {
  type: 'pseudo-element' | 'pseudo-class' | 'element' | 'class'
  name: FieldsetNames | FieldsetNames[]
}

const FieldsetContext = React.createContext<FieldsetContextProps | null>(null)

export const useFieldset = (): FieldsetContextProps | null =>
  React.useContext(FieldsetContext)

type FieldsetProps = FieldsetContextProps & { children: any }
export const Fieldset = ({ type, name, children }: FieldsetProps) => {
  const outerFieldset = useFieldset()
  const outerNames = outerFieldset ? outerFieldset.name : []
  const fullName = outerNames.length
    ? [...outerNames, name]
    : (name as FieldsetNames)

  return (
    // @ts-ignore
    <FieldsetContext.Provider value={{ type, name: fullName }}>
      {children}
    </FieldsetContext.Provider>
  )
}

type GenericFieldsetProps = {
  field: string
  children?: React.ReactNode
}
export const GenericFieldset = ({ field, children }: GenericFieldsetProps) => {
  return <Fieldset {...getFieldsetPropsFromName(field)}>{children}</Fieldset>
}
