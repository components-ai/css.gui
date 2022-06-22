import { Prop, Props } from './types'

type PropsEditorProps = {
  props: Props
  onChange(newProps: Props): void
}
export const PropsEditor = ({ props, onChange }: PropsEditorProps) => {
  const handleAddProp = () => {
    const newProp: Prop = {
      name: 'newProp',
      type: 'string',
    }

    onChange([...props, newProp])
  }

  const handlePropChange = (index: number) => (propData: Prop) => {
    const newProps = [...props]
    newProps[index] = propData
    onChange(newProps)
  }

  return (
    <>
      <h2>Props</h2>
      {props.map((prop: Prop, index: number) => {
        return (
          <PropEditor
            key={index}
            prop={prop}
            onChange={handlePropChange(index)}
          />
        )
      })}
      <button onClick={handleAddProp}>Add prop</button>
    </>
  )
}

type PropEditorProps = {
  prop: Prop
  onChange(prop: Prop): void
}
const PropEditor = ({ prop, onChange }: PropEditorProps) => {
  const handleNameChange = (e: any) => {
    const newProp: Prop = { ...prop }
    newProp.name = e.target.value
    onChange(newProp)
  }

  const handleTypeChange = (e: any) => {
    const newProp: Prop = { ...prop }
    newProp.type = e.target.value
    onChange(newProp)
  }

  const handleDefaultValueChange = (e: any) => {
    const newProp: Prop = { ...prop }
    newProp.defaultValue = e.target.value
    onChange(newProp)
  }

  const getPropInputType = (prop: Prop) => {
    if (prop.type === 'number') {
      return 'number'
    }

    return 'text'
  }

  return (
    <div sx={{ mt: 3 }}>
      <div>
        <label>
          Name
          <input type="text" value={prop.name} onChange={handleNameChange} />
        </label>
      </div>
      <div>
        <label>
          Type
          <select value={prop.type} onChange={handleTypeChange}>
            <option value="string">string</option>
            <option value="number">number</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Default value
          <input
            type={getPropInputType(prop)}
            value={prop.defaultValue ?? ''}
            onChange={handleDefaultValueChange}
          />
        </label>
      </div>
    </div>
  )
}
