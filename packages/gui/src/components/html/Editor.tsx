import { Editor } from '../Editor'
import * as Tabs from '@radix-ui/react-tabs'
import { Code, Layers, LogIn } from 'react-feather'
import { useHtmlEditor } from './Provider'
import { getChildAtPath, removeChildAtPath, setChildAtPath } from './util'
import { Export } from './Export'
import { useTheme } from '../providers/ThemeContext'
import { NodeEditor } from './Editors/NodeEditor'
import { TreeNode } from './TreeNode'
import { Import } from './Import'

const TABS_TRIGGER_STYLES: any = {
  all: 'unset',
  cursor: 'pointer',
  fontSize: 0,
  fontWeight: 500,
  px: 3,
  py: 1,
  my: 2,
  borderRadius: '6px',
  color: 'muted',
  display: 'inline-flex',
  gap: '.5em',
  alignItems: 'center',
  filter: 'grayscale(100%)',
  transition: 'all .2s ease-in-out',
  '&[data-state="active"]': {
    color: 'text',
    filter: 'grayscale(0%)',
    bg: 'backgroundOffset',
  },
  ':hover': {
    color: 'text',
    filter: 'grayscale(0%)',
  },
}
const TABS_CONTENT_STYLES: any = {
  width: 400,
  height: 'calc(100vh - 81px)',
  overflow: 'auto',
  resize: 'horizontal',
  borderRightWidth: '1px',
  borderRightStyle: 'solid',
  borderColor: 'border',
  '&::-webkit-scrollbar': { display: 'none' },
  scrollbarWidth: 0,
}

/**
 * An HTML tree-based editor that lets you add HTML nodes and mess around with their styles
 */
export function HtmlEditor() {
  const {
    value,
    update: onChange,
    selected: providedSelected,
    setSelected,
  } = useHtmlEditor()
  const theme = useTheme()

  const selected = providedSelected || []
  const nodeValue = getChildAtPath(value, selected)

  return (
    <div
      sx={{
        display: 'flex',
        width: 'auto',
        height: '100%',
        '*': {
          boxSizing: 'border-box',
          //outline: '1px solid rgba(125,125,180,.5)',
        },
        '*:before': {
          boxSizing: 'border-box',
        },
        '*:after': {
          boxSizing: 'border-box',
        },
      }}
    >
      <Tabs.Root defaultValue="node">
        <Tabs.List
          sx={{
            px: 2,
            width: '100%',
            borderRight: 'thin solid',
            borderBottom: 'thin solid',
            borderColor: 'border',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
            overflowX: 'auto',
          }}
        >
          <Tabs.Trigger sx={TABS_TRIGGER_STYLES} value="node">
            <span>🎨</span> Styles
          </Tabs.Trigger>
          <Tabs.Trigger sx={TABS_TRIGGER_STYLES} value="tree">
            <Layers size={12} /> Layers
          </Tabs.Trigger>
          <Tabs.Trigger sx={TABS_TRIGGER_STYLES} value="import">
            <LogIn size={12} /> Import
          </Tabs.Trigger>
          <Tabs.Trigger sx={TABS_TRIGGER_STYLES} value="export">
            <Code size={12} /> Export
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content sx={TABS_CONTENT_STYLES} value="node">
          <div sx={{ pt: 3, px: 3 }}>
            <Editor
              key={selected.join('-')}
              theme={theme}
              styles={nodeValue.style ?? {}}
              onChange={(newStyles) => {
                const newItem = { ...nodeValue, style: newStyles }
                onChange(setChildAtPath(value, selected, newItem))
              }}
              showRegenerate
              showAddProperties
            />
          </div>
        </Tabs.Content>
        <Tabs.Content sx={TABS_CONTENT_STYLES} value="tree">
          <div>
            <NodeEditor
              value={nodeValue}
              onChange={(newItem) =>
                onChange(setChildAtPath(value, selected, newItem))
              }
              onParentChange={(newItem) => {
                const parentPath = [...(selected || [])]
                parentPath.pop()
                const newValue = setChildAtPath(value, parentPath, newItem)
                onChange(newValue)
              }}
              onRemove={() => {
                onChange(removeChildAtPath(value, selected))
                const newPath = [...selected]
                newPath.pop()
                setSelected(newPath)
              }}
            />
            <TreeNode
              value={value}
              onSelect={setSelected}
              path={[]}
              onChange={onChange}
            />
          </div>
        </Tabs.Content>
        <Tabs.Content sx={TABS_CONTENT_STYLES} value="import">
          <Import onChange={onChange} />
        </Tabs.Content>
        <Tabs.Content sx={TABS_CONTENT_STYLES} value="export">
          <Export value={value} theme={theme} />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}
