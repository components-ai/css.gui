import { compact, isNil, mapValues } from 'lodash-es'
import { getInputProps } from '../../lib/util'
import { DataTypeSchema, RegenOptions } from './types'
import * as Toggle from '@radix-ui/react-toggle'
import { Link } from 'react-feather'
import { InputContainer } from '../inputs/InputContainer'

interface CreateBoxSideSchema<T> {
  itemSchema: DataTypeSchema<T>
}

export interface BoxSide<T> {
  top: T
  right?: T
  bottom?: T
  left?: T
}

/**
 * Schema describing positional top-right-bottom-left properties
 * (aka, the sides of a box).
 */
export function boxSideSchema<T>({
  itemSchema,
}: CreateBoxSideSchema<T>): DataTypeSchema<BoxSide<T>> {
  function stringify(value: BoxSide<T>) {
    const { stringify, defaultValue } = itemSchema
    if (isLinked(value)) {
      return stringify(value.top)
    }
    const {
      top,
      right = defaultValue,
      bottom = defaultValue,
      left = defaultValue,
    } = value
    return [top, right, bottom, left].map(stringify as any).join(' ')
  }
  const defaultValue = {
    top: itemSchema.defaultValue,
  }

  function regenerate({ previousValue }: RegenOptions<BoxSide<T>>) {
    return mapValues(previousValue, (value) => {
      if (value) {
        return (
          itemSchema.regenerate?.({ previousValue: value }) ?? previousValue
        )
      }
    }) as BoxSide<T>
  }
  return {
    stringify,
    defaultValue,
    validate: ((value: any) => {
      if (typeof value !== 'object') {
        return false
      }
      const { top, left, right, bottom } = value
      return compact([top, left, right, bottom]).every((item) =>
        itemSchema.validate(value)
      )
    }) as any,
    input(props) {
      const ItemInput = itemSchema.input
      const linked = isLinked(props.value)
      const linkToggle = (
        <Toggle.Root
          title="Link inputs"
          sx={{
            p: 0,
            background: 'none',
            border: 'none',
            color: 'muted',

            '&[data-state=on]': {
              color: 'text',
            },
          }}
          pressed={linked}
          onPressedChange={(pressed) => {
            if (pressed) {
              props.onChange({ top: props.value.top })
            } else {
              props.onChange({
                top: props.value.top,
                right: props.value.top,
                bottom: props.value.top,
                left: props.value.top,
              })
            }
          }}
        >
          <Link size={14} />
        </Toggle.Root>
      )
      return (
        <InputContainer
          {...props}
          defaultValue={defaultValue}
          stringify={stringify}
          regenerate={regenerate}
        >
          {linked ? (
            <div sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {linkToggle}
              <ItemInput {...getInputProps(props, 'top')} label="" />
            </div>
          ) : (
            <div
              sx={{
                display: 'grid',
                justifyItems: 'center',
                gridTemplateRows: '1fr max-content 1fr',
                gridTemplateAreas: `
                "top top top"
                "left link right"
                "bottom bottom bottom"
            `,
              }}
            >
              <div sx={{ gridArea: 'link' }}>{linkToggle}</div>
              {['top', 'left', 'right', 'bottom'].map((side) => {
                return (
                  <div sx={{ gridArea: side }}>
                    <ItemInput {...getInputProps(props, side as any)} />
                  </div>
                )
              })}
            </div>
          )}
        </InputContainer>
      )
    },
  }
}

function isLinked(value: BoxSide<any>) {
  return isNil(value?.bottom) && isNil(value?.left) && isNil(value?.right)
}
