import { kebabCase, uniq } from 'lodash-es'
import { useId } from 'react'
import { UnitRanges } from '../../data/ranges'
import { convertUnits, UnitConversions, UnitSteps } from '../../lib'
import { stringifyUnit } from '../../lib/stringify'
import {
  AbsoluteLengthUnits,
  CalcOperand,
  CSSFunctionCalc,
  CSSUnitValue,
  ThemeUnits,
  UnitlessUnits,
} from '../../types/css'
import { EditorProps } from '../../types/editor'
import { SelectInput } from '../inputs/SelectInput'
import { Number } from '../primitives'
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

export const CalcInput = ({
  units,
  onChange,
  value,
  range,
  steps,
  conversions,
  themeValues,
}: CalcInputProps) => {
  const allUnits = uniq([...units, UnitlessUnits.Number])

  return (
    <div sx={{ width: '100%' }}>
      <NumberUnitInput
        value={value.arguments.valueX}
        onChange={(newValue: CSSUnitValue) => {
          onChange({
            ...value,
            arguments: {
              ...value.arguments,
              valueX: newValue,
            },
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
          CalcOperand.Plus,
          CalcOperand.Sub,
          CalcOperand.Div,
          CalcOperand.Mult,
        ]}
        label=""
        onChange={(newValue: CalcOperand) => {
          const y = value.arguments.valueY

          if (newValue === CalcOperand.Div || newValue === CalcOperand.Mult) {
            return onChange({
              ...value,
              arguments: {
                ...value.arguments,
                operand: newValue,
                valueY: {
                  ...value.arguments.valueY,
                  unit: UnitlessUnits.Number,
                },
              },
            })
          }

          if (
            y.unit === UnitlessUnits.Number &&
            (newValue === CalcOperand.Plus || newValue === CalcOperand.Sub)
          ) {
            return onChange({
              ...value,
              arguments: {
                ...value.arguments,
                operand: newValue,
                valueY: { value: 16, unit: AbsoluteLengthUnits.Px },
              },
            })
          }

          onChange({
            ...value,
            arguments: {
              ...value.arguments,
              operand: newValue,
            },
          })
        }}
        value={value.arguments.operand}
      />
      <NumberUnitInput
        value={value.arguments.valueY}
        onChange={(newValue: CSSUnitValue) => {
          onChange({
            ...value,
            arguments: {
              ...value.arguments,
              valueY: newValue,
            },
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

interface NumberUnitInput extends EditorProps<CSSUnitValue> {
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
  label,
}: NumberUnitInput) => {
  const id = `${useId()}-${kebabCase(label)}`
  const validUnits = units.filter((u) => u !== UnitlessUnits.Calc)

  return (
    <div sx={{ display: 'flex', flexDirection: 'row', my: 1 }}>
      {value.unit === ThemeUnits.Theme ? (
        <ValueSelect
          onChange={(e: any) => {
            const themeValue = themeValues?.find((p) => p.id === e.target.value)
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
            onChange({ ...value, value: newValue })
          }
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
          const newValue =
            newUnit === ThemeUnits.Theme && themeValues
              ? stringifyUnit(themeValues?.[0])
              : convertedValue

          //@ts-ignore
          onChange({ value: newValue, unit: newUnit })
        }}
      />
    </div>
  )
}
