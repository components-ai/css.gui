import { ComponentType } from 'react'
import { FontFamily } from '../components/inputs/FontFamily'
import {
  AbsoluteLengthUnits,
  FontRelativeLengthUnits,
  ViewportPercentageLengthUnits,
  PercentageLengthUnits,
} from '../types/css'
import { UnitSteps } from '../lib'
import { allProperties } from './css-properties'
import { camelCase, mapValues, uniqBy } from 'lodash-es'
import { UnitRanges } from './ranges'
import { EditorPropsWithLabel } from '../types/editor'

import * as animationProperties from '../components/schemas/animation'
import * as backgroundProperties from '../components/schemas/background'
import * as borderProperties from '../components/schemas/border'
import * as borderRadiusProperties from '../components/schemas/border-radius'
import * as borderImageProperties from '../components/schemas/border-image'
import { borderSpacing } from '../components/schemas/border-spacing'
import { boxShadow } from '../components/schemas/box-shadow'
import { clipPath } from '../components/schemas/clip-path'
import * as columnProperties from '../components/schemas/columns'
import { filter } from '../components/schemas/filter'
import * as gapProperties from '../components/schemas/gap'
import * as gridProperties from '../components/schemas/grid'
import * as gridAreaProperties from '../components/schemas/grid-area'
import * as insetProperties from '../components/schemas/inset'
import * as listStyleProperties from '../components/schemas/list-style'
import * as marginProperties from '../components/schemas/margin'
import * as maskProperties from '../components/schemas/mask'
import * as maskBorderProperties from '../components/schemas/mask-border'
import * as objectProperties from '../components/schemas/object-position'
import * as offsetProperties from '../components/schemas/offset'
import * as overflowProperties from '../components/schemas/overflow'
import * as overscrollProperties from '../components/schemas/overscroll'
import * as paddingProperties from '../components/schemas/padding'
import * as perspectiveProperties from '../components/schemas/perspective'
import * as scrollMarginProperties from '../components/schemas/scroll-margin'
import * as scrollPaddingProperties from '../components/schemas/scroll-padding'
import { scrollSnapAlign } from '../components/schemas/scroll-snap-align'
import * as shapeOutsideProperties from '../components/schemas/shape-outside'
import * as strokeProperties from '../components/schemas/stroke'
import * as textDecorationProperties from '../components/schemas/text-decoration'
import { textShadow } from '../components/schemas/text-shadow'
import * as transformProperties from '../components/schemas/transform'
import * as transitionProperties from '../components/schemas/transition'
import {
  angle,
  color,
  integer,
  keyword,
  length,
  number,
  percentage,
  string,
  time,
} from '../components/schemas/primitives'
import { DataTypeSchema } from '../components/schemas/types'

type PropertyData = {
  input: PrimitiveType | ComponentType<EditorPropsWithLabel<any>>
  percentage?: boolean
  number?: boolean
  keywords?: readonly string[]
  range?: UnitRanges
  defaultValue?: any
  stringify?: (value: any) => string
  dependantProperties?: string[]
  steps?: UnitSteps
  label?: string
  responsive?: boolean
  dimensions?: number
}

// Map of primitive schemas
const primitiveMap = {
  color: color,
  number: number,
  length: length,
  angle: angle,
  time: time,
  percentage: percentage,
  keyword: keyword,
  integer: integer,
  string: string,
  none: (items: any) => {
    return {}
  },
}
type PrimitiveType = keyof typeof primitiveMap

function normalizeSchema(propertyData: PropertyData): DataTypeSchema<any> {
  const { input } = propertyData
  if (typeof input === 'string') {
    if (input === 'keyword') {
      const { keywords = [], ...rest } = propertyData
      return keyword(keywords, rest)
    } else {
      return primitiveMap[input](propertyData) as any
    }
  }
  return propertyData as any
}

