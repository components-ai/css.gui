import { renameNodeAttribute } from './rename-node-attribute'

export const propertiesToAttributes = () => (tree: any) => {
  return renameNodeAttribute(tree, 'properties', 'attributes')
}
