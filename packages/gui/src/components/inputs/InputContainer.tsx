import { ReactNode } from 'react'
import { X } from 'react-feather'
import { EditorPropsWithLabel } from '../../types/editor'
import { Label } from '../primitives'
import { KeywordSelect } from '../primitives/KeywordSelect'
import IconButton from '../ui/IconButton'
import * as Select from '../ui/Select'

interface Props<T, K> extends EditorPropsWithLabel<T, K> {
  stringify(value: T): string
  children: ReactNode
  defaultValue: T
}

/**
 * Contains an input and decorates it with common input functionality
 * like keywords.
 */
export function InputContainer<T, K extends string = never>(
  props: Props<T, K>
) {
  const {
    value,
    onChange,
    onRemove,
    label,
    children,
    keywords = [],
    defaultValue,
    stringify,
    topLevel,
  } = props
  const isKeyword = typeof value === 'string'
  const inputType = isKeyword ? 'keyword' : 'value'
  const showTypeSelect = topLevel || keywords.length > 0

  return (
    <div>
      <div sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}>
        <Label>{label}</Label>
        <div
          sx={{
            display: 'flex',
            border: '1px solid',
            borderColor: 'border',
            borderRadius: '0.25rem',
            pl: 2,
          }}
        >
          {isKeyword ? (
            <KeywordSelect<K>
              hideIcon
              value={value as any}
              onChange={onChange}
              options={keywords}
              topLevel={topLevel}
            />
          ) : (
            <output sx={{ fontSize: 1, color: 'muted' }}>
              {stringify(value)}
            </output>
          )}
          {showTypeSelect && (
            <Select.Root
              value={inputType}
              onValueChange={(newInputType) => {
                if (newInputType === 'keyword' && inputType !== 'keyword') {
                  onChange(keywords?.[0] ?? 'inherit')
                } else if (newInputType === 'value' && inputType !== 'value') {
                  onChange(defaultValue)
                }
              }}
            >
              <Select.Trigger>
                <Select.Value>{''}</Select.Value>
                <Select.Icon />
              </Select.Trigger>
              <Select.Content>
                {['value', 'keyword'].map((typeOption) => {
                  return (
                    <Select.Item value={typeOption}>
                      <Select.ItemText>{typeOption}</Select.ItemText>
                      <Select.ItemIndicator />
                    </Select.Item>
                  )
                })}
              </Select.Content>
            </Select.Root>
          )}
        </div>
        <div sx={{ ml: 'auto' }}>
          {onRemove && <DeleteButton onRemove={onRemove} />}
        </div>
      </div>
      {!isKeyword && children}
    </div>
  )
}

interface DeleteButtonProps {
  onRemove(): void
}
export const DeleteButton = ({ onRemove }: DeleteButtonProps) => {
  return (
    <IconButton
      sx={{
        cursor: 'pointer',
        color: 'muted',
        transition: '.2s color ease-in-out',
        ':hover': {
          color: 'text',
        },
      }}
      onClick={() => onRemove()}
    >
      <X size={14} strokeWidth={3} color="currentColor" />
    </IconButton>
  )
}
