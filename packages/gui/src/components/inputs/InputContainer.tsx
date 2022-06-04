import { ReactNode } from 'react'
import { EditorPropsWithLabel } from '../../types/editor'
import { KeywordSelect } from '../primitives/KeywordSelect'
import { InputHeader } from '../ui/InputHeader'
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
      <InputHeader {...props}>
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
            <output
              sx={{
                fontSize: 1,
                color: 'text',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                width: 'max-content',
                maxWidth: '12rem',
                // maxWidth: '100%',
                maxHeight: '1.25rem',
              }}
              title={stringify(value)}
            >
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
      </InputHeader>
      {!isKeyword && children}
    </div>
  )
}
