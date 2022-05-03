import { ComponentType } from 'react'
import BoxShadowPicker from '../components/inputs/BoxShadow/picker'
import { stringifyBoxShadow } from '../components/inputs/BoxShadow/stringify'
import EasingFunctionPicker from '../components/inputs/EasingFunction/picker'
import { stringifyEasingFunction } from '../components/inputs/EasingFunction/stringify'
import FilterPicker from '../components/inputs/Filter/picker'
import { stringifyFilter } from '../components/inputs/Filter/stringify'
import TextShadowPicker from '../components/inputs/TextShadow/picker'
import { FontFamily } from '../components/inputs/FontFamily'
import { stringifyTextShadow } from '../components/inputs/TextShadow/stringify'
import TransformPicker from '../components/inputs/Transform/picker'
import { stringifyTransform } from '../components/inputs/Transform/stringify'
import {
  AbsoluteLengthUnits,
  FontRelativeLengthUnits,
  PercentageLengthUnits,
} from '../types/css'
import { ANIMATABLE_PROPERTIES } from './animatable'
import {
  PerspectiveOriginInput,
  stringifyPerspectiveOrigin,
} from '../components/inputs/PerspectiveOrigin'
import {
  stringifyTextDecoration,
  TextDecorationInput,
  textDecorationLines,
  textDecorationStyles,
} from '../components/inputs/TextDecoration'
import ImageSourcePicker from '../components/inputs/ImageSource/picker'
import { stringifyImageSource } from '../components/inputs/ImageSource/stringify'
import { allProperties } from './css-properties'
import { camelCase, uniqBy } from 'lodash-es'
import { positiveRanges, UnitRanges } from './ranges'

type PropertyData = {
  type: string | ComponentType<any>
  percentage?: boolean
  number?: boolean
  keywords?: readonly string[]
  range?: UnitRanges
  defaultValue?: string | number
  stringify?: (value: any) => string
  label?: string
}

