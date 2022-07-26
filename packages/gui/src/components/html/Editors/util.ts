import { useHtmlEditor } from '../Provider'

export const useNodeTypes = () => {
  const { hasComponents } = useHtmlEditor()

  const baseNodeTypes = ['text', 'tag']
  return hasComponents ? [...baseNodeTypes, 'component', 'slot'] : baseNodeTypes
}
