import { CSSFunctionURL } from '../../../types/css'
import { GradientList } from '../Gradient/types'

// TODO: The background-image grammar and functionality is actually much
// more complex, but for now we'll just roll with url() and gradients.
// For now, we'll hardcode the bg image as a single element stack which
// we serialize, though in the future there's no reason why we can't expose
// this as a proper stack/layer.
export type ImageSourceType = 'url' | 'gradient'
export type ImageSourceGradient = {
  type: 'gradient'
  gradient: GradientList
}
export type ImageSource = CSSFunctionURL | ImageSourceGradient
