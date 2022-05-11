import { Length, LengthPercentage, Position } from '../../../types/css'

export type BasicShape = Inset | Circle | Ellipse | Polygon | Path

export interface Inset {
  type: 'inset'
  top: LengthPercentage
  left: LengthPercentage
  bottom: LengthPercentage
  right: LengthPercentage
  // TODO full border radius syntax
  borderRadius: LengthPercentage
}

export interface Circle {
  type: 'circle'
  radius: LengthPercentage // keywords: closest-side, farthest-side
  position: Position
}

export interface Ellipse {
  type: 'ellipse'
  rx: LengthPercentage
  ry: LengthPercentage
  position: Position
}

export interface Polygon {
  type: 'polygon'
  fillRule: FillRule
  points: Point[]
}

export interface Path {
  type: 'path'
  fillRule: FillRule
  path: string // TODO svg path editor
}

type FillRule = 'nonzero' | 'evenodd'
export type Point = [x: LengthPercentage, y: LengthPercentage]
