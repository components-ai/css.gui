import { ComponentType, useState } from 'react'
import { stringifyUnit } from '../../lib/stringify'
import { AbsoluteLengthUnits, CSSUnitValue, Length } from '../../types/css'
import { SelectInput } from '../inputs/SelectInput'
import { Number } from '../primitives'
import { Label } from './Label'
import { UnitSelect } from './UnitSelect'
import { ValueSelect } from './ValueSelect'

interface CalcInputProps {
  units: readonly string[]
  onChange: (newValue: CSSUnitValue) => void // type this correctly with generics
  value: CSSUnitValue
  label: string | undefined
}

type CalcFunction = {
  operand: string
  valueX: CSSUnitValue
  valueY: CSSUnitValue
}

const stringifyCalcValue = ({ operand, valueX, valueY }: CalcFunction) => {
  const x = stringifyUnit(valueX)
  const y = stringifyUnit(valueY)
  return `calc(${x} ${operand} ${y})`
}

export const CalcInput = ({
  units,
  onChange,
  value,
  label,
  ...props
}: CalcInputProps) => { 
  const [calcOperation, setCalcOperation] = useState<CalcFunction>({
    operand: '+',
    valueX: value,
    valueY: { value: 1, unit: AbsoluteLengthUnits.Px }
  })
  const handleCalcChange = (newCalcValue: CalcFunction) => {
    setCalcOperation(newCalcValue)

    const stringified = stringifyCalcValue(newCalcValue)
    onChange({ value: stringified, unit: 'calc' })
  }

  return (
    <div sx={{ alignItems: 'baseline' }}>
      <Label>
        {`${label || 'value'}: ${stringifyCalcValue(calcOperation)}`}
      </Label>
      <ValueInput
        
        value={calcOperation.valueX}
        onChange={(newValue: CSSUnitValue) => 
          handleCalcChange({ ...calcOperation, valueX: newValue})}
        units={[...units, 'number']}
        {...props}
      />
      <SelectInput
        options={['+', '-', '/', '*']}
        label=''
        onChange={(newValue: string) => {
          switch (newValue) {
            case '/':
            case '*':
              handleCalcChange({ 
                ...calcOperation,
                operand: newValue,
                valueY: { ...calcOperation.valueY, unit: 'number' }
              })
              break
            default:
              handleCalcChange({ ...calcOperation, operand: newValue })
          }
        }}
        value={calcOperation.operand}
      />
      <ValueInput
        value={calcOperation.valueY}
        onChange={(newValue: CSSUnitValue) => 
          handleCalcChange({ ...calcOperation, valueY: newValue})}
        units={[...units, 'number']}
      />
    </div>
  )
}

const ValueInput = ({ value, onChange, units, ...props }: any) => {
  return (
    <div sx={{ display: 'flex', flexDirection: 'row' }}>
      <Number
        value={value.value}
        {...props}
        onChange={(newValue: number) => 
          onChange({ ...value, value: newValue })}
      />
      <UnitSelect 
        units={units}
        value={value.unit}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          // why does number return a object ?
          const out = typeof(e) === 'object' ? e.target.value : e
          onChange({ ...value, unit: out})
        }}
      />
    </div>
  )
}