import { DataTypeSchema } from '../schemas/types'
import * as Collapsible from '@radix-ui/react-collapsible'
import { InputHeader } from '../ui/InputHeader'
import IconButton from '../ui/IconButton'
import { ChevronDown } from 'react-feather'

interface Props<T> {
  schema: DataTypeSchema<T>
  label: string
  value: T
  ruleset: any
  onChange(value: T): void
  onRemove?(): void
  onDrag?(): void
  onDragEnd?(): void
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
  ruleset,
  ...props
}: Props<T>) {
  const Input = schema.input
  const InlineInput = schema.inlineInput

  const content = Input && (
    <Input label="" value={value} onChange={onChange} ruleset={ruleset} />
  )
  const { hasBlockInput = () => !!content } = schema
  return (
    <Collapsible.Root defaultOpen>
      <InputHeader
        {...schema}
        {...props}
        label={label}
        value={value}
        onChange={onChange}
        ruleset={ruleset}
      >
        {hasBlockInput(value) && (
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
          <InlineInput
            label=""
            value={value}
            onChange={onChange}
            ruleset={ruleset}
          />
        )}
      </InputHeader>
      {content && <Collapsible.Content>{content}</Collapsible.Content>}
    </Collapsible.Root>
  )
}
