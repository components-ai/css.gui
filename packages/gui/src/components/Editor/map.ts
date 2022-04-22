import {
  FontSizeInput,
  HeightInput,
  LineHeightInput,
  WidthInput,
} from '../editors'
import { BackgroundColorInput, ColorInput } from '../editors/ColorInputs'
import { keywordInputs } from '../editors/KeywordInputs'

export const controlMap: Record<string, any> = {
  ...keywordInputs,
  fontSize: FontSizeInput,
  lineHeight: LineHeightInput,
  color: ColorInput,
  backgroundColor: BackgroundColorInput,
  height: HeightInput,
  width: WidthInput,
}
