import { isEqual, range } from 'lodash-es'
import { Keyword, CubicBezier, Steps, EasingFunction } from './types'

export function EasingFunctionGraph({ value }: { value: EasingFunction }) {
  switch (value.type) {
    case 'cubic-bezier':
      return <CubicBezierGraph value={value} />
    case 'steps':
      return <StepsGraph value={value} />
  }
}

export function CubicBezierGraph({ value }: { value: CubicBezier }) {
  const { p1 = 0, p2 = 0, p3 = 1, p4 = 1 } = value
  return (
    <path
      d={`M 0 1 C ${p1} ${1 - p2}, ${p3} ${1 - p4}, 1 0`}
      sx={{ stroke: 'text', fill: 'none', strokeWidth: '0.01' }}
    />
  )
}

export function StepsGraph({ value }: { value: Steps }) {
  const { jumpTerm = 'jump-start', stops = 1 } = value
  switch (jumpTerm) {
    case 'jump-start':
      return (
        <>
          {range(stops).map((i) => {
            const y = 1 - (i + 1) / stops
            return (
              <line
                key={i}
                x1={i / stops}
                x2={(i + 1) / stops}
                y1={y}
                y2={y}
                sx={{ stroke: 'text', strokeWidth: 0.01 }}
              />
            )
          })}
          {range(stops + 1).map((i) => {
            return (
              <circle
                key={i}
                cx={i / stops}
                cy={1 - i / stops}
                r={0.02}
                sx={{ stroke: 'none', fill: 'text' }}
              />
            )
          })}
        </>
      )
    case 'jump-end':
      return (
        <>
          {range(stops).map((i) => {
            const y = 1 - i / stops
            return (
              <line
                key={i}
                x1={i / stops}
                x2={(i + 1) / stops}
                y1={y}
                y2={y}
                sx={{ stroke: 'text', strokeWidth: 0.01 }}
              />
            )
          })}
          {range(stops + 1).map((i) => {
            return (
              <circle
                key={i}
                cx={i / stops}
                cy={1 - i / stops}
                r={0.02}
                sx={{ stroke: 'none', fill: 'text' }}
              />
            )
          })}
        </>
      )
    case 'jump-none':
      return (
        <>
          {range(stops).map((i) => {
            const y = 1 - i / (stops - 1)
            return (
              <g key={i}>
                <line
                  x1={i / stops}
                  x2={(i + 1) / stops}
                  y1={y}
                  y2={y}
                  sx={{ stroke: 'text', strokeWidth: 0.01 }}
                />
                <circle
                  cx={i / stops}
                  cy={y}
                  r={0.02}
                  sx={{ stroke: 'none', fill: 'text' }}
                />
              </g>
            )
          })}
          <circle
            cx={1}
            cy={1 - 1}
            r={0.02}
            sx={{ stroke: 'none', fill: 'text' }}
          />
        </>
      )
    case 'jump-both':
      return (
        <>
          <circle
            cx={0}
            cy={1 - 0}
            r={0.02}
            sx={{ stroke: 'none', fill: 'text' }}
          />
          {range(stops).map((i) => {
            const y = 1 - (i + 1) / (stops + 1)
            return (
              <g key={i}>
                <line
                  x1={i / stops}
                  x2={(i + 1) / stops}
                  y1={y}
                  y2={y}
                  sx={{ stroke: 'text', strokeWidth: 0.01 }}
                />
                <circle
                  cx={i / stops}
                  cy={y}
                  r={0.02}
                  sx={{ stroke: 'none', fill: 'text' }}
                />
              </g>
            )
          })}
          <circle
            cx={1}
            cy={1 - 1}
            r={0.02}
            sx={{ stroke: 'none', fill: 'text' }}
          />
        </>
      )
  }
}
