import * as Select from '@radix-ui/react-select'
import { ChevronDown } from 'react-feather'
import { GLOBAL_KEYWORDS } from '../../data/global-keywords'
import { EditorProps } from '../../types/editor'

interface Props<T extends string> extends EditorProps<T> {
  options: T[]
  hideIcon?: boolean
}

export const KeywordSelect = <T extends string>({
  onChange,
  value,
  options,
  topLevel,
  hideIcon,
}: Props<T>) => {
  const allOptions = topLevel ? [...options, ...GLOBAL_KEYWORDS] : options
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        sx={{
          minHeight: '1.6em',
          background: 'none',
          border: 'none',
          color: 'text',
          width: 'max-content',
          ':hover': {
            background: 'backgroundOffset',
          },
        }}
      >
        <Select.Value />
        {!hideIcon && (
          <Select.Icon>
            <ChevronDown size={14} sx={{ transform: 'translateY(3px)' }} />
          </Select.Icon>
        )}
      </Select.Trigger>
      <Select.Content
        sx={{
          backgroundColor: 'background',
          text: 'text',
          py: 1,
          border: '1px solid',
          borderColor: 'border',
          borderRadius: '0.5rem',
          fontSize: 1,
        }}
      >
        <Select.Viewport>
          {allOptions.map((option) => {
            return (
              <Select.Item
                value={option as any}
                sx={{
                  pr: 3,
                  pl: 4,
                  cursor: 'pointer',
                  ':hover': {
                    backgroundColor: 'primary',
                  },
                }}
              >
                <Select.ItemIndicator
                  sx={{
                    position: 'absolute',
                    left: 3,
                  }}
                >
                  ✓
                </Select.ItemIndicator>
                <Select.ItemText>{option}</Select.ItemText>
              </Select.Item>
            )
          })}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  )
}
