import { ComponentType, useState } from 'react'
import { UnitRanges } from '../../data/ranges'
import { convertUnits, UnitConversions, UnitSteps } from '../../lib'
import { stringifyUnit } from '../../lib/stringify'
import { AbsoluteLengthUnits, CSSUnitValue, Length } from '../../types/css'
import { EditorProps } from '../../types/editor'
import { SelectInput } from '../inputs/SelectInput'
import { Number } from '../primitives'
import { Label } from './Label'
import { UnitSelect } from './UnitSelect'
import { ValueSelect } from './ValueSelect'

interface CalcInputProps extends EditorProps<CSSUnitValue> {
  label?: string
  range?: UnitRanges
  steps?: UnitSteps
  units: readonly string[]
  conversions?: UnitConversions
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
  range,
  conversions,
  steps,
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
      <NumberUnitInput
        value={calcOperation.valueX}
        onChange={(newValue: CSSUnitValue) => 
          handleCalcChange({ ...calcOperation, valueX: newValue})}
        units={[...units, 'number']} // create a set to make uniq options
        steps={steps}
        range={range}
        conversions={conversions}
      />
      <SelectInput
        options={['+', '-', '/', '*']}
        label=''
        onChange={(newValue: string) => {
          if (newValue === '/' || newValue === '*') {
            handleCalcChange({ 
              ...calcOperation,
              operand: newValue,
              valueY: { ...calcOperation.valueY, unit: 'number' }
            })
          } else {
            handleCalcChange({ ...calcOperation, operand: newValue })
          }
        }}
        value={calcOperation.operand}
      />
      <NumberUnitInput
        value={calcOperation.valueY}
        onChange={(newValue: CSSUnitValue) => 
          handleCalcChange({ ...calcOperation, valueY: newValue})}
        units={[...units, 'number']}
        steps={steps}
        range={range}
        conversions={conversions}
      />
    </div>
  )
}

interface NumberUnitInput {
  value: CSSUnitValue
  onChange: (newValue: CSSUnitValue) => void
  units: readonly string[]
  steps?: UnitSteps
  range?: UnitRanges
  conversions?: UnitConversions
}

const NumberUnitInput = ({
  value,
  onChange,
  units,
  steps,
  range,
  conversions
}: NumberUnitInput) => {
  return (
    <div sx={{ display: 'flex', flexDirection: 'row' }}>
      <Number
        // id={id}
        // key={key}
        step={steps?.[value.unit]}
        min={range?.[value.unit]?.[0]}
        max={range?.[value.unit]?.[1]}
        value={value.value}
        onChange={(newValue: number) => 
          onChange({ ...value, value: newValue })}
      />
      {/* calc shouldnt be an option here */}
      <UnitSelect 
        units={units}
        value={value.unit}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const newUnit = e.target.value
          const newValue = convertUnits(
            newUnit,
            value,
            conversions,
            steps
          )
          onChange({ value: newValue, unit: newUnit })
        }}
      />
    </div>
  )
}