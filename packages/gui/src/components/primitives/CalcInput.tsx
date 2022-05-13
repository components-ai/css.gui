import { kebabCase, uniq } from 'lodash-es'
import { useEffect, useState, useId } from 'react'
import { UnitRanges } from '../../data/ranges'
import { convertUnits, UnitConversions, UnitSteps } from '../../lib'
import { stringifyUnit, } from '../../lib/stringify'
import { AbsoluteLengthUnits, CSSUnitValue, ThemeUnits, UnitlessUnits } from '../../types/css'
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
  themeValues?: (CSSUnitValue & { id: string })[]
}

type CalcFunction = {
  operand: string
  valueX: CSSUnitValue
  valueY: CSSUnitValue
}

export const CalcInput = ({
  units,
  onChange,
  value,
  label,
  range,
  steps,
  conversions,
  themeValues,
}: CalcInputProps) => { 
  const [calcOperation, setCalcOperation] = useState<CalcFunction>({
    operand: '+',
    valueX: value,
    valueY: { value: 0, unit: AbsoluteLengthUnits.Px }
  })
  const allUnits = uniq([...units, UnitlessUnits.Number])

  useEffect(() => {
    onChange({ value: stringifyCalcValue(calcOperation), unit: UnitlessUnits.Calc })
  }, [])

  const handleCalcChange = (newCalcValue: CalcFunction) => {
    setCalcOperation(newCalcValue)
    const stringified = stringifyCalcValue(newCalcValue)
    onChange({ value: stringified, unit: UnitlessUnits.Calc })
  }

  return (
    <div sx={{ width: '100%' }}>
      <Label sx={{ display: 'block' }}>
        {`${label || 'value'}: ${stringifyCalcValue(calcOperation)}`}
      </Label>
      <NumberUnitInput
        value={calcOperation.valueX}
        onChange={(newValue: CSSUnitValue) => 
          handleCalcChange({ ...calcOperation, valueX: newValue})}
        units={allUnits}
        steps={steps}
        range={range}
        conversions={conversions}
        themeValues={themeValues}
      />
      <SelectInput
        options={['+', '-', '/', '*']}
        label=''
        onChange={(newValue: string) => {
          const y = calcOperation.valueY

          if (newValue === '/' || newValue === '*') {
            handleCalcChange({ 
              ...calcOperation,
              operand: newValue,
              valueY: { ...y, unit: UnitlessUnits.Number }
            })
            return
          } 
          
          if ((newValue === '+' || newValue === '-') && y.unit === UnitlessUnits.Number) {
            handleCalcChange({
              ...calcOperation,
              operand: newValue,
              valueY: { ...y, unit: AbsoluteLengthUnits.Px }
            })
            return
          }
          
          handleCalcChange({ ...calcOperation, operand: newValue })
        }}
        value={calcOperation.operand}
      />
      <NumberUnitInput
        value={calcOperation.valueY}
        onChange={(newValue: CSSUnitValue) => 
          handleCalcChange({ ...calcOperation, valueY: newValue})}
        units={allUnits}
        steps={steps}
        range={range}
        conversions={conversions}
        themeValues={themeValues}
      />
    </div>
  )
}

interface NumberUnitInput extends EditorProps<CSSUnitValue>{
  units: readonly string[]
  steps?: UnitSteps
  range?: UnitRanges
  conversions?: UnitConversions
  themeValues?: (CSSUnitValue & { id: string })[]
}

const NumberUnitInput = ({
  value,
  onChange,
  units,
  steps,
  range,
  conversions,
  themeValues,
  label
}: NumberUnitInput) => {
  const id = `${useId()}-${kebabCase(label)}`
  const validUnits = units.filter(u => u !== UnitlessUnits.Calc)

  return (
    <div sx={{ display: 'flex', flexDirection: 'row', my: 1 }}>
      {value.unit === ThemeUnits.Theme ? (
        <ValueSelect
          onChange={(e: any) => {
            const themeValue = themeValues?.find(
              (p) => p.id === e.target.value
            )
            const newValue = themeValue && stringifyUnit(themeValue)
            onChange({ ...value, value: newValue ?? `16px` })
          }}
          values={themeValues ?? []}
        />
      ) : (
        <Number
          id={id}
          step={steps?.[value.unit]}
          min={range?.[value.unit]?.[0]}
          max={range?.[value.unit]?.[1]}
          value={value.value}
          onChange={(newValue: number) => 
            onChange({ ...value, value: newValue })}
        />
      )}
      <UnitSelect 
        sx={{ ml: 1 }}
        units={validUnits}
        value={value.unit}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const newUnit = e.target.value
          const convertedValue = convertUnits(
            newUnit,
            value,
            conversions,
            steps
          )
          // Stringify full theme values so calc works correctly
          const newValue = newUnit === ThemeUnits.Theme && themeValues
            ? stringifyUnit(themeValues?.[0])
            : convertedValue

          //@ts-ignore
          onChange({ value: newValue, unit: newUnit })
        }}
      />
    </div>
  )
}

const stringifyCalcValue = ({ operand, valueX, valueY }: CalcFunction) => {
  const x = stringifyUnit(valueX)
  const y = stringifyUnit(valueY)
  return `calc(${x} ${operand} ${y})`
}
