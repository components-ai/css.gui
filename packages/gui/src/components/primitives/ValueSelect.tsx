interface ValueInputProps {
  onChange: (e: any) => void
  values: any[]
}

export const ValueSelect = ({ onChange, values }: ValueInputProps): any => {
  return (
    <select onChange={onChange} sx={{ width: '100%', minHeight: '1.6em' }}>
      {values.map((v) => {
        return typeof v === 'string' ? (
          <option>{v}</option>
        ) : (
          <option value={v.id}>
            {v.value}
            {v.unit}
          </option>
        )
      })}
    </select>
  )
}
