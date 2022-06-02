import * as Select from '@radix-ui/react-select'
import { ComponentType } from 'react'
import { ChevronDown } from 'react-feather'

/* compai-styled versions of the radix select input */

export const Root = Select.Root
export const Value = Select.Value

type PropsType<X> = X extends ComponentType<infer P> ? P : never

export const Trigger = (props: PropsType<typeof Select.Trigger>) => {
  return (
    <Select.Trigger
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        appearance: 'none',
        border: 'none',
        background: 'none',
        color: 'text',
      }}
      {...props}
    />
  )
}

export const Icon = (props: PropsType<typeof Select.Icon>) => {
  return (
    <Select.Icon {...props}>
      <ChevronDown size={14} sx={{ transform: 'translateY(3px)' }} />
    </Select.Icon>
  )
}

export const Content = ({
  children,
  ...props
}: PropsType<typeof Select.Content>) => {
  return (
    <Select.Content
      {...props}
      sx={{
        backgroundColor: 'background',
        py: 2,
        border: '1px solid',
        borderColor: 'border',
        borderRadius: '0.5rem',
        fontSize: 1,
        cursor: 'pointer',
      }}
    >
      {/* Combine with the viewpoint (and the scroll arrows?) for convenience */}
      <Select.Viewport>{children}</Select.Viewport>
    </Select.Content>
  )
}

export const Item = (props: PropsType<typeof Select.Item>) => {
  return (
    <Select.SelectItem
      {...props}
      sx={{
        position: 'relative',
        pr: 3,
        pl: 4,
        ':hover': {
          backgroundColor: 'primary',
        },
      }}
    />
  )
}

export const ItemIndicator = (
  props: PropsType<typeof Select.ItemIndicator>
) => {
  return (
    <Select.ItemIndicator
      {...props}
      sx={{
        position: 'absolute',
        left: 3,
      }}
    >
      ✓
    </Select.ItemIndicator>
  )
}

export const ItemText = Select.ItemText
