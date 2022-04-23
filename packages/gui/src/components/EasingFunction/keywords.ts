import { isEqual } from 'lodash-es'
import { Keyword, EasingFunction } from './types'

export const keywordValues: Record<Keyword, EasingFunction> = {
  linear: { type: 'cubic-bezier', p1: 0.0, p2: 0.0, p3: 1.0, p4: 1.0 },
  ease: { type: 'cubic-bezier', p1: 0.25, p2: 0.1, p3: 0.25, p4: 1 },
  'ease-in': { type: 'cubic-bezier', p1: 0.42, p2: 0.0, p3: 1.0, p4: 1.0 },
  'ease-in-out': { type: 'cubic-bezier', p1: 0.42, p2: 0.0, p3: 0.58, p4: 1.0 },
  'ease-out': { type: 'cubic-bezier', p1: 0.0, p2: 0.0, p3: 0.58, p4: 1.0 },
  'step-start': { type: 'steps', stops: 1, jumpTerm: 'jump-start' },
  'step-end': { type: 'steps', stops: 1, jumpTerm: 'jump-end' },
}

export function getKeywordValue(keyword: Keyword) {
  return keywordValues[keyword]
}

export function getKeywordFromValue(value: EasingFunction) {
  for (const [keyword, keywordVal] of Object.entries(keywordValues)) {
    if (isEqual(value, keywordVal)) {
      return keyword
    }
  }
}
