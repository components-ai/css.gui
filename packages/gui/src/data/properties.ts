import { ComponentType } from 'react'
import BoxShadowPicker from '../components/inputs/BoxShadow/field'
import { stringifyBoxShadow } from '../components/inputs/BoxShadow/stringify'
import EasingFunctionPicker from '../components/inputs/EasingFunction/picker'
import { stringifyEasingFunction } from '../components/inputs/EasingFunction/stringify'
import FilterPicker from '../components/inputs/Filter/field'
import { stringifyFilter } from '../components/inputs/Filter/stringify'
import TextShadowPicker from '../components/inputs/TextShadow/field'
import { FontFamily } from '../components/inputs/FontFamily'
import { stringifyTextShadow } from '../components/inputs/TextShadow/stringify'
import TransformPicker from '../components/inputs/Transform/field'
import { stringifyTransform } from '../components/inputs/Transform/stringify'
import {
  AbsoluteLengthUnits,
  FontRelativeLengthUnits,
  ViewportPercentageLengthUnits,
  PercentageLengthUnits,
} from '../types/css'
import { ANIMATABLE_PROPERTIES } from './animatable'
import {
  stringifyTextDecoration,
  TextDecorationInput,
  textDecorationLines,
  textDecorationStyles,
} from '../components/inputs/TextDecoration'
import { UnitSteps } from '../lib'
import ImageSourcePicker from '../components/inputs/ImageSource/field'
import { stringifyImageSource } from '../components/inputs/ImageSource/stringify'
import { allProperties } from './css-properties'
import { camelCase, uniqBy } from 'lodash-es'
import { positiveRanges, UnitRanges } from './ranges'
import TransitionInput from '../components/inputs/Transition/field'
import { stringifyTransitionList } from '../components/inputs/Transition/stringify'
import BackgroundInput from '../components/inputs/Background/field'
import { stringifyBackgroundList } from '../components/inputs/Background/stringify'
import MaskInput from '../components/inputs/Mask/field'
import { stringifyMaskList } from '../components/inputs/Mask/stringify'
import AnimationInput from '../components/inputs/Animation/field'
import { stringifyAnimationList } from '../components/inputs/Animation/stringify'
import {
  stringifyStrokeDasharray,
  StrokeDasharrayInput,
} from '../components/inputs/StrokeDasharray'
import TrackSizeListInput from '../components/inputs/TrackSize/field'
import { stringifyTrackSizeList } from '../components/inputs/TrackSize/stringify'
import GridTrackListInput from '../components/inputs/GridTrack/field'
import { stringifyGridTrackList } from '../components/inputs/GridTrack/stringify'
import { BgSizeInput, stringifyBgSize } from '../components/inputs/BgSizeInput'
import {
  stringifyTransformOrigin,
  TransformOriginInput,
} from '../components/inputs/TransformOrigin'
import { GridLineInput, stringifyGridLine } from '../components/inputs/GridLine'
import {
  ScrollSnapAlignInput,
  stringifyScrollSnapAlign,
} from '../components/inputs/ScrollSnapAlign'
import {
  BorderSpacingInput,
  stringifyBorderSpacing,
} from '../components/inputs/BorderSpacing'
import { ClipPathInput, stringifyClipPath } from '../components/inputs/ClipPath'
import {
  ShapeOutsideInput,
  stringifyShapeOutside,
} from '../components/inputs/ShapeOutside'
import { NumberPercentageInput } from '../components/inputs/NumberPercentageInput'
import {
  OffsetPathInput,
  stringifyOffsetPath,
} from '../components/inputs/OffsetPath'
import { AngleInput } from '../components/inputs/AngleInput'
import { EditorPropsWithLabel } from '../types/editor'
import { DEFAULT_ANIMATION } from '../components/inputs/Animation/types'
import { DEFAULT_TRANSITION } from '../components/inputs/Transition/types'
import { DEFAULT_BOX_SHADOW } from '../components/inputs/BoxShadow/types'
import { DEFAULT_TEXT_SHADOW } from '../components/inputs/TextShadow/types'

