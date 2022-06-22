import { renameNodeAttribute } from './rename-node-attribute'

export const attributesToProperties = () => (tree: any) => {
  return renameNodeAttribute(tree, 'attributes', 'properties')
}