export const properties: Record<string, DataTypeSchema<any>> = mapValues(
  {
    accentColor: {
      input: 'color',
      defaultValue: 'tomato',
      keywords: ['auto', 'currentcolor', 'transparent'],
    },
    alignContent: {
      input: 'keyword',
      responsive: true,
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
      defaultValue: 'center',
    },
    alignItems: {
      input: 'keyword',
      responsive: true,
      keywords: [
        'center',
        'start',
        'end',
        'flex-start',
        'flex-end',
        'normal',
        'stretch',
        'self-start',
        'self-end',
        'baseline',
        'first baseline',
        'last baseline',
        'safe center',
        'unsafe center',
        'safe right',
        'unsafe right',
        'safe end',
        'unsafe end',
        'safe self-end',
        'unsafe self-end',
        'safe flex-end',
        'unsafe flex-end',
      ],
      defaultValue: 'center',
    },
    alignmentBaseline: {
      // Can be used with tspan tref altGlyph and textPath SVG elements
      input: 'keyword',
      keywords: [
        'baseline',
        'text-bottom',
        'alphabetic',
        'ideographic',
        'middle',
        'central',
        'mathematical',
        'text-top',
      ],
      defaultValue: 'auto',
    },
    alignSelf: {
      input: 'keyword',
      responsive: true,
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
      defaultValue: 'auto',
    },
    all: {
      input: 'keyword',
      keywords: [],
      defaultValue: 'unset',
    },
    ...animationProperties,
    appearance: {
      input: 'keyword',
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
      defaultValue: 'none',
    },
    backfaceVisibility: {
      input: 'keyword',
      keywords: ['visible', 'hidden'],
      defaultValue: 'hidden',
    },
    ...backgroundProperties,
    backgroundColor: {
      input: 'color',
      keywords: ['currentcolor', 'transparent'],
      defaultValue: 'tomato',
    },
    backgroundPositionX: {
      // TODO: Add side relative values option and multiple values option
      input: 'length',
      percentage: true,
      keywords: ['top', 'left', 'center'],
      defaultValue: 'center',
    },
    backgroundPositionY: {
      // TOO: Add side relative values option and multiple values option
      input: 'length',
      percentage: true,
      keywords: ['top', 'center', 'bottom'],
      defaultValue: 'center',
    },
    ...borderRadiusProperties,
    blockSize: {
      // TODO: Add fit-content function
      input: 'length',
      percentage: true,
      keywords: ['max-content', 'min-content', 'auto'],
      defaultValue: { value: 'auto', unit: 'keyword' },
    },
    borderCollapse: {
      input: 'keyword',
      keywords: ['collapse', 'separate'],
      defaultValue: 'collapse',
    },
    ...borderProperties,
    ...borderImageProperties,
    borderSpacing,
    boxDecorationBreak: {
      input: 'keyword',
      keywords: ['slice', 'clone'],
      defaultValue: 'initial',
    },
    boxShadow,
    boxSnap: {
      input: 'keyword',
      defaultValue: 'none',
      keywords: [
        'none',
        'block-start',
        'block-end',
        'center',
        'baseline',
        'last-baseline',
      ],
    },
    boxSizing: {
      input: 'keyword',
      keywords: ['border-box', 'content-box'],
      defaultValue: 'border-box',
    },
    breakAfter: {
      input: 'keyword',
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
      defaultValue: 'auto',
    },
    breakBefore: {
      input: 'keyword',
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
      defaultValue: 'auto',
    },
    breakInside: {
      input: 'keyword',
      keywords: ['auto', 'avoid', 'avoid-page', 'avoid-column', 'avoid-region'],
      defaultValue: 'auto',
    },
    captionSide: {
      input: 'keyword',
      keywords: [
        'top',
        'bottom',
        'block-start',
        'block-end',
        'inline-start',
        'inline-end',
      ],
      defaultValue: 'bottom',
    },
    caretColor: {
      input: 'color',
      keywords: ['currentcolor', 'transparent'],
      defaultValue: '#6465ff',
    },
    clear: {
      input: 'keyword',
      keywords: ['none', 'left', 'right', 'both', 'inline-start', 'inline-end'],
      defaultValue: 'both',
    },
    clipPath,
    clipRule: {
      // SVG
      input: 'keyword',
      keywords: ['nonzero', 'evenodd'],
      defaultValue: 'nonzero',
    },
    color: {
      input: 'color',
      keywords: ['currentcolor', 'transparent'],
      defaultValue: '#6465ff',
    },
    colorAdjust: {
      input: 'keyword',
      keywords: ['economy', 'exact'],
      defaultValue: 'exact',
    },
    colorInterpolationFilters: {
      input: 'keyword',
      keywords: ['auto', 'sRGB', 'linearRGB'],
      defaultValue: 'auto',
    },
    ...columnProperties,
    columnFill: {
      input: 'keyword',
      keywords: ['auto', 'balance', 'balance-all'],
      defaultValue: 'auto',
    },
    columnRuleColor: {
      input: 'color',
      keywords: ['currentcolor', 'transparent'],
      defaultValue: '#6465ff',
    },
    columnRuleStyle: {
      input: 'keyword',
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
      defaultValue: 'solid',
    },
    columnRuleWidth: {
      input: 'length',
      percentage: true,
      range: {
        [AbsoluteLengthUnits.Px]: [0, 32],
        [FontRelativeLengthUnits.Em]: [0, 2],
        [FontRelativeLengthUnits.Rem]: [0, 2],
        [PercentageLengthUnits.Pct]: [0.1, 100],
      },
      keywords: ['thin', 'medium', 'thick'],
      defaultValue: {
        value: 8,
        unit: 'px',
      },
    },
    columnSpan: {
      input: 'keyword',
      keywords: ['none', 'all'],
      defaultValue: 'all',
    },
    contain: {
      input: 'keyword',
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
      defaultValue: 'none',
    },
    contentVisibility: {
      input: 'keyword',
      keywords: ['visible', 'hidden', 'auto'],
      defaultValue: 'visible',
    },
    // TODO: Add url() for images to cursor
    cursor: {
      input: 'keyword',
      keywords: [
        'auto',
        'default',
        'none',
        'context-menu',
        'progress',
        'pointer',
        'help',
        'wait',
        'crosshair',
        'cell',
        'not-allowed',
        'text',
        'vertical-text',
        'alias',
        'copy',
        'move',
        'no-drop',
        'grab-drop',
        'grabbing-drop',
        'all-scroll',
        'col-resize',
        'row-resize',
        'n-resize',
        'e-resize',
        's-resize',
        'w-resize',
        'ne-resize',
        'nw-resize',
        'se-resize',
        'sw-resize',
        'ew-resize',
        'ns-resize',
        'nesw-resize',
        'nwse-resize',
        'zoom-in',
        'zoom-out',
      ],
      defaultValue: 'pointer',
    },
    direction: {
      input: 'keyword',
      keywords: ['ltr', 'rtl'],
      defaultValue: 'ltr',
    },
    display: {
      input: 'keyword',
      responsive: true,
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
      defaultValue: 'block',
    },
    dominantBaseline: {
      // SVG
      input: 'keyword',
      keywords: [
        'auto',
        'text-bottom',
        'alphabetic',
        'ideographic',
        'middle',
        'central',
        'mathematical',
        'hanging',
        'text-top',
      ],
      defaultValue: 'auto',
    },
    emptyCells: {
      input: 'keyword',
      keywords: ['show', 'hide'],
      defaultValue: 'hide',
    },
    fill: {
      input: 'color',
      keywords: ['none', 'context-fill', 'context-stroke'],
      defaultValue: '#6465ff',
    },
    filter,
    flexBasis: {
      input: 'length',
      percentage: true,
      range: {
        [AbsoluteLengthUnits.Px]: [0, 512],
        [FontRelativeLengthUnits.Em]: [0, 16],
        [FontRelativeLengthUnits.Rem]: [0, 16],
        [PercentageLengthUnits.Pct]: [0.1, 100],
      },
      keywords: [
        'auto',
        'fill',
        'max-content',
        'min-content',
        'fit-content',
        'content',
      ],
      defaultValue: { value: 'auto', unit: 'keyword' },
    },
    flexDirection: {
      input: 'keyword',
      responsive: true,
      keywords: ['row', 'row-reverse', 'column', 'column-reverse'],
      defaultValue: 'row',
    },
    flexFlow: {
      input: 'keyword',
      responsive: true,
      keywords: [
        'row',
        'row-reverse',
        'column',
        'column-reverse',
        'nowrap',
        'wrap',
        'wrap-reverse',
        'row nowrap',
        'column nowrap',
        'row wrap',
        'column wrap',
        'row-reverse nowrap',
        'column-reverse nowrap',
        'row-reverse wrap',
        'column-reverse wrap',
      ],
      defaultValue: 'row wrap',
    },
    flexGrow: {
      input: 'number',
      range: { number: [0, Infinity] },
      defaultValue: 0,
    },
    flexShrink: {
      input: 'number',
      range: { number: [0, Infinity] },
      defaultValue: 1,
    },
    flexWrap: {
      input: 'keyword',
      responsive: true,
      keywords: ['nowrap', 'wrap', 'wrap-reverse'],
      defaultValue: 'wrap',
    },
    float: {
      input: 'keyword',
      keywords: ['left', 'right', 'none', 'inline-start', 'inline-end'],
      defaultValue: 'none',
    },
    floatDefer: {
      input: 'number',
      keywords: ['last', 'none'],
      defaultValue: 'none',
      range: { number: [0, Infinity] },
    },
    floatOffset: {
      input: 'length',
      percentage: true,
      range: {
        [AbsoluteLengthUnits.Px]: [0, 512],
        [FontRelativeLengthUnits.Em]: [0, 16],
        [FontRelativeLengthUnits.Rem]: [0, 16],
        [PercentageLengthUnits.Pct]: [0.1, 200],
      },
      defaultValue: {
        value: 0,
        unit: 'px',
      },
    },
    floatReference: {
      input: 'keyword',
      keywords: ['inline', 'column', 'region', 'page'],
    },
    floodColor: {
      input: 'color',
      keywords: ['currentcolor', 'transparent'],
      defaultValue: '#6465ff',
    },
    floodOpacity: {
      input: 'percentage',
      defaultValue: {
        value: 100,
        unit: '%',
      },
    },
    fontFamily: {
      input: FontFamily,
      dependantProperties: ['fontStyle', 'fontVariationSettings'],
      defaultValue: 'Inter',
    },
    fontKerning: {
      input: 'keyword',
      keywords: ['auto', 'normal', 'none'],
      defaultValue: 'auto',
    },
    fontOpticalSizing: {
      input: 'keyword',
      keywords: ['auto', 'none'],
      defaultValue: 'auto',
    },
    fontSize: {
      input: 'length',
      percentage: true,
      range: {
        [AbsoluteLengthUnits.Px]: [0, 512],
        [FontRelativeLengthUnits.Em]: [0, 16],
        [FontRelativeLengthUnits.Rem]: [0, 16],
        [PercentageLengthUnits.Pct]: [0.1, 200],
        [ViewportPercentageLengthUnits.Vh]: [0, 100],
        [ViewportPercentageLengthUnits.Vw]: [0, 100],
        [ViewportPercentageLengthUnits.VMin]: [0, 100],
        [ViewportPercentageLengthUnits.VMax]: [0, 100],
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
      defaultValue: {
        value: 24,
        unit: 'px',
      },
    },
    fontStretch: {
      input: 'percentage',
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
      defaultValue: 'ultra-condensed',
    },
    fontStyle: {
      input: 'keyword',
      keywords: [
        'normal',
        'italic',
        'oblique',
        'oblique 10deg',
        'oblique 20deg',
        'oblique 30deg',
        'oblique 40deg',
      ],
    },
    fontSynthesis: {
      input: 'keyword',
      keywords: [
        'none',
        'weight',
        'style',
        'small-caps',
        'weight style',
        'weight small-caps',
        'style small-caps',
        'weight style small-caps',
      ],
    },
    fontVariantCaps: {
      input: 'keyword',
      keywords: [
        'normal',
        'small-caps',
        'all-small-caps',
        'petite-caps',
        'all-petite-caps',
        'unicase',
        'titling-caps',
      ],
    },
    fontVariantEastAsian: {
      input: 'keyword',
      keywords: [
        'normal',
        'ruby',
        'jis78',
        'jis90',
        'jis04',
        'simplified',
        'traditional',
        'full-width',
        'proportional-width',
        'ruby full-width jis83',
      ],
    },
    fontVariantLigatures: {
      input: 'keyword',
      keywords: [
        'normal',
        'none',
        'common-ligatures',
        'no-common-ligatures',
        'discretionary-ligatures',
        'no-discretionary-ligatures',
        'historical-ligatures',
        'no-historical-ligatures',
        'contextual',
        'no-contextual',
      ],
    },
    fontVariantNumeric: {
      input: 'keyword',
      keywords: [
        'normal',
        'ordinal',
        'slashed-zero',
        'lining-nums',
        'oldstyle-nums',
        'proportional-nums',
        'tabular-nums',
        'diagonal-fractinos',
        'stacked-fractions',
        // TODO: Research and add additional combinations
      ],
    },
    fontVariantPosition: {
      input: 'keyword',
      keywords: ['normal', 'sub', 'super'],
    },
    fontVariationSettings: {
      input: 'none',
    },
    fontWeight: {
      input: 'keyword',
      keywords: [
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
        'normal',
        'bold',
        'lighter',
        'bolder',
      ],
      defaultValue: '400',
    },
    forceColorAdjust: {
      input: 'keyword',
      keywords: ['auto', 'none'],
    },
    ...gapProperties,
    ...gridProperties,
    ...gridAreaProperties,
    hangingPunctuation: {
      input: 'keyword',
      keywords: [
        'none',
        'first',
        'last',
        'force-end',
        'allow-end',
        'first force-end',
        'first allow-end',
        'first last',
        'last force-end',
        'last allow-end',
        'first force-end last',
        'first allow-end last',
      ],
      defaultValue: 'none',
    },
    height: {
      input: 'length',
      percentage: true,
      keywords: ['max-content', 'min-content', 'auto'],
      range: {
        [AbsoluteLengthUnits.Px]: [0, 2160],
        [FontRelativeLengthUnits.Em]: [0, 16],
        [FontRelativeLengthUnits.Rem]: [0, 16],
        [PercentageLengthUnits.Pct]: [0.1, 200],
        [ViewportPercentageLengthUnits.Vh]: [0, 100],
        [ViewportPercentageLengthUnits.Vw]: [0, 100],
        [ViewportPercentageLengthUnits.VMin]: [0, 100],
        [ViewportPercentageLengthUnits.VMax]: [0, 100],
      },
      defaultValue: 'auto',
    },
    hyphenateCharacter: {
      input: 'string',
      keywords: ['auto'],
    },
    hyphens: {
      input: 'keyword',
      keywords: ['none', 'manual', 'auto'],
      defaultValue: 'auto',
    },
    imageOrientation: {
      // NOTE: there is an <angle> version that is deprecated in favor of rotate()
      input: 'keyword',
      keywords: ['none', 'from-image'],
      defaultValue: 'from-image',
    },
    initialLetterAlign: {
      input: 'keyword',
      keywords: ['auto', 'alphabetic', 'hanging', 'ideographic'],
      defaultValue: 'auto',
    },
    initialLetterWrap: {
      input: 'length',
      percentage: true,
      keywords: ['none', 'first', 'all', 'grid'],
      defaultValue: 'none',
    },
    ...insetProperties,
    imageRendering: {
      input: 'keyword',
      keywords: ['auto', 'crisp-edges', 'pixelated'],
      defaultValue: 'auto',
    },
    isolation: {
      input: 'keyword',
      keywords: ['auto', 'isolate'],
    },
    justifyContent: {
      input: 'keyword',
      responsive: true,
      keywords: [
        'start',
        'center',
        'end',
        'space-between',
        'space-around',
        'space-evenly',
        'flex-start',
        'flex-end',
        'left',
        'right',
        'normal',
        'stretch',
        'safe center',
        'unsafe center',
      ],
      defaultValue: 'center',
    },
    justifyItems: {
      input: 'keyword',
      keywords: [
        'normal',
        'stretch',
        'center',
        'start',
        'end',
        'flex-start',
        'flex-end',
        'self-start',
        'self-end',
        'left',
        'right',
        'baseline',
        'first baseline',
        'last baseline',
        'safe center',
        'unsafe center',
      ],
      defaultValue: 'center',
    },
    justifySelf: {
      input: 'keyword',
      keywords: [
        'normal',
        'stretch',
        'center',
        'start',
        'end',
        'flex-start',
        'flex-end',
        'self-start',
        'self-end',
        'left',
        'right',
        'baseline',
        'first baseline',
        'last baseline',
        'safe center',
        'unsafe center',
      ],
      defaultValue: 'center',
    },
    letterSpacing: {
      input: 'length',
      percentage: true,
      keywords: ['normal'],
      defaultValue: 'normal',
    },
    lightingColor: {
      input: 'color',
      keywords: ['currentcolor', 'transparent'],
    },
    lineBreak: {
      input: 'keyword',
      keywords: ['auto', 'loose', 'normal', 'strict', 'anywhere'],
      defaultValue: 'auto',
    },
    ...listStyleProperties,
    lineGrid: {
      input: 'keyword',
      keywords: ['match-parent', 'create'],
    },
    lineHeight: {
      input: 'length',
      percentage: true,
      number: true,
      range: { number: [0, 2] },
      keywords: ['normal'],
      steps: { number: 0.05 },
      defaultValue: {
        value: 1.5,
        unit: 'number',
      },
    },
    lineHeightStep: {
      input: 'length',
      percentage: true,
    },
    lineSnap: {
      input: 'keyword',
      keywords: ['none', 'baseline', 'contain'],
      defaultValue: 'none',
    },
    ...marginProperties,
    marqueeDirection: {
      input: 'keyword',
      keywords: ['forward', 'reverse'],
      defaultValue: 'forward',
    },
    marqueeLoop: {
      input: 'integer',
      range: { number: [1, Infinity] },
      defaultValue: 'infinite',
    },
    marqueeStyle: {
      input: 'keyword',
      keywords: ['scroll', 'slide', 'alternate'],
      defaultValue: 'scroll',
    },
    marqueeSpeed: {
      input: 'keyword',
      keywords: ['slow', 'normal', 'fast'],
      defaultValue: 'slow',
    },
    ...maskProperties,
    ...maskBorderProperties,
    maskType: {
      input: 'keyword',
      keywords: ['luminance', 'alpha'],
      defaultValue: 'alpha',
    },
    // TODO: add fit-content function
    maxBlockSize: {
      input: 'length',
      percentage: true,
      keywords: ['none', 'max-content', 'min-content'],
    },
    maxHeight: {
      input: 'length',
      percentage: true,
      keywords: ['none', 'max-content', 'min-content', 'auto'],
      defaultValue: {
        value: 100,
        unit: '%',
      },
    },
    maxInlineSize: {
      input: 'length',
      percentage: true,
      keywords: ['none', 'max-content', 'min-content'],
    },
    maxLines: {
      input: 'number',
      keywords: ['none'],
      range: { number: [0, 9999] },
    },
    // TODO: add fit-content function
    maxWidth: {
      input: 'length',
      percentage: true,
      keywords: ['none', 'max-content', 'min-content', 'auto'],
      defaultValue: {
        value: 100,
        unit: '%',
      },
    },
    minHeight: {
      input: 'length',
      percentage: true,
      keywords: ['max-content', 'min-content', 'auto'],
      defaultValue: {
        value: 48,
        unit: 'px',
      },
    },
    minBlockSize: {
      input: 'length',
      percentage: true,
      keywords: ['max-content', 'min-content'],
      defaultValue: {
        value: 0,
        unit: 'px',
      },
    },
    minInlineSize: {
      input: 'length',
      percentage: true,
      keywords: ['max-content', 'min-content'],
      defaultValue: {
        value: 0,
        unit: 'px',
      },
    },
    // TODO: add fit-content function
    minWidth: {
      input: 'length',
      percentage: true,
      keywords: ['max-content', 'min-content', 'auto'],
      defaultValue: 'auto',
    },
    mixBlendMode: {
      input: 'keyword',
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
      defaultValue: 'overlay',
    },
    ...objectProperties,
    ...offsetProperties,
    opacity: {
      input: 'percentage',
      range: {
        [PercentageLengthUnits.Pct]: [0, 100],
      },
      defaultValue: {
        value: 100,
        unit: '%',
      },
    },
    order: {
      input: 'integer',
      defaultValue: 0,
    },
    orphans: {
      input: 'integer',
      range: { number: [1, 10] },
      defaultValue: 2,
    },
    outlineColor: {
      input: 'color',
      keywords: ['invert'],
      defaultValue: '#6465ff',
    },
    outlineOffset: {
      input: 'length',
      percentage: true,
      defaultValue: {
        value: 4,
        unit: 'px',
      },
    },
    outlineStyle: {
      input: 'keyword',
      keywords: [
        'none',
        'dotted',
        'dashed',
        'solid',
        'double',
        'groove',
        'ridge',
        'inset',
        'outset',
      ],
      defaultValue: 'solid',
    },
    outlineWidth: {
      input: 'length',
      percentage: true,
      keywords: ['thin', 'medium', 'thick'],
      defaultValue: {
        value: 2,
        unit: 'px',
      },
    },
    ...overflowProperties,
    overflowAnchor: {
      input: 'keyword',
      keywords: ['auto', 'none'],
      defaultValue: 'auto',
    },
    overflowClipMargin: {
      // TODO: Add ranges
      input: 'length',
      percentage: true,
    },
    overflowWrap: {
      input: 'keyword',
      keywords: ['normal', 'break-word', 'anywhere'],
      defaultValue: 'normal',
    },
    ...overscrollProperties,
    ...paddingProperties,
    ...perspectiveProperties,
    placeItems: {
      input: 'keyword',
      keywords: [
        'center',
        'normal start',
        'center normal',
        'start legacy',
        'end normal',
        'self-start legacy',
        'self-end normal',
        'flex-start legacy',
        'flex-end normal',
        'left legacy',
        'right normal',
        'baseline normal',
        'first baseline legacy',
        'last baseline normal',
        'stretch legacy',
      ],
      defaultValue: 'center',
    },
    placeSelf: {
      input: 'keyword',
      keywords: [
        'auto center',
        'normal start',
        'center normal',
        'start auto',
        'end normal',
        'self-start auto',
        'self-end normal',
        'flex-start auto',
        'flex-end normal',
        'left auto',
        'right normal',
        'baseline normal',
        'first baseline auto',
        'last baseline normal',
        'stretch auto',
      ],
      defaultValue: 'auto center',
    },
    pointerEvents: {
      input: 'keyword',
      keywords: [
        'auto',
        'none',
        // Add inticator to UI these are svg only
        'visiblePainted',
        'visibleFill',
        'visibleStroke',
        'visible',
        'painted',
        'fill',
        'stroke',
        'all',
      ],
      defaultValue: 'auto',
    },
    position: {
      input: 'keyword',
      keywords: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
      defaultValue: 'static',
    },
    printColorAdjust: {
      input: 'keyword',
      keywords: ['economy', 'exact'],
      defaultValue: 'exact',
    },
    resize: {
      input: 'keyword',
      keywords: ['none', 'both', 'horizontal', 'vertical', 'block', 'inline'],
      defaultValue: 'none',
    },
    rubyAlign: {
      input: 'keyword',
      keywords: ['start', 'center', 'space-between', 'space-around'],
      defaultValue: 'start',
    },
    rubyMerge: {
      input: 'keyword',
      keywords: ['separate', 'merge', 'auto'],
      defaultValue: 'auto',
    },
    rubyPosition: {
      input: 'keyword',
      keywords: ['over', 'under', 'inter-character', 'alternate'],
      defaultValue: 'alternate',
    },
    scrollBehavior: {
      input: 'keyword',
      keywords: ['auto', 'smooth'],
      defaultValue: 'auto',
    },
    scrollbarColor: {
      input: 'color',
      keywords: ['auto', 'currentcolor', 'transparent'],
      defaultValue: '#ff33cc',
    },
    scrollbarGutter: {
      input: 'keyword',
      keywords: ['auto', 'stable', 'stable both-edges'],
      defaultValue: 'auto',
    },
    scrollbarWidth: {
      input: 'keyword',
      keywords: ['auto', 'thin', 'none'],
      defaultValue: 'auto',
    },
    ...scrollMarginProperties,
    ...scrollPaddingProperties,
    scrollSnapAlign,
    scrollSnapStop: {
      input: 'keyword',
      keywords: ['normal', 'always'],
      defaultValue: 'normal',
    },
    scrollSnapType: {
      input: 'keyword',
      keywords: [
        'none',
        'x',
        'y',
        'block',
        'inline',
        'both',
        'x mandatory',
        'y proximity',
        'both mandatory',
      ],
      defaultValue: 'none',
    },
    ...shapeOutsideProperties,
    ...strokeProperties,
    tabSize: {
      input: 'length',
      number: true,
      defaultValue: 1,
    },
    tableLayout: {
      // TODO: Only have control appear when display: table
      input: 'keyword',
      keywords: ['auto', 'fixed'],
      defaultValue: 'auto',
    },
    textAlign: {
      input: 'keyword',
      responsive: true,
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
      defaultValue: 'start',
    },
    textAlignAll: {
      input: 'keyword',
      keywords: [
        'start',
        'end',
        'left',
        'right',
        'center',
        'justify',
        'match-parent',
      ],
      defaultValue: 'start',
    },
    textAlignLast: {
      input: 'keyword',
      keywords: [
        'auto',
        'start',
        'end',
        'left',
        'right',
        'center',
        'justify',
        'justify-all',
        'match-parent',
      ],
      defaultValue: 'start',
    },
    textCombineUpright: {
      // note: there is a special `digits <number>` syntax that is only supported by Internet Explorer??
      input: 'keyword',
      keywords: ['none', 'all'],
      defaultValue: 'none',
    },
    ...textDecorationProperties,
    textDecorationSkip: {
      input: 'keyword',
      keywords: [
        'none',
        'objects',
        'spaces',
        'edges',
        'box-decoration',
        'objects spaces',
        'leading-spaces trailing spaces',
        'objects edges box-decoration',
      ],
      defaultValue: 'none',
    },
    textDecorationSkipInk: {
      input: 'keyword',
      keywords: ['none', 'auto', 'all'],
      defaultValue: 'auto',
    },
    textEmphasisColor: {
      input: 'color',
      keywords: ['currentcolor', 'transparent'],
      defaultValue: '#6465ff',
    },
    textEmphasisPosition: {
      input: 'keyword',
      keywords: [
        'over right',
        'over left',
        'under right',
        'under left',
        'left over',
        'right under',
        'left under',
      ],
      defaultValue: 'over right',
    },
    textEmphasisStyle: {
      input: 'string',
      keywords: [
        'filled',
        'open',
        'dot',
        'circle',
        'double-circle',
        'triangle',
        'filled sesame',
        'open sesame',
      ],
      defaultValue: 'none',
    },
    textIndent: {
      input: 'length',
      percentage: true,
      defaultValue: {
        value: 1,
        unit: 'em',
      },
    },
    textJustify: {
      input: 'keyword',
      keywords: ['none', 'auto', 'inter-word', 'inter-character', 'distribute'],
      defaultValue: 'auto',
    },
    textOrientation: {
      input: 'keyword',
      keywords: [
        'mixed',
        'upright',
        'sideways-right',
        'sideways',
        'use-glyph-orientation',
      ],
      defaultValue: 'mixed',
    },
    textOverflow: {
      // TODO firefox supports two-value syntax and there are more experimental values
      // but these are supported by all browsers
      input: 'keyword',
      keywords: ['clip', 'ellipsis'],
      defaultValue: 'clip',
    },
    textRendering: {
      input: 'keyword',
      keywords: [
        'auto',
        'optimizeSpeed',
        'optimzeLegibility',
        'geometricPrecision',
      ],
      defaultValue: 'optimizeLegibility',
    },
    textShadow,
    textSpaceCollapse: {
      input: 'keyword',
      keywords: [
        'collapse',
        'discard',
        'preserve',
        'preserve-breaks',
        'preserve-spaces',
      ],
      defaultValue: 'collapse',
    },
    textTransform: {
      input: 'keyword',
      keywords: [
        'none',
        'capitalize',
        'uppercase',
        'lowercase',
        'full-width',
        'full-size-kana',
      ],
    },
    textUnderlinePosition: {
      input: 'keyword',
      keywords: ['auto', 'under', 'left', 'right', 'under left', 'right under'],
      defaultValue: 'under',
    },
    textWrap: {
      input: 'keyword',
      keywords: ['wrap', 'nowrap', 'balance', 'stable', 'pretty'],
      defaultValue: 'wrap',
    },
    touchAction: {
      input: 'keyword',
      keywords: [
        'auto',
        'none',
        'pan-x',
        'pan-left',
        'pan-right',
        'pan-y',
        'pan-up',
        'pan-down',
        'pinch-zoom',
        'manipulation',
      ],
      defaultValue: 'auto',
    },
    ...transformProperties,
    transformBox: {
      input: 'keyword',
      keywords: [
        'content-box',
        'border-box',
        'fill-box',
        'stroke-box',
        'view-box',
      ],
      defaultValue: 'view-box',
    },
    transformStyle: {
      input: 'keyword',
      keywords: ['flat', 'preserve-3d'],
    },
    ...transitionProperties,
    unicodeBidi: {
      input: 'keyword',
      keywords: [
        'normal',
        'embed',
        'isolate',
        'bidi-override',
        'isolate-override',
        'plaintext',
      ],
      defaultValue: 'normal',
    },
    userSelect: {
      input: 'keyword',
      keywords: ['none', 'auto', 'text', 'contain', 'all'],
      defaultValue: 'auto',
    },
    verticalAlign: {
      input: 'length',
      percentage: true,
      range: {
        [AbsoluteLengthUnits.Px]: [0, 512],
        [FontRelativeLengthUnits.Em]: [0, 16],
        [FontRelativeLengthUnits.Rem]: [0, 16],
        [PercentageLengthUnits.Pct]: [0.1, 100],
      },
      keywords: [
        'baseline',
        'sub',
        'super',
        'text-top',
        'text-bottom',
        'middle',
        'top',
        'bottom',
      ],
      defaultValue: {
        value: 'baseline',
        unit: 'keyword',
      },
    },
    visibility: {
      input: 'keyword',
      keywords: ['visible', 'hidden', 'collapse'],
      defaultValue: 'visible',
    },
    whiteSpace: {
      input: 'keyword',
      keywords: [
        'normal',
        'nowrap',
        'pre',
        'pre-wrap',
        'pre-line',
        'break-spaces',
      ],
      defaultValue: 'normal',
    },
    widows: {
      input: 'integer',
      range: { number: [1, Infinity] },
      defaultValue: 2,
    },
    width: {
      input: 'length',
      percentage: true,
      keywords: ['max-content', 'min-content', 'auto'],
      range: {
        [AbsoluteLengthUnits.Px]: [0, 3840],
        [FontRelativeLengthUnits.Em]: [0, 16],
        [FontRelativeLengthUnits.Rem]: [0, 16],
        [PercentageLengthUnits.Pct]: [0.1, 200],
        [ViewportPercentageLengthUnits.Vh]: [0, 100],
        [ViewportPercentageLengthUnits.Vw]: [0, 100],
        [ViewportPercentageLengthUnits.VMin]: [0, 100],
        [ViewportPercentageLengthUnits.VMax]: [0, 100],
      },
      defaultValue: { value: 100, unit: '%' },
    },
    wordBreak: {
      input: 'keyword',
      keywords: ['normal', 'break-all', 'keep-all', 'break-word'],
      defaultValue: 'normal',
    },
    wordSpacing: {
      input: 'length',
      percentage: true,
      keywords: ['normal'],
      defaultValue: 'normal',
    },
    wordWrap: {
      input: 'keyword',
      keywords: ['normal', 'break-word', 'anywhere'],
      defaultValue: 'normal',
    },
    wrapAfter: {
      input: 'keyword',
      keywords: ['auto', 'avoid', 'avoid-line', 'aboid-flex', 'line', 'flex'],
      defaultValue: 'auto',
    },
    wrapBefore: {
      input: 'keyword',
      keywords: ['auto', 'avoid', 'avoid-line', 'aboid-flex', 'line', 'flex'],
      defaultValue: 'auto',
    },
    wrapFlow: {
      input: 'keyword',
      keywords: ['auto', 'both', 'start', 'end', 'minimum', 'maximum', 'clear'],
      defaultValue: 'auto',
    },
    wrapInside: {
      input: 'keyword',
      keywords: ['auto', 'avoid'],
      defaultValue: 'auto',
    },
    wrapThrough: {
      input: 'keyword',
      keywords: ['none', 'wrap'],
      defaultValue: 'none',
    },
    writingMode: {
      input: 'keyword',
      keywords: ['horizontal-tb', 'vertical-rl', 'vertical-lr'],
      defaultValue: 'horizontal-tb',
    },
    zIndex: {
      input: 'integer',
      keywords: ['auto'],
      defaultValue: 'auto',
    },
  },
  normalizeSchema
) as any

export const supportedProperties = uniqBy(allProperties, 'property').filter(
  (property) => {
    return properties[camelCase(property.property)]
  }
)

export const unsupportedProperties = uniqBy(allProperties, 'property').filter(
  (property) => {
    return !properties[camelCase(property.property)]
  }
)
