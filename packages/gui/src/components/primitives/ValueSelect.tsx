interface ValueInputProps {
  onChange: (e: any) => void
  value?: string
  values: any[]
}

export const ValueSelect = ({
  onChange,
  value,
  values,
}: ValueInputProps): any => {
  return (
    <select
      value={value}
      onChange={onChange}
      sx={{ width: '100%', minHeight: '1.6em' }}
    >
      {values.map((v) => {
        return typeof v === 'string' ? (
          <option key={v}>{v}</option>
        ) : (
          <option key={v} value={v.id}>
            {v.value}
            {v.unit}
          </option>
        )
      })}
    </select>
  )
}