export const properties: Record<string, PropertyData> = {
  accentColor: {
    type: 'color',
    defaultValue: 'auto',
    keywords: ['auto', 'currentcolor', 'transparent'],
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
  all: {
    type: 'keyword',
    keywords: [],
  },
  // TODO array of time values
  animationDelay: { type: 'time' },
  animationDirection: {
    type: 'keyword',
    keywords: ['normal', 'reverse', 'alternate', 'alternate-reverse'],
  },
  animationDuration: { type: 'time' },
  animationFillMode: {
    type: 'keyword',
    keywords: ['none', 'forwards', 'backwards', 'both'],
  },
  animationIterationCount: {
    type: 'number',
    keywords: ['infinite'],
    range: { number: [0, Infinity] },
  },
  animationPlayState: {
    type: 'keyword',
    keywords: ['running', 'paused'],
  },
  // TODO this should be a combobox
  animationProperty: {
    type: 'keyword',
    keywords: ANIMATABLE_PROPERTIES,
  },
  animationTimingFunction: {
    type: EasingFunctionPicker,
    stringify: stringifyEasingFunction,
  },
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
  backgroundAttachment: {
    type: 'keyword',
    keywords: ['scroll', 'fixed', 'local', 'local, scroll', 'scroll, local'],
  },
  backgroundBlendMode: {
    // TODO multiple properties
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
    keywords: ['border-box', 'padding-box', 'content-box', 'text'],
  },
  backgroundImage: {
    type: ImageSourcePicker,
    stringify: stringifyImageSource,
    label: 'Background Image',
  },
  // TODO: 4-positional arguments separated by spaces
  borderImageOutset: {
    type: 'length',
    number: true,
  },
  // TODO: 2-positional arguments separated by spaces
  borderImageRepeat: {
    type: 'keyword',
    keywords: ['stretch', 'repeat', 'round', 'space'],
  },
  borderImageSlice: {
    type: 'length',
    number: true,
    percentage: true,
    range: positiveRanges(),
  },
  borderImageSource: {
    type: ImageSourcePicker,
    stringify: stringifyImageSource,
    label: 'Border Image',
  },
  borderImageWidth: {
    type: 'length',
    keywords: ['thin', 'medium', 'thick'],
  },
  backgroundOrigin: {
    type: 'keyword',
    keywords: ['border-box', 'padding-box', 'content-box'],
  },
  backgroundPosition: {
    type: 'position',
  },
  backgroundPositionX: {
    // TODO: Add side relative values option and multiple values option
    type: 'length',
    percentage: true,
    keywords: ['top', 'left', 'center'],
  },
  backgroundPositionY: {
    // TOO: Add side relative values option and multiple values option
    type: 'length',
    percentage: true,
    keywords: ['top', 'center', 'bottom'],
  },
  borderRadius: {
    type: 'length',
    percentage: true,
    range: {
      ...positiveRanges(),
      [AbsoluteLengthUnits.Px]: [0, Infinity],
      [FontRelativeLengthUnits.Em]: [0, 64],
      [FontRelativeLengthUnits.Rem]: [0, 64],
    },
  },
  backgroundRepeat: {
    type: 'keyword',
    keywords: [
      'repeat-x',
      'repeat-y',
      'repeat',
      'space',
      'round',
      'no-repeat',
      'repeat space',
      'repeat repeat',
      'round space',
      'no-repeat round',
    ],
  },
  backgroundSize: {
    // TODO: Add two value syntax
    type: 'length',
    percentage: true,
    keywords: ['cover', 'contain', 'auto'],
  },
  blockSize: {
    // TODO: Add fit-content function
    type: 'length',
    percentage: true,
    keywords: ['max-content', 'min-content', 'auto'],
  },
  borderColor: {
    type: 'color',
    keywords: ['currentcolor', 'transparent'],
  },
  borderStyle: {
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
  borderWidth: {
    type: 'length',
    keywords: ['thin', 'medium', 'thick'],
  },
  bottom: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
  },
  boxDecorationBreak: {
    type: 'keyword',
    keywords: ['slice', 'clone'],
  },
  boxShadow: {
    type: BoxShadowPicker,
    stringify: stringifyBoxShadow,
  },
  boxSizing: {
    type: 'keyword',
    keywords: ['border-box', 'content-box'],
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
    keywords: ['auto', 'avoid', 'avoid-page', 'avoid-column', 'avoid-region'],
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
    ],
  },
  caretColor: {
    type: 'color',
    defaultValue: 'auto',
    keywords: ['currentcolor', 'transparent'],
  },
  clear: {
    type: 'keyword',
    keywords: ['none', 'left', 'right', 'both', 'inline-start', 'inline-end'],
  },
  color: {
    type: 'color',
    keywords: ['currentcolor', 'transparent'],
  },
  columnCount: {
    type: 'integer',
    keywords: ['auto'],
  },
  columnFill: {
    type: 'keyword',
    keywords: ['auto', 'balance', 'balance-all'],
  },
  columnGap: {
    type: 'length',
    percentage: true,
    range: {
      [AbsoluteLengthUnits.Px]: [0, 128],
      [FontRelativeLengthUnits.Em]: [0, 8],
      [FontRelativeLengthUnits.Rem]: [0, 8],
      [PercentageLengthUnits.Pct]: [0.1, 100],
    },
    keywords: ['normal'],
  },
  columnRuleColor: {
    type: 'color',
    keywords: ['currentcolor', 'transparent'],
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
  columnRuleWidth: {
    type: 'length',
    percentage: true,
    range: {
      [AbsoluteLengthUnits.Px]: [0, 32],
      [FontRelativeLengthUnits.Em]: [0, 2],
      [FontRelativeLengthUnits.Rem]: [0, 2],
      [PercentageLengthUnits.Pct]: [0.1, 100],
    },
    keywords: ['thin', 'medium', 'thick'],
  },
  columnSpan: {
    type: 'keyword',
    keywords: ['none', 'all'],
  },
  columnWidth: {
    type: 'length',
    percentage: true,
    range: {
      [AbsoluteLengthUnits.Px]: [0, 512],
      [FontRelativeLengthUnits.Em]: [0, 16],
      [FontRelativeLengthUnits.Rem]: [0, 16],
      [PercentageLengthUnits.Pct]: [0.1, 100],
    },
    keywords: ['auto'],
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
    keywords: ['visible', 'hidden', 'auto'],
  },
  // TODO: Add url() for images to cursor
  cursor: {
    type: 'keyword',
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
  },
  direction: {
    type: 'keyword',
    keywords: ['ltr', 'rtl'],
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
  emptyCells: {
    type: 'keyword',
    keywords: ['show', 'hide'],
  },
  filter: {
    type: FilterPicker,
    stringify: stringifyFilter,
  },
  flexBasis: {
    type: 'length',
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
  },
  flexDirection: {
    type: 'keyword',
    keywords: ['row', 'row-reverse', 'column', 'column-reverse'],
  },
  flexFlow: {
    type: 'keyword',
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
  },
  flexGrow: {
    type: 'number',
    defaultValue: 0,
    range: { number: [0, Infinity] },
  },
  flexShrink: {
    type: 'number',
    defaultValue: 1,
    range: { number: [0, Infinity] },
  },
  flexWrap: {
    type: 'keyword',
    keywords: ['nowrap', 'wrap', 'wrap-reverse'],
  },
  float: {
    type: 'keyword',
    keywords: ['left', 'right', 'none', 'inline-start', 'inline-end'],
  },
  fontFamily: {
    type: FontFamily,
  },
  fontKerning: {
    type: 'keyword',
    keywords: ['auto', 'normal', 'none'],
  },
  fontOpticalSizing: {
    type: 'keyword',
    keywords: ['auto', 'none'],
  },
  fontSize: {
    type: 'length',
    percentage: true,
    range: {
      [AbsoluteLengthUnits.Px]: [0, 512],
      [FontRelativeLengthUnits.Em]: [0, 16],
      [FontRelativeLengthUnits.Rem]: [0, 16],
      [PercentageLengthUnits.Pct]: [0.1, 200],
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
  fontStyle: {
    type: 'keyword',
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
    type: 'keyword',
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
    type: 'keyword',
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
    type: 'keyword',
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
    type: 'keyword',
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
    type: 'keyword',
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
    type: 'keyword',
    keywords: ['normal', 'sub', 'super'],
  },
  forceColorAdjust: {
    type: 'keyword',
    keywords: ['auto', 'none'],
  },
  gridAutoFlow: {
    type: 'keyword',
    keywords: ['row', 'column', 'dense', 'row dense', 'column dense'],
  },
  hangingPunctuation: {
    type: 'keyword',
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
  },
  height: {
    type: 'length',
    percentage: true,
    keywords: ['max-content', 'min-content', 'auto'],
    defaultValue: 'auto',
  },
  hyphens: {
    type: 'keyword',
    keywords: ['none', 'manual', 'auto'],
  },
  imageRendering: {
    type: 'keyword',
    keywords: ['auto', 'crisp-edges', 'pixelated'],
  },
  isolation: {
    type: 'keyword',
    keywords: ['auto', 'isolate'],
  },
  justifyContent: {
    type: 'keyword',
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
  },
  justifyItems: {
    type: 'keyword',
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
  },
  justifySelf: {
    type: 'keyword',
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
  },
  left: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
  },
  letterSpacing: {
    type: 'length',
    percentage: true,
    keywords: ['normal'],
  },
  lineBreak: {
    type: 'keyword',
    keywords: ['auto', 'loose', 'normal', 'strict', 'anywhere'],
  },
  listStyleImage: {
    type: ImageSourcePicker,
    stringify: stringifyImageSource,
    label: 'List Style Image',
  },
  listStylePosition: {
    type: 'keyword',
    keywords: ['inside', 'outside'],
  },
  listStyleType: {
    type: 'keyword',
    keywords: [
      'none',
      'disc',
      'circle',
      'square',
      'decimal',
      'georgian',
      'trad-chinese-informal',
      'kannada',
      'custom-counter-style',
    ],
  },
  lineHeight: {
    type: 'length',
    percentage: true,
    number: true,
    range: { number: [0, 2] },
    keywords: ['normal'],
  },
  margin: {
    type: 'length',
    percentage: true,
  },
  marginTop: {
    type: 'length',
    percentage: true,
  },
  marginLeft: {
    type: 'length',
    percentage: true,
  },
  marginBottom: {
    type: 'length',
    percentage: true,
  },
  marginRight: {
    type: 'length',
    percentage: true,
  },
  maskBorderMode: {
    type: 'keyword',
    keywords: ['luminance', 'alpha'],
  },
  maskBorderSource: {
    type: ImageSourcePicker,
    stringify: stringifyImageSource,
    label: 'Mask Border Source',
  },
  maskBorderWidth: {
    // TODO: add multiple sides (top, bottom, left, right)
    type: 'length',
    percentage: true,
    number: true,
    keywords: ['auto'],
  },
  maskBorderRepeat: {
    type: 'keyword',
    keywords: [
      'stretch',
      'repeat',
      'round',
      'space',
      'round stretch',
      'round repeat',
      'round space',
      'stretch repeat',
      'stretch round',
      'stretch space',
      'repeat stretch',
      'repeat round',
      'repeat space',
      'space stretch',
      'space round',
      'space repeat',
    ],
  },
  maskClip: {
    type: 'keyword',
    keywords: [
      'content-box',
      'padding-box',
      'border-box',
      'margin-box',
      'fill-box',
      'stroke-box',
      'view-box',
      'no-clip',
    ],
  },
  maskComposite: {
    // TODO should be an array of values
    type: 'keyword',
    keywords: ['add', 'subtract', 'intersect', 'exclude'],
  },
  maskImage: {
    type: ImageSourcePicker,
    stringify: stringifyImageSource,
    label: 'Mask Image',
  },
  maskMode: {
    type: 'keyword',
    keywords: [
      'alpha',
      'luminance',
      'match-source',
      'alpha, luminance',
      'alpha, match-source',
      'alpha, match-source, luminance',
      'match-source, luminance',
    ],
  },
  maskOrigin: {
    type: 'keyword',
    keywords: [
      'content-box',
      'padding-box',
      'border-box',
      'margin-box',
      'fill-box',
      'stroke-box',
      'view-box',
      'padding-box, content-box',
      'view-box, fill-box, border-box',
    ],
  },
  maskPosition: { type: 'position' },
  maskRepeat: {
    type: 'keyword',
    keywords: [
      'repeat-x',
      'repeat-y',
      'repeat',
      'space',
      'round',
      'no-repeat',
      'repeat space',
      'repeat repeat',
      'round space',
      'no-repeat round',
    ],
  },
  maskType: {
    type: 'keyword',
    keywords: ['luminance', 'alpha'],
  },
  // TODO: add fit-content function
  maxBlockSize: {
    type: 'length',
    percentage: true,
    keywords: ['none', 'max-content', 'min-content'],
  },
  maxHeight: {
    type: 'length',
    percentage: true,
    keywords: ['none', 'max-content', 'min-content', 'auto'],
  },
  maxInlineSize: {
    type: 'length',
    percentage: true,
    keywords: ['none', 'max-content', 'min-content'],
  },
  // TODO: add fit-content function
  maxWidth: {
    type: 'length',
    percentage: true,
    keywords: ['none', 'max-content', 'min-content', 'auto'],
  },
  minHeight: {
    type: 'length',
    percentage: true,
    keywords: ['max-content', 'min-content', 'auto'],
  },
  minBlockSize: {
    type: 'length',
    percentage: true,
    keywords: ['max-content', 'min-content'],
  },
  minInlineSize: {
    type: 'length',
    percentage: true,
    keywords: ['max-content', 'min-content'],
  },
  // TODO: add fit-content function
  minWidth: {
    type: 'length',
    percentage: true,
    keywords: ['max-content', 'min-content', 'auto'],
  },
  mixBlendMode: {
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
  offsetAnchor: {
    type: 'position',
    keywords: ['auto'], // TODO the keyword isn't being populated currently
  },
  objectFit: {
    type: 'keyword',
    keywords: ['contain', 'cover', 'fill', 'none', 'scale-down'],
  },
  objectPosition: {
    type: 'position',
  },
  offsetDistance: {
    type: 'length',
    percentage: true,
  },
  opacity: {
    type: 'percentage',
    defaultValue: 1,
  },
  order: {
    type: 'integer',
    defaultValue: 0,
  },
  orphans: {
    type: 'integer',
    defaultValue: 2,
    range: { number: [1, 10] },
  },
  outlineColor: {
    type: 'color',
    keywords: ['invert'],
  },
  outlineOffset: {
    type: 'length',
    percentage: true,
  },
  outlineStyle: {
    type: 'keyword',
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
  },
  outlineWidth: {
    type: 'length',
    percentage: true,
    keywords: ['thin', 'medium', 'thick'],
  },
  overflow: {
    type: 'keyword',
    keywords: ['visible', 'hidden', 'clip', 'scroll', 'auto', 'hidden visible'],
  },
  overflowAnchor: {
    type: 'keyword',
    keywords: ['auto', 'none'],
  },
  overflowBlock: {
    type: 'keyword',
    keywords: ['visible', 'hidden', 'scroll', 'auto'],
  },
  overflowClipMargin: {
    // TODO: Add ranges
    type: 'length',
    percentage: true,
  },
  overflowInline: {
    type: 'keyword',
    keywords: ['visible', 'hidden', 'scroll', 'auto'],
  },
  overflowWrap: {
    type: 'keyword',
    keywords: ['normal', 'break-word', 'anywhere'],
  },
  overflowX: {
    type: 'keyword',
    keywords: ['visible', 'hidden', 'clip', 'scroll', 'auto'],
  },
  overflowY: {
    type: 'keyword',
    keywords: ['visible', 'hidden', 'clip', 'scroll', 'auto'],
  },
  overscrollBehavior: {
    type: 'keyword',
    keywords: ['auto', 'contain', 'none', 'auto contain'],
  },
  overscrollBehaviorBlock: {
    type: 'keyword',
    keywords: ['auto', 'contain', 'none'],
  },
  overscrollBehaviorInline: {
    type: 'keyword',
    keywords: ['auto', 'contain', 'none'],
  },
  overscrollBehaviorX: {
    type: 'keyword',
    keywords: ['auto', 'contain', 'none'],
  },
  overscrollBehaviorY: {
    type: 'keyword',
    keywords: ['auto', 'contain', 'none'],
  },
  padding: {
    type: 'length',
    percentage: true,
  },
  paddingTop: {
    type: 'length',
    percentage: true,
  },
  paddingLeft: {
    type: 'length',
    percentage: true,
  },
  paddingBottom: {
    type: 'length',
    percentage: true,
  },
  paddingRight: {
    type: 'length',
    percentage: true,
  },
  perspective: {
    type: 'length',
    keywords: ['none'],
  },
  perspectiveOrigin: {
    type: PerspectiveOriginInput,
    stringify: stringifyPerspectiveOrigin,
  },
  placeItems: {
    type: 'keyword',
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
  },
  placeSelf: {
    type: 'keyword',
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
  },
  pointerEvents: {
    type: 'keyword',
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
  },
  position: {
    type: 'keyword',
    keywords: ['static', 'relative', 'asbolsute', 'fixed', 'sticky'],
  },
  printColorAdjust: {
    type: 'keyword',
    keywords: ['economy', 'exact'],
  },
  resize: {
    type: 'keyword',
    keywords: ['none', 'both', 'horizontal', 'vertical', 'block', 'inline'],
  },
  right: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
  },
  rowGap: {
    type: 'length',
    percentage: true,
  },
  rubyAlign: {
    type: 'keyword',
    keywords: ['start', 'center', 'space-between', 'space-around'],
  },
  rubyPosition: {
    type: 'keyword',
    keywords: ['over', 'under', 'inter-character', 'alternate'],
  },
  scrollBehavior: {
    type: 'keyword',
    keywords: ['auto', 'smooth'],
  },
  scrollbarColor: {
    type: 'color',
    keywords: ['auto', 'currentcolor', 'transparent'],
  },
  scrollbarGutter: {
    type: 'keyword',
    keywords: ['auto', 'stable', 'stable both-edges'],
  },
  scrollbarWidth: {
    type: 'keyword',
    keywords: ['auto', 'thin', 'none'],
  },
  scrollSnapType: {
    type: 'keyword',
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
  },
  shapeMargin: {
    type: 'length',
    percentage: true,
  },
  strokeOpacity: {
    type: 'percentage',
    defaultValue: 1,
  },
  tabSize: {
    type: 'length',
    number: true,
  },
  tableLayout: {
    // TODO: Only have control appear when display: table
    type: 'keyword',
    keywords: ['auto', 'fixed'],
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
  textAlignLast: {
    type: 'keyword',
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
  },
  textCombineUpright: {
    // note: there is a special `digits <number>` syntax that is only supported by Internet Explorer??
    type: 'keyword',
    keywords: ['none', 'all'],
  },
  textDecoration: {
    type: TextDecorationInput,
    stringify: stringifyTextDecoration,
  },
  textDecorationColor: {
    type: 'color',
    keywords: ['currentcolor', 'transparent'],
  },
  textDecorationLine: {
    type: 'keyword',
    keywords: textDecorationLines,
  },
  textDecorationThickness: {
    //TODO: Add value ranges
    type: 'length',
    percentage: true,
    keywords: ['auto', 'from-font'],
  },
  textDecorationSkipInk: {
    type: 'keyword',
    keywords: ['none', 'auto', 'all'],
  },
  textDecorationStyle: {
    type: 'keyword',
    keywords: textDecorationStyles,
  },
  textEmphasisColor: {
    type: 'color',
    keywords: ['currentcolor', 'transparent'],
  },
  textEmphasisPosition: {
    type: 'keyword',
    keywords: [
      'over right',
      'over left',
      'under right',
      'under left',
      'left over',
      'right under',
      'left under',
    ],
  },
  textEmphasisStyle: {
    // TODO: Add string input option
    type: 'keyword',
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
  },
  textIndent: {
    type: 'length',
    percentage: true,
  },
  textJustify: {
    type: 'keyword',
    keywords: ['none', 'auto', 'inter-word', 'inter-character', 'distribute'],
  },
  textOrientation: {
    type: 'keyword',
    keywords: [
      'mixed',
      'upright',
      'sideways-right',
      'sideways',
      'use-glyph-orientation',
    ],
  },
  textOverflow: {
    // TODO firefox supports two-value syntax and there are more experimental values
    // but these are supported by all browsers
    type: 'keyword',
    keywords: ['clip', 'ellipsis'],
  },
  textRendering: {
    type: 'keyword',
    keywords: [
      'auto',
      'optimizeSpeed',
      'optimzeLegibility',
      'geometricPrecision',
    ],
  },
  textShadow: {
    type: TextShadowPicker,
    stringify: stringifyTextShadow,
  },
  textTransform: {
    type: 'keyword',
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
    type: 'keyword',
    keywords: ['auto', 'under', 'left', 'right', 'under left', 'right under'],
  },
  top: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
  },
  touchAction: {
    type: 'keyword',
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
  },
  transform: {
    type: TransformPicker,
    stringify: stringifyTransform,
  },
  transformBox: {
    type: 'keyword',
    keywords: [
      'content-box',
      'border-box',
      'fill-box',
      'stroke-box',
      'view-box',
    ],
  },
  transformStyle: {
    type: 'keyword',
    keywords: ['flat', 'preserve-3d'],
  },
  // TODO array of time values
  transitionDelay: { type: 'time' },
  transitionDuration: { type: 'time' },
  // TODO this should be a combobox
  transitionProperty: { type: 'keyword', keywords: ANIMATABLE_PROPERTIES },
  transitionTimingFunction: {
    type: EasingFunctionPicker,
    stringify: stringifyEasingFunction,
  },
  unicodeBidi: {
    type: 'keyword',
    keywords: [
      'normal',
      'embed',
      'isolate',
      'bidi-override',
      'isolate-override',
      'plaintext',
    ],
  },
  userSelect: {
    type: 'keyword',
    keywords: ['none', 'auto', 'text', 'contain', 'all'],
  },
  verticalAlign: {
    type: 'length',
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
  widows: {
    type: 'integer',
    defaultValue: 2,
    range: { number: [1, Infinity] },
  },
  width: {
    type: 'length',
    percentage: true,
    keywords: ['max-content', 'min-content', 'auto'],
    defaultValue: '100%',
  },
  wordBreak: {
    type: 'keyword',
    keywords: ['normal', 'break-all', 'keep-all', 'break-word'],
  },
  wordSpacing: {
    type: 'length',
    percentage: true,
    keywords: ['normal'],
  },
  wordWrap: {
    type: 'keyword',
    keywords: ['normal', 'break-word', 'anywhere'],
  },
  writingMode: {
    type: 'keyword',
    keywords: ['horizontal-tb', 'vertical-rl', 'vertical-lr'],
  },
  zIndex: {
    type: 'integer',
    keywords: ['auto'],
  },
}

export const unsupportedProperties = uniqBy(allProperties, 'property').filter(
  (property) => {
    return !properties[camelCase(property.property)]
  }
)
