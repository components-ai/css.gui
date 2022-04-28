import { getDeclarationValue } from './stringify'
import { GradientField } from './field'
import Layers from '../../Layers'
import LayerHeader from '../../LayerHeader'
import { Gradient, GradientList, GradientStop } from './types'
import { randomColor } from '../../../lib/color'
import { randomInt } from '../../../lib/util'

type GradientEditorProps = {
  value: GradientList
  onChange: (newValue: GradientList) => void
}
export default function GradientPicker({
  value,
  onChange,
}: GradientEditorProps) {
  const newItem = () => {
    const firstStop: GradientStop = {
      color: randomColor() as string,
      hinting: randomInt(0, 100),
    }
    const secondStop: GradientStop = {
      color: randomColor() as string,
      hinting: randomInt(0, 100),
    }
    const newGradientLayer: Gradient = {
      degrees: randomInt(0, 360),
      type: 'linear',
      stops: [firstStop, secondStop],
    }

    return newGradientLayer
  }

  return (
    <>
      <section sx={{ p: 0 }}>
        <h4>Gradient</h4>
        <Layers<Gradient>
          newItem={newItem}
          addLabel="+ Add gradient"
          header={Header}
          content={GradientField}
          value={value}
          onChange={onChange}
        />
      </section>
    </>
  )
}

function Header({ value }: { value: Gradient }) {
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
