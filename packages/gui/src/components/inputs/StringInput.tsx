import { EditorPropsWithLabel } from '../../lib/util'
import { Label } from '../primitives'

interface StringValue {
  value: string
  unit: 'string' | 'keyword'
}

interface Props extends EditorPropsWithLabel<StringValue> {
  keywords?: string[]
}

export function StringInput({ label, value, onChange, keywords = [] }: Props) {
  return (
    <div>
      <Label>{label}</Label>
      <div>
        {value.unit === 'string' ? (
          <input
            type="text"
            value={value.value}
            onChange={(e) => onChange({ ...value, value: e.target.value })}
          />
        ) : (
          <select
            value={value.value}
            onChange={(e) => onChange({ ...value, value: e.target.value })}
          >
            {keywords.map((kw) => (
              <option value={kw}>{kw}</option>
            ))}
          </select>
        )}
        <select
          value={value.unit}
          onChange={(e) => onChange({ ...value, unit: e.target.value as any })}
        >
          <option value="string">string</option>
          <option value="keyword">keyword</option>
        </select>
      </div>
    </div>
  )
}
