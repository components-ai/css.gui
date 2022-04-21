interface ThemeValueInputProps {
  onChange: (e: any) => void
  themeValues?: any[]
}

export const ThemeValueSelect = ({
  onChange,
  themeValues
}: ThemeValueInputProps): any => {
  return (
    <select
      onChange={onChange}
    >
      {themeValues?.map(({ value, unit, id }) => {
        return <option value={id}>{value}{unit}</option>
      })}
    </select>
  )
}