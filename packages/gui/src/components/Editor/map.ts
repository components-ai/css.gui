import {
  FontSizeInput,
  HeightInput,
  LineHeightInput,
  WidthInput,
} from '../editors'
import { BackgroundColorInput, ColorInput } from '../editors/ColorInputs'
import {
  DisplayInput,
  FloatInput,
  FontStretchInput,
  TextAlignInput,
} from '../editors/KeywordInputs'

export const controlMap: Record<string, any> = {
  fontSize: FontSizeInput,
  lineHeight: LineHeightInput,
  color: ColorInput,
  backgroundColor: BackgroundColorInput,
  textAlign: TextAlignInput,
  float: FloatInput,
  display: DisplayInput,
  fontStretch: FontStretchInput,
  height: HeightInput,
  width: WidthInput,
}
