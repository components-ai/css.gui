import { EditorProps } from '../../types/editor'

export function CheckboxInput({
  value = false,
  onChange,
}: EditorProps<boolean | undefined>) {
  return (
    <input
      type="checkbox"
      checked={value}
      onChange={(e) => onChange(e.target.checked)}
    />
  )
}
