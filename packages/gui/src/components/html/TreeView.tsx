import { DragLayerMonitorProps, Tree } from '@minoru/react-dnd-treeview'
import { useEffect, useState } from 'react'
import { useHtmlEditor } from './Provider'
import { HtmlNode } from './types'

function convertNodeToTreeType(node: HtmlNode, path: number[]) {
  return {
    id: path.join('-'),
    parent: path.slice(0 , path.length - 1).join('-'),
    droppable: node.type !== 'text',
    text: node.type === 'text' ? node.value : node.tagName,
  }
}

function flatternTree(root: HtmlNode, path: number[]): any[] {
  if (!root) return []
  let nodes: {node: HtmlNode, path: number[]}[] = [{
    node: root, path
  }]

  for (let j = 0; j < (root.children?.length || 0); j++) {
    // @ts-ignore
    const node = root.children[j]
    nodes = [ ...nodes, ...flatternTree(node, [ ...path, j])]
  }

  return [ ...nodes]
}

function convertNodes(root: HtmlNode) {
  const nodes = flatternTree(root, [0, 0])
  return nodes.map(({ node, path }) => convertNodeToTreeType(node, path))
}

export function TreeView({ value }: any) {
  const { selected, setSelected } = useHtmlEditor()
  const [nodes, setNodes] = useState<any[]>([])

  useEffect(() => {  
    setNodes(convertNodes(value))
  }, []) // [value]

  return (
    <Tree
      tree={nodes}
      rootId={'0'}
      onDrop={() => {}}
      initialOpen={true}
      sort={false}
      classes={{
        dropTarget: 'drop-target',
        draggingSource: 'dragging-source'
      }}
      render={(node, { depth, isOpen, onToggle }) => {
        return (
          <Node node={node} depth={depth} isOpen={isOpen} onToggle={onToggle} />
        )
      }}
    />
  )
}

function Node({ node, isOpen, depth, onToggle }: any) {
  return (
    <div sx={{ ml: `calc(${depth} * 2px)`, borderStyle: 'solid' }} onClick={onToggle}>
      {node.text}
    </div>
  )
}
