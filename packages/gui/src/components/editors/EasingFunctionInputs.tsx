import { mapValues, pickBy } from 'lodash-es'
import { getPropertyLabel, properties } from '../../data/properties'
import { EditorProps } from './types'
import { EasingFunctionEditor } from '../EasingFunction'
import { EasingFunction } from '../EasingFunction/types'
import { useId } from 'react'
import { Label } from '../primitives'

const easingFunctionProperties = pickBy(
  properties,
  (property) => property.type === 'easing-function'
)

export const easingFunctionInputs = mapValues(
  easingFunctionProperties,
  (property, name) => {
    return ({ value, onChange }: EditorProps<EasingFunction>) => {
      const id = `${useId()}-easing-function`
      return (
        <>
          <Label htmlFor={id}>{getPropertyLabel(name)}</Label>
          <EasingFunctionEditor value={value} onChange={onChange} />
        </>
      )
    }
  }
)
