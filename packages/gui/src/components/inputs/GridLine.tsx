import { EditorPropsWithLabel, getInputProps } from '../../lib/util'
import { Label, Number } from '../primitives'
import * as Toggle from '@radix-ui/react-toggle'
import { stringifyValues } from '../../lib/stringify'

interface GridLine {
  span?: boolean
  position: number
  ident: string
}

interface Props extends EditorPropsWithLabel<GridLine> {}

/**
 * Input for grid-{row/column}-{start/end}
 */
export function GridLineInput(props: Props) {
  const { label, value, onChange } = props
  return (
    <div>
      <Label>{label}</Label>
      <div sx={{ display: 'grid', gridTemplateColumns: 'max-content 1fr 1fr' }}>
        <Toggle.Root
          pressed={value.span}
          onPressedChange={(pressed) => onChange({ ...value, span: pressed })}
          sx={{
            border: '1px solid',
            borderColor: 'border',
            backgroundColor: 'background',
            color: 'muted',
            '&[data-state=on]': {
              backgroundColor: 'text',
              color: 'background',
            },
          }}
        >
          span
        </Toggle.Root>
        <Number {...getInputProps(props, 'position')} />
        <input
          type="text"
          value={value.ident}
          onChange={(e) => onChange({ ...value, ident: e.target.value })}
        />
      </div>
    </div>
  )
}

export function stringifyGridLine(value: GridLine) {
  const { span, position, ident } = value
  return stringifyValues([span ? 'span' : null, position, ident ? ident : null])
}
