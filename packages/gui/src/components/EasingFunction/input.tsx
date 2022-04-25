import { clamp } from 'lodash-es'
import { useRef, useCallback, useId } from 'react'
import { useSvgDrag } from '../useSvgDrag'
import { CubicBezier, EasingFunction, JumpTerm, Keyword, Steps } from './types'
import { CubicBezierGraph, StepsGraph, EasingFunctionGraph } from './graphs'
import { Number } from '../primitives/Number'
import { getKeywordValue } from './keywords'
import * as Tabs from '@radix-ui/react-tabs'
import { EditorProps } from '../editors/types'
import { SelectInput } from '../SelectInput'

type Props = EditorProps<EasingFunction>

const DEFAULT = {
  type: 'cubic-bezier',
  p1: 0,
  p2: 0,
  p3: 1,
  p4: 1,
} as const

const DEFAULT_STEPS = {
  type: 'steps',
  stops: 1,
  jumpTerm: 'jump-start',
} as const

export default function EasingFunctionField({
  value = DEFAULT,
  onChange,
}: Props) {
  return (
    <Tabs.Root
      value={value.type}
      onValueChange={(type: any) => onChange({ ...value, type })}
    >
      <Tabs.List
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,

          '> button': {
            background: 'none',
            color: 'text',
            border: 'none',
          },
          '> button[aria-selected="true"]': {
            fontWeight: 'bold',
          },
        }}
      >
        <Tabs.Trigger value="cubic-bezier">cubic bezier</Tabs.Trigger>
        <Tabs.Trigger value="steps">steps</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="cubic-bezier">
        <CubicBezierEditor value={value as any} onChange={onChange} />
      </Tabs.Content>
      <Tabs.Content value="steps">
        <StepsEditor value={value as any} onChange={onChange} />
      </Tabs.Content>
    </Tabs.Root>
  )
}

function CubicBezierEditor({
  value = DEFAULT,
  onChange,
}: EditorProps<CubicBezier>) {
  const { p1 = 0, p2 = 0, p3 = 1, p4 = 1 } = value
  const svg = useRef<SVGSVGElement>(null)
  // Use a callback for the CTM so we always get the current version
  // even if the ref is initially unpopulated
  const ctm = useCallback(() => svg.current?.getScreenCTM() ?? undefined, [])
  return (
    <div>
      <svg
        ref={svg}
        viewBox="0 0 1 1"
        sx={{
          width: '100%',
          aspectRatio: '1 / 1',
          my: 3,
          overflow: 'visible',
          border: '1px solid',
          borderColor: 'border',
          // Make sure z-index
          position: 'relative',
          zIndex: 9999,
        }}
      >
        <CubicBezierGraph value={value} />
        <line
          x1="0"
          y1="1"
          x2={p1}
          y2={1 - p2}
          sx={{ stroke: 'text', strokeWidth: '0.005' }}
        />
        <line
          x1="1"
          y1="0"
          x2={p3}
          y2={1 - p4}
          sx={{ stroke: 'text', strokeWidth: '0.005' }}
        />
        <ControlPoint
          ctm={ctm}
          x={p1}
          y={1 - p2}
          onChange={({ x, y }) => {
            const p1 = +clamp(x, 0, 1).toFixed(3)
            const p2 = +(1 - y).toFixed(3)
            onChange({ ...value, p1, p2 })
          }}
        />
        <ControlPoint
          ctm={ctm}
          x={p3}
          y={1 - p4}
          onChange={({ x, y }) => {
            const p3 = +clamp(x, 0, 1).toFixed(3)
            const p4 = +(1 - y).toFixed(3)
            onChange({ ...value, p3, p4 })
          }}
        />
      </svg>
      <div sx={{ display: 'flex', gap: 3 }}>
        <NumberField
          label="p1"
          value={value.p1}
          onChange={(p1) => onChange({ ...value, p1 })}
          min={0}
          max={1}
          step={0.001}
        />
        <NumberField
          label="p2"
          value={value.p2}
          onChange={(p2) => onChange({ ...value, p2 })}
          min={-1}
          max={2}
          step={0.001}
        />
        <NumberField
          label="p3"
          value={value.p3}
          onChange={(p3) => onChange({ ...value, p3 })}
          min={0}
          max={1}
          step={0.001}
        />
        <NumberField
          label="p4"
          value={value.p4}
          onChange={(p4) => onChange({ ...value, p4 })}
          min={-1}
          max={2}
          step={0.001}
        />
      </div>
      <Presets
        keywords={cubicBezierKeywords}
        onChange={(keyword) => {
          onChange(getKeywordValue(keyword) as any)
        }}
      />
    </div>
  )
}

interface ControlPointProps {
  ctm: () => DOMMatrix | undefined
  x: number
  y: number
  onChange(newPoint: { x: number; y: number }): void
}

function ControlPoint({ x, y, ctm, onChange }: ControlPointProps) {
  const dragHandlers = useSvgDrag(ctm, onChange)
  return (
    <circle
      r={0.025}
      cx={x}
      cy={y}
      sx={{ fill: 'white', cursor: 'grab' }}
      {...dragHandlers}
    />
  )
}

function StepsEditor({ value = DEFAULT_STEPS, onChange }: EditorProps<Steps>) {
  return (
    <div>
      <svg
        viewBox="0 0 1 1"
        sx={{
          width: '100%',
          aspectRatio: '1 / 1',
          my: 3,
          overflow: 'visible',
          border: '1px solid',
          borderColor: 'border',
        }}
      >
        <StepsGraph value={value} />
      </svg>
      <NumberField
        label="Stops"
        value={value.stops}
        onChange={(stops) => onChange({ ...value, stops })}
        min={0}
        max={20}
      />
      <SelectInput
        label="Jump term"
        value={value.jumpTerm}
        onChange={(jumpTerm) => onChange({ ...value, jumpTerm })}
        options={['jump-start', 'jump-end', 'jump-both', 'jump-none']}
      />
      <Presets
        keywords={stepsKeywords}
        onChange={(keyword) => {
          onChange(getKeywordValue(keyword) as any)
        }}
      />
    </div>
  )
}

const cubicBezierKeywords = [
  'linear',
  'ease',
  'ease-in',
  'ease-out',
  'ease-in-out',
] as const

const stepsKeywords = ['step-start', 'step-end'] as const

interface PresetsProps {
  keywords: readonly Keyword[]
  onChange(keyword: Keyword): void
}

function Presets({ keywords, onChange }: PresetsProps) {
  return (
    <div sx={{ my: 3 }}>
      <div sx={{ fontSize: 1 }}>Presets</div>
      <div sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 1 }}>
        {keywords.map((keyword) => (
          <button
            title={keyword}
            sx={{
              transition: 'border-color 250ms ease-in-out',
              cursor: 'pointer',
              background: 'none',
              border: '2px solid',
              borderColor: 'border',
              p: 0,
              m: 0,
              ':hover': {
                borderColor: 'text',
              },
            }}
            key={keyword}
            onClick={() => {
              onChange(keyword)
            }}
          >
            <svg width="4rem" height="4rem" viewBox="0 0 1 1">
              <EasingFunctionGraph value={getKeywordValue(keyword)} />
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}

interface NumberProps extends EditorProps<number> {
  label: string
  min?: number
  max?: number
  step?: number
}

function NumberField({ label, value, ...props }: NumberProps) {
  const id = useId()
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <Number id={id} value={value} {...props} />
    </>
  )
}
