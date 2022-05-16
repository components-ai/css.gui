import { Number } from '.'

interface ThemeValueProps {
  onChange: (e: number) => void
  themeValues: any[]
  value: number
}

export const ThemeValue = ({
  onChange,
  value,
  themeValues
}: ThemeValueProps) => {
  return (
    <Number
      value={value}
      min={1}
      max={themeValues.length}
      onChange={onChange}
    />
  )
}
