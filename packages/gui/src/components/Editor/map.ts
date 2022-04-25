import { FontSizeInput, LineHeightInput, MarginInput, PaddingInput } from '../editors'
import { BackgroundColorInput, ColorInput } from '../editors/ColorInputs'

export const controlMap: Record<string, any> = {
  fontSize: FontSizeInput,
  lineHeight: LineHeightInput,
  color: ColorInput,
  backgroundColor: BackgroundColorInput,
  margin: MarginInput,
  padding: PaddingInput,
}