type PropertyData = {
  type: string | ComponentType<EditorPropsWithLabel<any>>
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

export const properties: Record<string, PropertyData> = {
  accentColor: {
    type: 'color',
    defaultValue: 'tomato',
    keywords: ['auto', 'currentcolor', 'transparent'],
  },
  alignContent: {
    type: 'keyword',
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
    type: 'keyword',
    responsive: true,
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
    defaultValue: 'center',
  },
  alignmentBaseline: { // Can be used with tspan tref altGlyph and textPath SVG elements
    type: 'keyword',
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
    type: 'keyword',
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
    type: 'keyword',
    keywords: [],
  },
  animation: {
    type: AnimationInput,
    stringify: stringifyAnimationList,
    defaultValue: [DEFAULT_ANIMATION],
  },
  // TODO array of time values
  animationDelay: { 
    type: 'time',
    defaultValue: {
      value: 0,
      unit: 'ms'
    }
  },
  animationDirection: {
    type: 'keyword',
    keywords: ['normal', 'reverse', 'alternate', 'alternate-reverse'],
    defaultValue: 'normal',
  },
  animationDuration: { 
    type: 'time',
    defaultValue: {
      value: 500,
      unit: 'ms',
    }
  },
  animationFillMode: {
    type: 'keyword',
    keywords: ['none', 'forwards', 'backwards', 'both'],
    defaultValue: 'forwards',
  },
  animationIterationCount: {
    type: 'number',
    keywords: ['infinite'],
    range: { number: [0, Infinity] },
    defaultValue: 'infinite',
  },
  animationPlayState: {
    type: 'keyword',
    keywords: ['running', 'paused'],
    defaultValue: 'running',
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
    defaultValue: 'none',
  },
  backfaceVisibility: {
    type: 'keyword',
    keywords: ['visible', 'hidden'],
    defaultValue: 'hidden',
  },
  // TODO: Add defaultValue
  background: {
    type: BackgroundInput,
    stringify: stringifyBackgroundList,
  },
  backgroundAttachment: {
    type: 'keyword',
    keywords: ['scroll', 'fixed', 'local', 'local, scroll', 'scroll, local'],
    defaultValue: 'scroll',
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
    defaultValue: 'overlay',
  },
  backgroundColor: {
    type: 'color',
    defaultValue: 'tomato',
    keywords: ['currentcolor', 'transparent'],
  },
  backgroundClip: {
    type: 'keyword',
    keywords: [
      'border-box',
      'padding-box',
      'content-box',
      'text',
      'content-box, border-box',
    ],
    defaultValue: 'border-box',
  },
  // TODO: Add defaultValue
  backgroundImage: {
    type: ImageSourcePicker,
    stringify: stringifyImageSource,
    label: 'Background Image',
  },
  backgroundOrigin: {
    type: 'keyword',
    keywords: ['border-box', 'padding-box', 'content-box'],
    defaultValue: 'border-box',
  },
  backgroundPosition: {
    type: 'position',
  },
  backgroundPositionX: {
    // TODO: Add side relative values option and multiple values option
    type: 'length',
    percentage: true,
    keywords: ['top', 'left', 'center'],
    defaultValue: 'center',
  },
  backgroundPositionY: {
    // TOO: Add side relative values option and multiple values option
    type: 'length',
    percentage: true,
    keywords: ['top', 'center', 'bottom'],
    defaultValue: 'center',
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
    defaultValue: {
      value: 6,
      unit: 'px',
    }
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
    defaultValue: 'no-repeat',
  },
  backgroundSize: {
    // TODO: Add two value syntax
    type: 'length',
    percentage: true,
    keywords: ['cover', 'contain', 'auto'],
    range: {
      [AbsoluteLengthUnits.Px]: [0, 128],
      [FontRelativeLengthUnits.Em]: [0, 8],
      [FontRelativeLengthUnits.Rem]: [0, 8],
      [PercentageLengthUnits.Pct]: [0.1, 100],
    },
    defaultValue: 'cover',
  },
  blockSize: {
    // TODO: Add fit-content function
    type: 'length',
    percentage: true,
    keywords: ['max-content', 'min-content', 'auto'],
    defaultValue: 'auto',
  },
  borderCollapse: {
    type: 'keyword',
    keywords: ['collapse', 'separate'],
    defaultValue: 'collapse',
  },
  // TODO: 4-positional arguments separated by spaces
  borderImageOutset: {
    type: 'length',
    number: true,
    defaultValue: {
      value:  4,
      unit: 'px',
    }
  },
  // TODO: 2-positional arguments separated by spaces
  borderImageRepeat: {
    type: 'keyword',
    keywords: ['stretch', 'repeat', 'round', 'space'],
    defaultValue: 'stretch',
  },
  // TODO: Add defaultValue
  borderImageSlice: {
    type: 'length',
    number: true,
    percentage: true,
    range: { number: [-1, 2000] },
  },
  // TODO this actually can only accept *one* image value, not an array
  // TODO: Add defaultValue
  borderImageSource: {
    type: ImageSourcePicker,
    stringify: stringifyImageSource,
    label: 'Border Image',
  },
  // TODO this can accept multiple values
  borderImageWidth: {
    type: 'length',
    keywords: ['thin', 'medium', 'thick'],
    defaultValue: {
      value: 4,
      unit: 'px',
    }
  },
  borderBottomColor: {
    type: 'color',
    keywords: ['currentcolor', 'transparent'],
    defaultValue: '#6465ff',
  },
  borderBottomLeftRadius: {
    type: 'multiLength',
    dimensions: 2,
  },
  borderBottomRightRadius: {
    type: 'multiLength',
    dimensions: 2,
  },
  borderBottomStyle: {
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
    defaultValue: 'solid',
  },
  borderBottomWidth: {
    type: 'length',
    keywords: ['thin', 'medium', 'thick'],
    range: {
      [AbsoluteLengthUnits.Px]: [0, 512],
      [FontRelativeLengthUnits.Em]: [0, 16],
      [FontRelativeLengthUnits.Rem]: [0, 16],
      [ViewportPercentageLengthUnits.Vh]: [0, 100],
      [ViewportPercentageLengthUnits.Vw]: [0, 100],
      [PercentageLengthUnits.Pct]: [0.1, 100],
    },
    defaultValue: {
      value: 2,
      unit: 'px',
    }
  },
  borderLeftColor: {
    type: 'color',
    keywords: ['currentcolor', 'transparent'],
    defaultValue: '#6465ff',
  },
  borderLeftStyle: {
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
    defaultValue: 'solid',
  },
  borderLeftWidth: {
    type: 'length',
    keywords: ['thin', 'medium', 'thick'],
    range: {
      [AbsoluteLengthUnits.Px]: [0, 512],
      [FontRelativeLengthUnits.Em]: [0, 16],
      [FontRelativeLengthUnits.Rem]: [0, 16],
      [ViewportPercentageLengthUnits.Vh]: [0, 100],
      [ViewportPercentageLengthUnits.Vw]: [0, 100],
      [PercentageLengthUnits.Pct]: [0.1, 100],
    },
  },
  borderRightColor: {
    type: 'color',
    keywords: ['currentcolor', 'transparent'],
    defaultValue: '#6465ff',
  },
  borderRightStyle: {
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
    defaultValue: 'solid',
  },
  borderRightWidth: {
    type: 'length',
    keywords: ['thin', 'medium', 'thick'],
    range: {
      [AbsoluteLengthUnits.Px]: [0, 512],
      [FontRelativeLengthUnits.Em]: [0, 16],
      [FontRelativeLengthUnits.Rem]: [0, 16],
      [ViewportPercentageLengthUnits.Vh]: [0, 100],
      [ViewportPercentageLengthUnits.Vw]: [0, 100],
      [PercentageLengthUnits.Pct]: [0.1, 100],
    },
  },
  borderTopColor: {
    type: 'color',
    keywords: ['currentcolor', 'transparent'],
    defaultValue: '#6465ff',
  },
  borderTopLeftRadius: {
    type: 'multiLength',
    dimensions: 2,
  },
  borderTopRightRadius: {
    type: 'multiLength',
    dimensions: 2,
  },
  borderTopStyle: {
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
    defaultValue: 'solid',
  },
  borderTopWidth: {
    type: 'length',
    keywords: ['thin', 'medium', 'thick'],
    range: {
      [AbsoluteLengthUnits.Px]: [0, 512],
      [FontRelativeLengthUnits.Em]: [0, 16],
      [FontRelativeLengthUnits.Rem]: [0, 16],
      [ViewportPercentageLengthUnits.Vh]: [0, 100],
      [ViewportPercentageLengthUnits.Vw]: [0, 100],
      [PercentageLengthUnits.Pct]: [0.1, 100],
    },
  },
  borderColor: {
    type: 'color',
    keywords: ['currentcolor', 'transparent'],
  },
  borderSpacing: {
    type: BorderSpacingInput,
    stringify: stringifyBorderSpacing,
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
    defaultValue: 'solid',
  },
  borderWidth: {
    type: 'length',
    keywords: ['thin', 'medium', 'thick'],
    range: {
      [AbsoluteLengthUnits.Px]: [0, 512],
      [FontRelativeLengthUnits.Em]: [0, 16],
      [FontRelativeLengthUnits.Rem]: [0, 16],
      [ViewportPercentageLengthUnits.Vh]: [0, 100],
      [ViewportPercentageLengthUnits.Vw]: [0, 100],
      [PercentageLengthUnits.Pct]: [0.1, 100],
    },
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
    defaultValue: [DEFAULT_BOX_SHADOW],
  },
  boxSnap: {
    type: 'keyword',
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
    type: 'keyword',
    keywords: ['border-box', 'content-box'],
    defaultValue: 'border-box',
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
    defaultValue: '#6465ff',
    keywords: ['currentcolor', 'transparent'],
  },
  clear: {
    type: 'keyword',
    keywords: ['none', 'left', 'right', 'both', 'inline-start', 'inline-end'],
    defaultValue: 'both',
  },
  clipPath: {
    type: ClipPathInput,
    stringify: stringifyClipPath,
  },
  clipRule: {
    // SVG
    type: 'keyword',
    keywords: ['nonzero', 'evenodd'],
  },
  color: {
    type: 'color',
    keywords: ['currentcolor', 'transparent'],
    defaultValue: '#6465ff',
  },
  colorAdjust: {
    type: 'keyword',
    keywords: ['economy', 'exact'],
    defaultValue: 'exact',
  },
  colorInterpolationFilters: {
    type: 'keyword',
    keywords: ['auto', 'sRGB', 'linearRGB'],
    defaultValue: 'auto',
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
    defaultValue: 0,
    range: {
      [AbsoluteLengthUnits.Px]: [0, 128],
      [FontRelativeLengthUnits.Em]: [0, 8],
      [FontRelativeLengthUnits.Rem]: [0, 8],
      [ViewportPercentageLengthUnits.Vh]: [0, 100],
      [ViewportPercentageLengthUnits.Vw]: [0, 100],
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
    defaultValue: 'visible',
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
    defaultValue: 'pointer',
  },
  direction: {
    type: 'keyword',
    keywords: ['ltr', 'rtl'],
    defaultValue: 'ltr',
  },
  display: {
    type: 'keyword',
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
    type: 'keyword',
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
  },
  emptyCells: {
    type: 'keyword',
    keywords: ['show', 'hide'],
  },
  fill: {
    type: 'color',
    keywords: ['none', 'context-fill', 'context-stroke'],
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
    defaultValue: 'auto'
  },
  flexDirection: {
    type: 'keyword',
    responsive: true,
    keywords: ['row', 'row-reverse', 'column', 'column-reverse'],
    defaultValue: 'row'
  },
  flexFlow: {
    type: 'keyword',
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
    defaultValue: 'row wrap'
  },
  flexGrow: {
    type: 'number',
    range: { number: [0, Infinity] },
    defaultValue: 0,
  },
  flexShrink: {
    type: 'number',
    range: { number: [0, Infinity] },
    defaultValue: 1,
  },
  flexWrap: {
    type: 'keyword',
    responsive: true,
    keywords: ['nowrap', 'wrap', 'wrap-reverse'],
    defaultValue: 'wrap',
  },
  float: {
    type: 'keyword',
    keywords: ['left', 'right', 'none', 'inline-start', 'inline-end'],
    defaultValue: 'none',
  },
  floatDefer: {
    type: 'number',
    keywords: ['last', 'none'],
    defaultValue: 'none',
    range: { number: [0, Infinity] },
  },
  floatOffset: {
    type: 'length',
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
    }
  },
  floatReference: {
    type: 'keyword',
    keywords: ['inline', 'column', 'region', 'page'],
  },
  floodColor: {
    type: 'color',
    keywords: ['currentcolor', 'transparent'],
    defaultValue: '#6465ff',
  },
  floodOpacity: {
    type: 'percentage',
    defaultValue: {
      value: 100,
      unit: '%'
    },
  },
  fontFamily: {
    type: FontFamily,
    dependantProperties: ['fontStyle', 'fontWeight', 'fontVariationSettings'],
    defaultValue: 'Inter',
  },
  fontKerning: {
    type: 'keyword',
    keywords: ['auto', 'normal', 'none'],
    defaultValue: 'auto',
  },
  fontOpticalSizing: {
    type: 'keyword',
    keywords: ['auto', 'none'],
    defaultValue: 'auto',
  },
  fontSize: {
    type: 'length',
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
    }
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
    defaultValue: 'ultra-condensed', 
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
  fontWeight: {
    type: 'keyword',
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
    type: 'keyword',
    keywords: ['auto', 'none'],
  },
  gridAutoColumns: {
    type: TrackSizeListInput,
    stringify: stringifyTrackSizeList,
  },
  gridAutoFlow: {
    type: 'keyword',
    keywords: ['row', 'column', 'dense', 'row dense', 'column dense'],
  },
  gridAutoRows: {
    type: TrackSizeListInput,
    stringify: stringifyTrackSizeList,
  },
  gridColumnStart: {
    type: GridLineInput,
    stringify: stringifyGridLine,
  },
  gridColumnEnd: {
    type: GridLineInput,
    stringify: stringifyGridLine,
  },
  gridRowStart: {
    type: GridLineInput,
    stringify: stringifyGridLine,
  },
  gridRowEnd: {
    type: GridLineInput,
    stringify: stringifyGridLine,
  },
  gridTemplateColumns: {
    type: GridTrackListInput,
    stringify: stringifyGridTrackList,
  },
  gridTemplateRows: {
    type: GridTrackListInput,
    stringify: stringifyGridTrackList,
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
    defaultValue: 'none',
  },
  height: {
    type: 'length',
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
    type: 'string',
    keywords: ['auto'],
  },
  hyphens: {
    type: 'keyword',
    keywords: ['none', 'manual', 'auto'],
    defaultValue: 'auto',
  },
  imageOrientation: {
    // NOTE: there is an <angle> version that is deprecated in favor of rotate()
    type: 'keyword',
    keywords: ['none', 'from-image'],
    defaultValue: 'from-image',
  },
  initialLetterAlign: {
    type: 'keyword',
    keywords: ['auto', 'alphabetic', 'hanging', 'ideographic'],
    defaultValue: 'auto',
  },
  initialLetterWrap: {
    type: 'length',
    percentage: true,
    keywords: ['none', 'first', 'all', 'grid'],
    defaultValue: 'none',
  },
  imageRendering: {
    type: 'keyword',
    keywords: ['auto', 'crisp-edges', 'pixelated'],
    defaultValue: 'auto',
  },
  isolation: {
    type: 'keyword',
    keywords: ['auto', 'isolate'],
  },
  justifyContent: {
    type: 'keyword',
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
    defaultValue: 'center',
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
    defaultValue: 'center',
  },
  left: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
    defaultValue: {
      value: 0,
      unit: 'px',
    }
  },
  letterSpacing: {
    type: 'length',
    percentage: true,
    keywords: ['normal'],
    defaultValue: 'normal',
  },
  lightingColor: {
    type: 'color',
    keywords: ['currentcolor', 'transparent'],
  },
  lineBreak: {
    type: 'keyword',
    keywords: ['auto', 'loose', 'normal', 'strict', 'anywhere'],
    defaultValue: 'auto',
  },
  listStyleImage: {
    // TODO only accepts a single image
    type: ImageSourcePicker,
    stringify: stringifyImageSource,
    label: 'List Style Image',
  },
  listStylePosition: {
    type: 'keyword',
    keywords: ['inside', 'outside'],
    defaultValue: 'outside',
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
    defaultValue: 'disc',
  },
  lineGrid: {
    type: 'keyword',
    keywords: ['match-parent', 'create'],
  },
  lineHeight: {
    type: 'length',
    percentage: true,
    number: true,
    range: { number: [0, 2] },
    keywords: ['normal'],
    steps: { number: 0.05 },
    defaultValue: {
      value: 1.5,
      unit: 'number',
    }
  },
  lineHeightStep: {
    type: 'length',
    percentage: true,
  },
  lineSnap: {
    type: 'keyword',
    keywords: ['none', 'baseline', 'contain'],
    defaultValue: 'none',
  },
  margin: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
    defaultValue: {
      value: 0,
      unit: 'px',
    }
  },
  marginTop: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
    defaultValue: {
      value: 0,
      unit: 'px',
    }
  },
  marginLeft: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
    defaultValue: {
      value: 0,
      unit: 'px',
    }
  },
  marginBottom: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
    defaultValue: {
      value: 0,
      unit: 'px',
    }
  },
  marginRight: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
    defaultValue: {
      value: 0,
      unit: 'px',
    }
  },
  marqueeDirection: {
    type: 'keyword',
    keywords: ['forward', 'reverse'],
    defaultValue: 'forward',
  },
  marqueeLoop: {
    type: 'integer',
    range: { number: [1, Infinity] },
    defaultValue: 'infinite',
  },
  marqueeStyle: {
    type: 'keyword',
    keywords: ['scroll', 'slide', 'alternate'],
    defaultValue: 'scroll',
  },
  marqueeSpeed: {
    type: 'keyword',
    keywords: ['slow', 'normal', 'fast'],
    defaultValue: 'slow',
  },
  mask: {
    type: MaskInput,
    stringify: stringifyMaskList,
  },
  maskBorderMode: {
    type: 'keyword',
    keywords: ['luminance', 'alpha'],
    defaultValue: 'luminance',
  },
  maskBorderSource: {
    type: ImageSourcePicker,
    stringify: stringifyImageSource,
    label: 'Mask Border Source',
  },
  maskBorderSize: {
    type: BgSizeInput,
    stringify: stringifyBgSize,
  },
  maskBorderWidth: {
    // TODO: add multiple sides (top, bottom, left, right)
    type: 'length',
    percentage: true,
    number: true,
    keywords: ['auto'],
    defaultValue: {
      value: 8,
      unit: 'px',
    }
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
    defaultValue: 'stretch',
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
    defaultValue: 'border-box',
  },
  maskComposite: {
    // TODO should be an array of values
    type: 'keyword',
    keywords: ['add', 'subtract', 'intersect', 'exclude'],
    defaultValue: 'add',
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
    defaultValue: 'luminance',
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
    defaultValue: 'border-box', 
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
    defaultValue: 'no-repeat',
  },
  maskSize: {
    type: BgSizeInput,
    stringify: stringifyBgSize,
  },
  maskType: {
    type: 'keyword',
    keywords: ['luminance', 'alpha'],
    defaultValue: 'alpha',
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
    defaultValue: {
      value: 100,
      unit: '%',
    }
  },
  maxInlineSize: {
    type: 'length',
    percentage: true,
    keywords: ['none', 'max-content', 'min-content'],
  },
  maxLines: {
    type: 'number',
    keywords: ['none'],
    range: { number: [0, 9999] },
  },
  // TODO: add fit-content function
  maxWidth: {
    type: 'length',
    percentage: true,
    keywords: ['none', 'max-content', 'min-content', 'auto'],
    defaultValue: {
      value: 100,
      unit: '%',
    }
  },
  minHeight: {
    type: 'length',
    percentage: true,
    keywords: ['max-content', 'min-content', 'auto'],
    defaultValue: {
      value: 48,
      unit: 'px',
    }
  },
  minBlockSize: {
    type: 'length',
    percentage: true,
    keywords: ['max-content', 'min-content'],
    defaultValue: {
      value: 0,
      unit: 'px',
    }
  },
  minInlineSize: {
    type: 'length',
    percentage: true,
    keywords: ['max-content', 'min-content'],
    defaultValue: {
      value: 0,
      unit: 'px',
    }
  },
  // TODO: add fit-content function
  minWidth: {
    type: 'length',
    percentage: true,
    keywords: ['max-content', 'min-content', 'auto'],
    defaultValue: 'auto',
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
    defaultValue: 'overlay',
  },
  offsetAnchor: {
    type: 'position',
    keywords: ['auto'], // TODO the keyword isn't being populated currently
    defaultValue: 'auto',
  },
  offsetDistance: {
    type: 'length',
    percentage: true,
    defaultValue: {
      value: 0,
      unit: 'px',
    }
  },
  offsetPath: {
    type: OffsetPathInput,
    stringify: stringifyOffsetPath,
  },
  offsetRotate: {
    type: AngleInput,
  },
  objectFit: {
    type: 'keyword',
    keywords: ['contain', 'cover', 'fill', 'none', 'scale-down'],
    defaultValue: 'cover',
  },
  objectPosition: {
    type: 'position',
  },
  opacity: {
    type: 'percentage',
    range: {
      [PercentageLengthUnits.Pct]: [0, 100],
    },
    defaultValue: {
      value: 100,
      unit: '%',
    }
  },
  order: {
    type: 'integer',
    defaultValue: 0,
  },
  orphans: {
    type: 'integer',
    range: { number: [1, 10] },
    defaultValue: 2,
  },
  outlineColor: {
    type: 'color',
    keywords: ['invert'],
    defaultValue: '#6465ff',
  },
  outlineOffset: {
    type: 'length',
    percentage: true,
    defaultValue: {
      value: 4,
      unit: 'px',
    }
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
    defaultValue: 'solid',
  },
  outlineWidth: {
    type: 'length',
    percentage: true,
    keywords: ['thin', 'medium', 'thick'],
    defaultValue:{
      value: 2,
      unit: 'px',
    }
  },
  overflow: {
    type: 'keyword',
    keywords: ['visible', 'hidden', 'clip', 'scroll', 'auto', 'hidden visible'],
    defaultValue: 'visible',
  },
  overflowAnchor: {
    type: 'keyword',
    keywords: ['auto', 'none'],
    defaultValue: 'auto',
  },
  overflowBlock: {
    type: 'keyword',
    keywords: ['visible', 'hidden', 'scroll', 'auto'],
    defaultValue: 'auto',
  },
  overflowClipMargin: {
    // TODO: Add ranges
    type: 'length',
    percentage: true,
  },
  overflowInline: {
    type: 'keyword',
    keywords: ['visible', 'hidden', 'scroll', 'auto'],
    defaultValue: 'auto',
  },
  overflowWrap: {
    type: 'keyword',
    keywords: ['normal', 'break-word', 'anywhere'],
    defaultValue: 'normal',
  },
  overflowX: {
    type: 'keyword',
    keywords: ['visible', 'hidden', 'clip', 'scroll', 'auto'],
    defaultValue: 'auto',
  },
  overflowY: {
    type: 'keyword',
    keywords: ['visible', 'hidden', 'clip', 'scroll', 'auto'],
    defaultValue: 'auto',
  },
  overscrollBehavior: {
    type: 'keyword',
    keywords: ['auto', 'contain', 'none', 'auto contain'],
    defaultValue: 'auto',
  },
  overscrollBehaviorBlock: {
    type: 'keyword',
    keywords: ['auto', 'contain', 'none'],
    defaultValue: 'auto',
  },
  overscrollBehaviorInline: {
    type: 'keyword',
    keywords: ['auto', 'contain', 'none'],
    defaultValue: 'auto',
  },
  overscrollBehaviorX: {
    type: 'keyword',
    keywords: ['auto', 'contain', 'none'],
    defaultValue: 'auto',
  },
  overscrollBehaviorY: {
    type: 'keyword',
    keywords: ['auto', 'contain', 'none'],
    defaultValue: 'auto',
  },
  padding: {
    type: 'length',
    percentage: true,
    defaultValue: {
      value: 0,
      unit: 'px',
    }
  },
  paddingTop: {
    type: 'length',
    percentage: true,
    defaultValue: {
      value: 0,
      unit: 'px',
    }
  },
  paddingLeft: {
    type: 'length',
    percentage: true,
    defaultValue: {
      value: 0,
      unit: 'px',
    }
  },
  paddingBottom: {
    type: 'length',
    percentage: true,
    defaultValue: {
      value: 0,
      unit: 'px',
    }
  },
  paddingRight: {
    type: 'length',
    percentage: true,
    defaultValue: {
      value: 0,
      unit: 'px',
    }
  },
  // TODO: Add defaultValue
  perspective: {
    type: 'length',
    keywords: ['none'],
  },
  // TODO: Add defaultValue
  perspectiveOrigin: {
    type: 'position',
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
    defaultValue: 'center',
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
    defaultValue: 'auto center',
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
    defaultValue: 'auto',
  },
  position: {
    type: 'keyword',
    keywords: ['static', 'relative', 'asbolsute', 'fixed', 'sticky'],
    defaultValue: 'static',
  },
  printColorAdjust: {
    type: 'keyword',
    keywords: ['economy', 'exact'],
    defaultValue: 'exact',
  },
  resize: {
    type: 'keyword',
    keywords: ['none', 'both', 'horizontal', 'vertical', 'block', 'inline'],
    defaultValue: 'none',
  },
  right: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
    defaultValue: {
      value: 0,
      unit: 'px',
    }
  },
  rowGap: {
    type: 'length',
    percentage: true,
    range: {
      [AbsoluteLengthUnits.Px]: [0, 128],
      [FontRelativeLengthUnits.Em]: [0, 8],
      [FontRelativeLengthUnits.Rem]: [0, 8],
      [ViewportPercentageLengthUnits.Vh]: [0, 100],
      [ViewportPercentageLengthUnits.Vw]: [0, 100],
      [PercentageLengthUnits.Pct]: [0.1, 100],
    },
    defaultValue: {
      value: 2,
      unit: 'em',
    }
  },
  rubyAlign: {
    type: 'keyword',
    keywords: ['start', 'center', 'space-between', 'space-around'],
    defaultValue: 'start',
  },
  rubyMerge: {
    type: 'keyword',
    keywords: ['separate', 'merge', 'auto'],
    defaultValue: 'auto',
  },
  rubyPosition: {
    type: 'keyword',
    keywords: ['over', 'under', 'inter-character', 'alternate'],
    defaultValue: 'alternate',
  },
  scrollBehavior: {
    type: 'keyword',
    keywords: ['auto', 'smooth'],
    defaultValue: 'auto',
  },
  scrollbarColor: {
    type: 'color',
    keywords: ['auto', 'currentcolor', 'transparent'],
    defaultValue: '#ff33cc',
  },
  scrollbarGutter: {
    type: 'keyword',
    keywords: ['auto', 'stable', 'stable both-edges'],
    defaultValue: 'auto',
  },
  scrollbarWidth: {
    type: 'keyword',
    keywords: ['auto', 'thin', 'none'],
    defaultValue: 'auto',
  },
  // TODO positional syntax
  scrollPadding: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
    defaultValue: 'auto',
  },
  scrollPaddingBlock: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
    defaultValue: 'auto',
  },
  scrollPaddingBlockEnd: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
    defaultValue: 'auto',
  },
  scrollPaddingBlockStart: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
    defaultValue: 'auto',
  },
  scrollPaddingBottom: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
    defaultValue: 'auto',
  },
  scrollPaddingInline: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
    defaultValue: 'auto',
  },
  scrollPaddingInlineEnd: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
    defaultValue: 'auto',
  },
  scrollPaddingInlineStart: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
    defaultValue: 'auto',
  },
  scrollPaddingLeft: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
    defaultValue: 'auto',
  },
  scrollPaddingRight: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
    defaultValue: 'auto',
  },
  scrollPaddingTop: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
    defaultValue: 'auto',
  },
  // TODO: Add defaultValue
  scrollSnapAlign: {
    type: ScrollSnapAlignInput,
    stringify: stringifyScrollSnapAlign,
  },
  scrollSnapStop: {
    type: 'keyword',
    keywords: ['normal', 'always'],
    defaultValue: 'normal',
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
    defaultValue: 'none',
  },
  // TODO: Add defaultValue
  shapeImageThreshold: {
    type: NumberPercentageInput,
  },
  shapeMargin: {
    type: 'length',
    percentage: true,
    defaultValue: {
      value: 0,
      unit: 'px',
    }
  },
  // TODO: Add defaultValue
  shapeOutside: {
    type: ShapeOutsideInput,
    stringify: stringifyShapeOutside,
  },
  stroke: {
    // TODO URL <color> values
    type: 'color',
    keywords: ['none', 'context-fill', 'context-stroke'],
    defaultValue: '#6465ff',
  },
  strokeAlignment: {
    type: 'keyword',
    keywords: ['center', 'inner', 'outer'],
    defaultValue: 'center',
  },
  // TODO: Add defaultValue
  strokeDasharray: {
    type: StrokeDasharrayInput,
    stringify: stringifyStrokeDasharray,
  },
  strokeDashadjust: {
    type: 'keyword',
    keywords: ['none', 'stretch', 'compress', 'dashed', 'gaps'],
    defaultValue: 'none',
  },
  strokeDashcorner: {
    type: 'length',
    percentage: true,
    keywords: ['none'],
    defaultValue: 'none',
  },
  strokeDashoffset: {
    type: 'number',
    percentage: true,
    number: true, // for SVG, raw numbers are counted as pixels
    range: { number: [-9999, 9999] }, // Todo add %
    defaultValue: 0,
  },
  strokeLinejoin: {
    type: 'keyword',
    keywords: ['miter', 'miter-clip', 'round', 'bevel', 'arcs'],
    defaultValue: 'miter',
  },
  strokeLinecap: {
    type: 'keyword',
    keywords: ['butt', 'round', 'square'],
    defaultValue: 'round',
  },
  strokeMiterlimit: {
    type: 'number',
    defaultValue: 4,
    range: { number: [1, 256] }, // 256 seems reasonable but can adjust +/- if needed
  },
  strokeOpacity: {
    type: 'percentage',
    defaultValue: 1,
  },
  strokeWidth: {
    type: 'length',
    percentage: true,
    range: {
      [AbsoluteLengthUnits.Px]: [0, 512],
      [FontRelativeLengthUnits.Em]: [0, 16],
      [FontRelativeLengthUnits.Rem]: [0, 16],
      [PercentageLengthUnits.Pct]: [0.1, 400],
    },
    defaultValue: {
      value: 4,
      unit: 'px',
    }
  },
  // TODO: Add defaultValue
  tabSize: {
    type: 'length',
    number: true,
  },
  tableLayout: {
    // TODO: Only have control appear when display: table
    type: 'keyword',
    keywords: ['auto', 'fixed'],
    defaultValue: 'auto',
  },
  textAlign: {
    type: 'keyword',
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
    type: 'keyword',
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
    defaultValue: 'start',
  },
  textCombineUpright: {
    // note: there is a special `digits <number>` syntax that is only supported by Internet Explorer??
    type: 'keyword',
    keywords: ['none', 'all'],
    defaultValue: 'none',
  },
  // TODO: Add defaultValue
  textDecoration: {
    type: TextDecorationInput,
    stringify: stringifyTextDecoration,
  },
  textDecorationColor: {
    type: 'color',
    keywords: ['currentcolor', 'transparent'],
    defaultValue: '#6465ff',
  },
  textDecorationLine: {
    type: 'keyword',
    keywords: textDecorationLines,
    defaultValue: 'underline',
  },
  textDecorationThickness: {
    //TODO: Add value ranges
    type: 'length',
    percentage: true,
    keywords: ['auto', 'from-font'],
    defaultValue: {
      value: 4,
      unit: 'px',
    }
  },
  textDecorationSkip: {
    type: 'keyword',
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
    type: 'keyword',
    keywords: ['none', 'auto', 'all'],
    defaultValue: 'auto',
  },
  textDecorationStyle: {
    type: 'keyword',
    keywords: textDecorationStyles,
    defaultValue: 'solid',
  },
  textEmphasisColor: {
    type: 'color',
    keywords: ['currentcolor', 'transparent'],
    defaultValue: '#6465ff',
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
    defaultValue: 'over right',
  },
  textEmphasisStyle: {
    type: 'string',
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
    type: 'length',
    percentage: true,
    defaultValue: {
      value: 1,
      unit: 'em',
    }
  },
  textJustify: {
    type: 'keyword',
    keywords: ['none', 'auto', 'inter-word', 'inter-character', 'distribute'],
    defaultValue: 'auto',
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
    defaultValue: 'mixed',
  },
  textOverflow: {
    // TODO firefox supports two-value syntax and there are more experimental values
    // but these are supported by all browsers
    type: 'keyword',
    keywords: ['clip', 'ellipsis'],
    defaultValue: 'clip',
  },
  textRendering: {
    type: 'keyword',
    keywords: [
      'auto',
      'optimizeSpeed',
      'optimzeLegibility',
      'geometricPrecision',
    ],
    defaultValue: 'optimizeLegibility', 
  },
  textShadow: {
    type: TextShadowPicker,
    stringify: stringifyTextShadow,
    defaultValue: [DEFAULT_TEXT_SHADOW],
  },
  textSpaceCollapse: {
    type: 'keyword',
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
    type: 'keyword',
    keywords: [
      'none',
      'capitalize',
      'uppercase',
      'lowercase',
      'full-width',
      'full-size-kana',
    ],
    defaultValue: 'none',
  },
  textUnderlinePosition: {
    type: 'keyword',
    keywords: ['auto', 'under', 'left', 'right', 'under left', 'right under'],
    defaultValue: 'under',
  },
  textWrap: {
    type: 'keyword',
    keywords: ['wrap', 'nowrap', 'balance', 'stable', 'pretty'],
    defaultValue: 'wrap',
  },
  top: {
    type: 'length',
    percentage: true,
    keywords: ['auto'],
    defaultValue: {
      value: 0,
      unit: 'px',
    }
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
    defaultValue: 'auto',
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
    defaultValue: 'view-box',
  },
  transformOrigin: {
    type: TransformOriginInput,
    stringify: stringifyTransformOrigin,
  },
  transformStyle: {
    type: 'keyword',
    keywords: ['flat', 'preserve-3d'],
  },
  transition: {
    type: TransitionInput,
    stringify: stringifyTransitionList,
    defaultValue: [DEFAULT_TRANSITION],
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
    defaultValue: 'normal',
  },
  userSelect: {
    type: 'keyword',
    keywords: ['none', 'auto', 'text', 'contain', 'all'],
    defaultValue: 'auto',
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
    defaultValue: 'baseline',
  },
  visibility: {
    type: 'keyword',
    keywords: ['visible', 'hidden', 'collapse'],
    defaultValue: 'visible',
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
    defaultValue: 'normal',
  },
  widows: {
    type: 'integer',
    range: { number: [1, Infinity] },
    defaultValue: 2,
  },
  width: {
    type: 'length',
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
    type: 'keyword',
    keywords: ['normal', 'break-all', 'keep-all', 'break-word'],
    defaultValue: 'normal',
  },
  wordSpacing: {
    type: 'length',
    percentage: true,
    keywords: ['normal'],
    defaultValue: 'normal',
  },
  wordWrap: {
    type: 'keyword',
    keywords: ['normal', 'break-word', 'anywhere'],
    defaultValue: 'normal',
  },
  wrapAfter: {
    type: 'keyword',
    keywords: ['auto', 'avoid', 'avoid-line', 'aboid-flex', 'line', 'flex'],
    defaultValue: 'auto',
  },
  wrapBefore: {
    type: 'keyword',
    keywords: ['auto', 'avoid', 'avoid-line', 'aboid-flex', 'line', 'flex'],
    defaultValue: 'auto',
  },
  wrapFlow: {
    type: 'keyword',
    keywords: ['auto', 'both', 'start', 'end', 'minimum', 'maximum', 'clear'],
    defaultValue: 'auto',
  },
  wrapInside: {
    type: 'keyword',
    keywords: ['auto', 'avoid'],
    defaultValue: 'auto',
  },
  wrapThrough: {
    type: 'keyword',
    keywords: ['none', 'wrap'],
    defaultValue: 'none',
  },
  writingMode: {
    type: 'keyword',
    keywords: ['horizontal-tb', 'vertical-rl', 'vertical-lr'],
    defaultValue: 'horizontal-tb',
  },
  zIndex: {
    type: 'integer',
    keywords: ['auto'],
    defaultValue: 'auto',
  },
}

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
