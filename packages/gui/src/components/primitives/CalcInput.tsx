import { kebabCase, uniq } from 'lodash-es'
import { useEffect, useState, useId } from 'react'
import { UnitRanges } from '../../data/ranges'
import { convertUnits, UnitConversions, UnitSteps } from '../../lib'
import { stringifyUnit, } from '../../lib/stringify'
import { AbsoluteLengthUnits, CalcOperand, CSSFunctionCalc, CSSUnitValue, ThemeUnits, UnitlessUnits } from '../../types/css'
import { EditorProps } from '../../types/editor'
import { SelectInput } from '../inputs/SelectInput'
import { Number } from '../primitives'
import { Label } from './Label'
import { UnitSelect } from './UnitSelect'
import { ValueSelect } from './ValueSelect'

interface CalcInputProps extends EditorProps<CSSFunctionCalc> {
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
  const [functionCalc, setFunctionCalc] = useState<CSSFunctionCalc>(value)
  const allUnits = uniq([...units, UnitlessUnits.Number])

  // useEffect(() => {
  //   onChange({ type: 'calc',  })
  // }, [])

  const handleCalcChange = (newFunctionCalc: CSSFunctionCalc) => {
    setFunctionCalc(functionCalc)
    onChange(newFunctionCalc)
  }

  return (
    <div sx={{ width: '100%' }}>
      <Label sx={{ display: 'block' }}>
        {/* {`${label || 'value'}: ${stringifyCalcValue(calcOperation)}`} */}
      </Label>
      <NumberUnitInput
        value={functionCalc.arguments.valueX}
        onChange={(newValue: CSSUnitValue) => {
          handleCalcChange({
            ...functionCalc, 
            arguments: {
              ...functionCalc.arguments,
              valueX: newValue
            }
          })
        }}
        units={allUnits}
        steps={steps}
        range={range}
        conversions={conversions}
        themeValues={themeValues}
      />
      <SelectInput
        options={[
          CalcOperand.Div,
          CalcOperand.Plus,
          CalcOperand.Mult,
          CalcOperand.Sub
        ]}
        label=''
        onChange={(newValue: CalcOperand) => {
          const y = functionCalc.arguments.valueY

          if (newValue === '/' || newValue === '*') {
            handleCalcChange({ 
              ...functionCalc,
              arguments: {
                ...functionCalc.arguments,
                operand: newValue,
                valueY: { ...functionCalc.arguments.valueY, unit: UnitlessUnits.Number }
              }
            })
            return
          } 
          
          if ((newValue === CalcOperand.Plus || newValue === CalcOperand.Sub) && y.unit === UnitlessUnits.Number) {
            handleCalcChange({
              ...functionCalc,
              arguments: {
                ...functionCalc.arguments,
                operand: newValue,
                valueY: { value: 16, unit: AbsoluteLengthUnits.Px }
              }
            })
            return
          }
          
          handleCalcChange({ 
            ...functionCalc,
            arguments: {
              ...functionCalc.arguments,
              operand: newValue,
            }
          })
        }}
        value={functionCalc.arguments.operand}
      />
      <NumberUnitInput
        value={functionCalc.arguments.valueY}
        onChange={(newValue: CSSUnitValue) => {
          handleCalcChange({
            ...functionCalc, 
            arguments: {
              ...functionCalc.arguments,
              valueY: newValue
            }
          })
        }}
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
