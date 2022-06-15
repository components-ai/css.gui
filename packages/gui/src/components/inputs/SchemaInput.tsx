import { DataTypeSchema } from '../schemas/types'
import * as Collapsible from '@radix-ui/react-collapsible'
import { InputHeader } from '../ui/InputHeader'
import IconButton from '../ui/IconButton'
import { ChevronDown } from 'react-feather'

interface Props<T> {
  schema: DataTypeSchema<T>
  label: string
  value: T
  onChange(value: T): void
  onRemove?(): void
  reorder?: {
    onMoveUp?(): void
    onMoveDown?(): void
  }
}

/**
 * Creates a labelled input from a schema
 */
export function SchemaInput<T>({
  schema,
  label,
  value,
  onChange,
  ...props
}: Props<T>) {
  const Input = schema.input
  const InlineInput = schema.inlineInput
  return (
    <Collapsible.Root defaultOpen>
      <InputHeader
        {...schema}
        label={label}
        value={value}
        onChange={onChange}
        {...props}
      >
        {Input && (
          <Collapsible.Trigger asChild>
            <IconButton
              sx={{
                transform: 'rotate(0deg)',
                transition: 'transform 250ms',
                '&[data-state=closed]': {
                  transform: 'rotate(-90deg)',
                },
              }}
            >
              <ChevronDown size={14} />
            </IconButton>
          </Collapsible.Trigger>
        )}
        {InlineInput && (
          <InlineInput label="" value={value} onChange={onChange} />
        )}
      </InputHeader>
      {Input && (
        <Collapsible.Content>
          <Input label="" value={value} onChange={onChange} />
        </Collapsible.Content>
      )}
    </Collapsible.Root>
  )
}
