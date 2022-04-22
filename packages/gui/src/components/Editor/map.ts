import {
  FontSizeInput,
  HeightInput,
  LineHeightInput,
  WidthInput,
} from '../editors'
import { colorInputs } from '../editors/ColorInputs'
import { keywordInputs } from '../editors/KeywordInputs'

export const controlMap: Record<string, any> = {
  ...keywordInputs,
  ...colorInputs,
  fontSize: FontSizeInput,
  lineHeight: LineHeightInput,
  height: HeightInput,
  width: WidthInput,
}
