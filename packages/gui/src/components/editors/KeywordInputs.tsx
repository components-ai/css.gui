import { lowerCase, mapValues, pickBy, upperFirst } from 'lodash-es'
import { ChangeEvent, useId } from 'react'
import { properties } from '../../data/properties'
import { Label } from '../primitives'
import { KeywordEditorProps } from './types'

const keywordProperties = pickBy(
  properties,
  (property) => property.type === 'keyword'
)

// for simplicity, just use the same default keyword for now.
// If we need to support different defaults, we can add them to the data definition.
const DEFAULT_KEYWORD = 'inherit'
export const keywordInputs = mapValues(keywordProperties, (property, name) => {
  return ({ value, onChange }: KeywordEditorProps) => {
    const id = useId()
    const fullId = `${id}-${name}`
    return (
      <>
        <Label htmlFor={fullId}>{getLabel(name)}</Label>
        <Select
          id={fullId}
          value={value || DEFAULT_KEYWORD}
          onChange={onChange}
          values={property.keywords}
        />
      </>
    )
  }
})

// Inputs have to be manually added here to get exports working
export const AlignContentInput = keywordInputs.alignContent
export const AlignItemsInput = keywordInputs.alignItems
export const AlignSelfInput = keywordInputs.alignSelf
export const AppearanceInput = keywordInputs.appearance
export const BackfaceVisibilityInput = keywordInputs.backfaceVisibility
export const DisplayInput = keywordInputs.display
export const FloatInput = keywordInputs.float
export const VisibilityInput = keywordInputs.visibility
// Typography
export const TextAlignInput = keywordInputs.textAlign
export const WritingModeInput = keywordInputs.writingMode
export const WhiteSpaceInput = keywordInputs.whiteSpace
export const WordBreakInput = keywordInputs.wordBreak

type SelectProps = {
  id: string
  onChange: (newValue: string) => void
  values: string[]
  value: string
}
export const Select = ({ value, onChange, id, values }: SelectProps): any => {
  return (
    <select
      id={id}
      value={value}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
      sx={{ width: '100%', minHeight: '1.6em' }}
    >
      {values.map((v) => {
        return (
          <option key={v} value={v}>
            {v}
          </option>
        )
      })}
    </select>
  )
}

// Convert a css keyword to display string
function getLabel(keyword: string) {
  return upperFirst(lowerCase(keyword))
}
