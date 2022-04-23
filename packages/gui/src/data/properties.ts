import { lowerCase, upperFirst } from 'lodash-es'
import {
  AbsoluteLengthUnits,
  FontRelativeLengthUnits,
  PercentageLengthUnits,
} from '../types/css'

type PropertyData = {
  type: string
  percentage?: boolean
  number?: boolean
  keywords?: Array<string>
  range?: UnitRanges
  defaultValue?: string
}

type UnitRanges = Record<string, [number, number]>

export const getPropertyData = (property?: string): PropertyData | null => {
  const propertyData = properties[property || '']
  return propertyData ?? null
}

export const getPropertyLabel = (property: string) => {
  return upperFirst(lowerCase(property))
}

export const properties: Record<string, PropertyData> = {
  appearance: {
    type: 'keyword',
    keywords: [
      'none',
      'auto',
      'menulist-button',
      'textfield',
      'button',
      'searchfield',
      'textarea',
      'push-button',
      'slider-horizontal',
      'checkbox',
      'radio',
      'square-button',
      'menulist',
      'listbox',
      'meter',
      'progress-bar',
    ],
  },
  backfaceVisibility: {
    type: 'keyword',
    keywords: ['visible', 'hidden'],
  },
  backgroundBlendMode: {
    type: 'keyword',
    keywords: [
      'normal',
      'multiply',
      'screen',
      'overlay',
      'darken',
      'lighten',
      'color-dodge',
      'color-burn',
      'hard-light',
      'soft-light',
      'difference',
      'exclusion',
      'hue',
      'saturation',
      'color',
      'luminosity',
    ],
  },
  backgroundColor: {
    type: 'color',
    defaultValue: '#fff',
    keywords: ['currentcolor', 'transparent'],
  },
  backgroundClip: {
    type: 'keyword',
    keywords: [
      'border-box',
      'padding-box',
      'content-box',
      'text',
    ],
  },
  backgroundOrigin: {
    type: 'keyword',
    keywords: [
      'border-box',
      'padding-box',
      'content-box',
    ],
  },
  borderColor: {
    type: 'color',
    keywords: ['currentcolor', 'transparent'],
  },
  borderWidth: {
    type: 'length',
    keywords: ['thin', 'medium', 'thick'],
  },
  boxSizing: {
    type: 'keyword',
    keywords: [
      'border-box',
      'content-box',
    ],
  },
  breakAfter: {
    type: 'keyword',
    keywords: [
      'auto',
      'avoid',
      'always',
      'all',
      'avoid-page',
      'page',
      'left',
      'right',
      'recto',
      'verso',
      'avoid-column',
      'column',
      'avoid-region',
      'region',
    ],
  },
  breakBefore: {
    type: 'keyword',
    keywords: [
      'auto',
      'avoid',
      'always',
      'all',
      'avoid-page',
      'page',
      'left',
      'right',
      'recto',
      'verso',
      'avoid-column',
      'column',
      'avoid-region',
      'region',
    ],
  },
  breakInside: {
    type: 'keyword',
    keywords: [
      'auto',
      'avoid',
      'avoid-page',
      'avoid-column',
      'avoid-region',
    ],
  },
  captionSide: {
    type: 'keyword',
    keywords: [
      'top', 
      'bottom', 
      'block-start', 
      'block-end', 
      'inline-start', 
      'inline-end', 
    ]
  },
  caretColor: {
    type: 'color',
    keywords: ['currentcolor', 'transparent'],
  },
  clear: {
    type: 'keyword',
    keywords: [
      'none',
      'left',
      'right',
      'both',
      'inline-start',
      'inline-end',
    ],
  },
  color: {
    type: 'color',
    keywords: ['currentcolor', 'transparent'],
  },
  columnFill: {
    type: 'keyword',
    keywords: [
      'auto',
      'balance',
      'balance-all',
    ],
  },
  columnRuleStyle: {
    type: 'keyword',
    keywords: [
      'none',
      'hidden',
      'dotted',
      'dashed',
      'solid',
      'double',
      'groove',
      'ridge',
      'inset',
      'outset',
    ],
  },
  columnSpan: {
    type: 'keyword',
    keywords: [
      'none',
      'all',
    ],
  },
  contain: {
    type: 'keyword',
    keywords: [
      'none',
      'strict',
      'content',
      'size',
      'layout',
      'style',
      'paint',
      'size paint',
      'size layout paint',
      'size layout paint style',
      'size layout paint style content',
    ],
  },
  contentVisibility: {
    type: 'keyword',
    keywords: [
      'visible',
      'hidden',
      'auto',
    ],
  },
  direction: {
    type: 'keyword',
    keywords: [
      'ltr',
      'rtl',
    ],
  },
  
  display: {
    type: 'keyword',
    keywords: [
      'block',
      'inline',
      'inline-block',
      'flex',
      'inline-flex',
      'grid',
      'inline-grid',
      'flow-root',
      'none',
      'table',
      'table-row',
      'list-item',
      'block flow',
      'inline flow',
      'inline flow-root',
      'block flex',
      'inline flex',
      'block grid',
      'inline grid',
      'block flow-root',
    ],
  },
  alignContent: {
    type: 'keyword',
    keywords: [
      'center',
      'start',
      'end',
      'flex-start',
      'flex-end',
      'normal',
      'baseline',
      'first baseline',
      'last baseline',
      'space-between',
      'space-around',
      'space-evenly',
      'stretch',
      'safe center',
      'unsafe center',
    ],
  },
  alignItems: {
    type: 'keyword',
    keywords: [
      'center',
      'start',
      'end',
      'flex-start',
      'flex-end',
      'normal',
      'stretch',
      'baseline',
      'first baseline',
      'last baseline',
      'space-between',
      'space-around',
      'space-evenly',
      'safe center',
      'unsafe center',
    ],
  },
  alignSelf: {
    type: 'keyword',
    keywords: [
      'auto',
      'center',
      'start',
      'end',
      'flex-start',
      'flex-end',
      'normal',
      'stretch',
      'baseline',
      'first baseline',
      'last baseline',
      'space-between',
      'space-around',
      'space-evenly',
      'safe center',
      'unsafe center',
    ],
  },
  float: {
    type: 'keyword',
    keywords: ['left', 'right', 'none', 'inline-start', 'inline-end'],
  },
  fontSize: {
    type: 'length',
    percentage: true,
    range: {
      [AbsoluteLengthUnits.Px]: [0, 512],
      [FontRelativeLengthUnits.Em]: [0, 16],
      [FontRelativeLengthUnits.Rem]: [0, 16],
      [PercentageLengthUnits.Pct]: [0.1, 100],
    },
    keywords: [
      'xx-small',
      'x-small',
      'small',
      'medium',
      'large',
      'x-large',
      'xx-large',
      'xxx-large',
      'smaller',
      'larger',
    ],
  },
  fontStretch: {
    type: 'percentage',
    keywords: [
      'ultra-condensed',
      'extra-condensed',
      'condensed',
      'semi-condensed',
      'normal',
      'semi-expanded',
      'expanded',
      'extra-expanded',
      'ultra-expanded',
    ],
    range: { [PercentageLengthUnits.Pct]: [50, 200] },
  },
  height: {
    type: 'length',
    percentage: true,
    keywords: ['max-content', 'min-content', 'auto'],
  },
  lineHeight: {
    type: 'length',
    percentage: true,
    number: true,
    keywords: ['normal'],
  },
  margin: {
    type: 'length',
    percentage: true,
  },
  padding: {
    type: 'length',
    percentage: true,
  },
  textAlign: {
    type: 'keyword',
    keywords: [
      'start',
      'end',
      'left',
      'right',
      'center',
      'justify',
      'justify-all',
      'match-parent',
    ],
  },
  visibility: {
    type: 'keyword',
    keywords: ['visible', 'hidden', 'collapse'],
  },
  whiteSpace: {
    type: 'keyword',
    keywords: [
      'normal',
      'nowrap',
      'pre',
      'pre-wrap',
      'pre-line',
      'break-spaces',
    ],
  },
  wordBreak: {
    type: 'keyword',
    keywords: ['normal', 'break-all', 'keep-all', 'break-word'],
  },
  writingMode: {
    type: 'keyword',
    keywords: ['horizontal-tb', 'vertical-rl', 'vertical-lr'],
  },
  width: {
    type: 'length',
    percentage: true,
    keywords: ['max-content', 'min-content', 'auto'],
  },
  zIndex: {
    type: 'number',
    keywords: ['auto'],
  },
}
