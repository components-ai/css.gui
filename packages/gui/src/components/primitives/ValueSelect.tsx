import * as Select from '@radix-ui/react-select'

interface ValueInputProps {
  onChange: (e: any) => void
  value: string
  values: string[]
}

export const ValueSelect = ({
  onChange,
  value,
  values,
}: ValueInputProps): any => {
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
          {values.map((value) => {
            return (
              <Select.Item
                value={value}
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
                <Select.ItemText>{value}</Select.ItemText>
              </Select.Item>
            )
          })}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  )
}
