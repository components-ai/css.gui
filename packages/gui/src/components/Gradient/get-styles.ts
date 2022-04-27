import { sortBy } from 'lodash-es'
import { squeeze } from '../../lib/util'
import {
  Gradient,
  LinearGradient,
  ConicGradient,
  RadialGradient,
  GradientList,
} from './types'

export const getLinearGradient = (gradient: LinearGradient) => {
  return `linear-gradient(${gradient.degrees}deg, ${getStops(gradient, '%')})`
}

export const getRepeatingLinearGradient = (gradient: LinearGradient) => {
  return `repeating-linear-gradient(${gradient.degrees}deg, ${getStops(
    gradient,
    '%'
  )})`
}

export const getConicGradient = (gradient: ConicGradient) => {
  return `conic-gradient(from ${gradient.degrees}deg at ${getLocation(
    gradient
  )}, ${getStops(gradient, '%')})`
}

export const getRepeatingConicGradient = (gradient: ConicGradient) => {
  return `repeating-conic-gradient(from ${gradient.degrees}deg at ${getLocation(
    gradient
  )}, ${getStops(gradient, '%')})`
}

export const getRadialGradient = (gradient: RadialGradient) => {
  return `radial-gradient(${gradient.shape ?? 'circle'} at ${getLocation(
    gradient
  )}, ${getStops(gradient, '%')})`
}

export const getRepeatingRadialGradient = (gradient: RadialGradient) => {
  return `repeating-radial-gradient(${
    gradient.shape ?? 'circle'
  } at ${getLocation(gradient)}, ${getStops(gradient, '%')})`
}

export function getDeclarationValue(gradient: Gradient | Gradient[]): string {
  if (Array.isArray(gradient)) {
    return gradient.filter(Boolean).map(getDeclarationValue).join(', ')
  }
  if (gradient.type === 'linear') {
    return getLinearGradient(gradient)
  }
  if (gradient.type === 'radial') {
    return getRadialGradient(gradient)
  }
  if (gradient.type === 'conic') {
    return getConicGradient(gradient)
  }
  if (gradient.type === 'repeating-linear') {
    return getRepeatingLinearGradient(gradient)
  }
  if (gradient.type === 'repeating-radial') {
    return getRepeatingRadialGradient(gradient)
  }
  if (gradient.type === 'repeating-conic') {
    return getRepeatingConicGradient(gradient)
  }
  throw new Error('Unknown gradient type')
}

// TODO: This probably fits better in a typography package at some point
export const getClipTextStyles = () => {
  return {
    WebkitTextFillColor: 'transparent',
    WebkitBackgroundClip: 'text',
  }
}

export const getStyles = (gradient: GradientList, metadata: any = {}) => {
  const value = squeeze(getDeclarationValue(gradient))
  const { relatedStyles, elementStyles } =
    (gradient as any).metadata || metadata

  let clipStyles = {}

  if (
    elementStyles &&
    elementStyles.clipText &&
    elementStyles.clipText === true
  ) {
    clipStyles = getClipTextStyles()
  }

  return {
    ...relatedStyles,
    ...clipStyles,
    backgroundImage: value,
  }
}

const getStops = (gradient: Gradient, unit: string) => {
  return sortBy(gradient?.stops, (stop) => stop.hinting)
    ?.filter(Boolean)
    ?.map(({ color, hinting }) => `${color} ${hinting}${unit}`)
    ?.join(', ')
}

const getLocation = (gradient: ConicGradient | RadialGradient) => {
  const { locationX = 50, locationY = 50 } = gradient
  return `${locationX}% ${locationY}%`
}