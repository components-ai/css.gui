import { getDeclarationValue } from './get-styles'
import { GradientEditor } from './group-editor'
import Layers from '../Layers'
import LayerHeader from '../LayerHeader'

type GradientEditorProps = {
  value: any
  onChange: any
}
export default function GradientsEditor({
  value,
  onChange,
}: GradientEditorProps) {
  const newItem = async () => {
    return {
      type: 'linear',
      stops: [],
    }
  }

  return (
    <>
      <section sx={{ p: 0 }}>
        <h4>Gradient</h4>
        <Layers
          newItem={newItem}
          addLabel="+ Add gradient"
          header={Header}
          content={GradientEditor}
          value={value}
          onChange={async (newValuePromise: Promise<any>[]) => {
            const newValue = await Promise.all(newValuePromise)
            onChange(newValue)
          }}
        />
      </section>
    </>
  )
}

function Header({ value }: any) {
  const style = getDeclarationValue(value)

  return (
    <LayerHeader
      text={style}
      preview={
        <div sx={{ width: '100%', height: '100%', backgroundImage: style }} />
      }
    />
  )
}
