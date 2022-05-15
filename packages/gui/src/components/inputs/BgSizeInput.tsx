import { stringifyUnit } from '../../lib/stringify'
import { getInputProps } from '../../lib/util'
import { LengthPercentage } from '../../types/css'
import { EditorPropsWithLabel } from '../../types/editor'
import { Label } from '../primitives'
import { LengthInput } from './LengthInput'

export type BgSize = BgSizeKeyword | BgSizeDimensions

interface BgSizeKeyword {
  type: 'keyword'
  value: 'contain' | 'cover'
}

interface BgSizeDimensions {
  type: 'dimensions'
  x: LengthPercentage
  y: LengthPercentage
}

/**
 * Input representing a background size (or anything in the shape of a background size, like clip-size).
 */
export function BgSizeInput(props: EditorPropsWithLabel<BgSize>) {
  return (
    <div>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: 'min-content 1fr min-content',
          gap: 2,
          alignItems: 'center',
        }}
      >
        <Label>{props.label}</Label>
        {props.value.type === 'keyword' ? (
          <select
            value={props.value.value}
            onChange={(e) =>
              props.onChange({ ...props.value, value: e.target.value } as any)
            }
          >
            {/* TODO enable global keywords */}
            <option value="cover">cover</option>
            <option value="contain">contain</option>
          </select>
        ) : (
          <output sx={{ fontSize: 1 }}>{stringifyBgSize(props.value)}</output>
        )}
        <select
          value={props.value.type}
          onChange={(e) =>
            props.onChange(getDefaultBgSize(e.target.value as any))
          }
        >
          <option value="keyword">keyword</option>
          <option value="dimensions">dimensions</option>
        </select>
      </div>
      {props.value.type === 'dimensions' && (
        <div
          sx={{
            display: 'grid',
            gap: 1,
          }}
        >
          <LengthInput percentage {...getInputProps(props, 'x' as any)} />
          <LengthInput percentage {...getInputProps(props, 'y' as any)} />
        </div>
      )}
    </div>
  )
}

export function stringifyBgSize(size: BgSize) {
  switch (size.type) {
    case 'keyword':
      return size.value
    case 'dimensions':
      return `${stringifyUnit(size.x)} ${stringifyUnit(size.y)}`
  }
}

function getDefaultBgSize(type: 'keyword' | 'dimensions'): BgSize {
  switch (type) {
    case 'keyword':
      return { type, value: 'cover' }
    case 'dimensions':
      return {
        type,
        x: { value: 100, unit: '%' },
        y: { value: 100, unit: '%' },
      }
  }
}
