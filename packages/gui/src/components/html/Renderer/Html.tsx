import { ElementPath, HtmlNode } from '../types'
import { HTMLFontTags } from '../FontTags'
import { transformValueToSchema } from '../Provider'
import { CanvasProvider } from '../CanvasProvider'
import { ElementRenderer } from './Element'

const DEFAULT_PATH: ElementPath = []

interface HtmlRendererProps {
  value: HtmlNode
  path?: ElementPath
  canvas?: boolean
}
export function HtmlRenderer({ value, canvas = true }: HtmlRendererProps) {
  const transformedVal = transformValueToSchema(value)

  return (
    <>
      <HTMLFontTags htmlTree={transformedVal} />
      <CanvasProvider canvas={canvas}>
        <ElementRenderer value={transformedVal} path={DEFAULT_PATH} />
      </CanvasProvider>
    </>
  )
}
