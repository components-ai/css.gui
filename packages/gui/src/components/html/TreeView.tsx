import { DragLayerMonitorProps, Tree } from '@minoru/react-dnd-treeview'
import { useEffect, useState } from 'react'
import { useHtmlEditor } from './Provider'
import { ElementPath, HtmlNode } from './types'
import { diff } from 'deep-object-diff'
import { isNil } from 'lodash-es'
import { isSamePath } from './util'

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
  const nodes = flatternTree(root, [0])
  return nodes.map(({ node, path }) => convertNodeToTreeType(node, path))
}

function getChildAtPath(element: HtmlNode, path: ElementPath): HtmlNode {
  if (path.length === 0) {
    return element
  }
  if (typeof element === 'string') {
    return element
  }
  const [head, ...rest] = path
  const child = element.children?.[head]
  if (isNil(child)) {
    throw new Error('bad path')
  }
  return getChildAtPath(child, rest)
}

function getPathFromId(id: string): ElementPath {
  return id.split('-').map((n) => parseInt(n))
}

function removeChildAtPath(element: HtmlNode, path: ElementPath): HtmlNode {
  // if no path, invalid
  if (path.length === 0) {
    throw new Error('Cannot remove top-level')
  }
  if (typeof element === 'string') {
    return element
  }
  if (path.length === 1) {
    return {
      ...element,
      children: removeAt(element.children ?? [], path[0]),
    }
  }
  const [head, ...rest] = path
  const child = element.children?.[head]
  if (isNil(child)) {
    throw new Error('bad path')
  }
  return {
    ...element,
    children: replaceAt(
      element.children ?? [],
      head,
      removeChildAtPath(child, rest)
    ),
  }
}

function addChildAtPath(
  element: HtmlNode,
  path: ElementPath,
  item: HtmlNode
): HtmlNode {
  // if no path, replace the element
  console.log(element, 'first ele')
  if (path.length === 0) {
    throw new Error('Cannot add to root path')
  }
  if (typeof element === 'string') {
    return element
  }
  if (path.length === 1) {
    // console.log(path, "l1 path")
    return {
      ...element,
      children: addAt(element.children ?? [], path[0], item),
    }
  }
  const [head, ...rest] = path
  const child = element.children?.[head]
  if (isNil(child)) {
    // console.log(element, 'element')
    throw new Error('bad path')
  }
  const out = {
    ...element,
    children: replaceAt(
      element.children ?? [],
      head,
      addChildAtPath(child, rest, item)
    ),
  }
  // console.log(out, 'out an about')
  return out
}

function replaceAt<T>(items: T[], index: number, newItem: T) {
  const spliced = [...items]
  spliced.splice(index, 1, newItem)
  return spliced
}

function removeAt<T>(items: T[], index: number) {
  const spliced = [...items]
  spliced.splice(index, 1)
  return spliced
}

function addAt<T>(items: T[], index: number, newItem: T) {
  const spliced = [...items]
  spliced.splice(index, 0, newItem)
  console.log(spliced, items, 'spliced')
  return spliced
}

export function TreeView({ value, onChange }: any) {
  const { selected, setSelected } = useHtmlEditor()
  const [nodes, setNodes] = useState<any[]>([])

  useEffect(() => {  
    setNodes(convertNodes(value))
  }, [value])

  
  function handleDrop(newTree: any) {
    const { tree } = diff({ tree: nodes }, { tree: newTree }) as any
    // might be better to reconstruct the tree ...

    Object.entries(tree).forEach(([_, v]) => {
      const { id, parent } = v as any
      const originalPath = getPathFromId(id)
      const newPath = [...getPathFromId(parent), 0]

      // ignore root changes
      if (isSamePath(originalPath, [0])) return

      // todo, this will break on 2nd iteration as nodes will have moved
      const node = getChildAtPath(value, originalPath.slice(1))      
      const newTree = removeChildAtPath(
        addChildAtPath(
          value,
          newPath.slice(1),
          node
        ),
        originalPath.slice(1)
      )
      
      onChange(newTree)
    })
  }

  return (
    <Tree
      tree={nodes}
      rootId={''}
      onDrop={handleDrop}
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

// TODO
  // placeholder
  // handle edge cases 
    // void elements
  // bug where graph isnt open on default