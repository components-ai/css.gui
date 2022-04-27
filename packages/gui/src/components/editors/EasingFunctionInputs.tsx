import { mapValues, pickBy } from 'lodash-es'
import { properties } from '../../data/properties'
import { EditorProps } from './types'
import { EasingFunctionEditor } from '../EasingFunction'
import { EasingFunction } from '../EasingFunction/types'
import { useId } from 'react'
import { Label } from '../primitives'
import { sentenceCase } from '../../lib/util'

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
          <Label htmlFor={id}>{sentenceCase(name)}</Label>
          <EasingFunctionEditor value={value} onChange={onChange} />
        </>
      )
    }
  }
)
