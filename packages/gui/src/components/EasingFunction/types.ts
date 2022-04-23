export type EasingFunction = CubicBezier | Steps

export type EasingType = 'cubic-bezier' | 'steps'

// TODO support standalone keywords
export interface CubicBezier {
  type: 'cubic-bezier'
  p1: number
  p2: number
  p3: number
  p4: number
}

export type CubicBezierKeyword =
  | 'ease'
  | 'linear'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'

export interface Steps {
  type: 'steps'
  stops: number
  jumpTerm: JumpTerm
}

export type StepsKeyword = 'step-start' | 'step-end'

export type Keyword = CubicBezierKeyword | StepsKeyword

export type JumpTerm = 'jump-start' | 'jump-end' | 'jump-none' | 'jump-both'
