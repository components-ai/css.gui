import { NavItem, NavSectionTitle } from './Nav'

export const Sidebar = () => {
  return (
    <nav
      sx={{
        minHeight: '100vh',
        width: ['100%', 256],
        minWidth: ['100%', 256],
        borderRight: 'thin solid',
        borderColor: 'border',
        py: [2, 3],
        position: ['relative', 'sticky'],
        overflowY: 'auto',
        top: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <NavSectionTitle>Overview</NavSectionTitle>
      <NavItem href="/introduction">Introduction</NavItem>
      <NavItem href="/getting-started">Getting Started</NavItem>
      <NavItem href="/exports/css">Exporting CSS</NavItem>
      <NavItem href="/imports/color">Importing Color Palettes</NavItem>
      <NavSectionTitle>Components</NavSectionTitle>
      <NavItem href="/components/editor">Editor</NavItem>
      <NavItem href="/components/fieldset">Fieldset</NavItem>
      <NavItem href="/components/styled">Styled Elements</NavItem>
      <NavSectionTitle>Inputs</NavSectionTitle>
      <NavItem href="/inputs/color">Color</NavItem>
      <NavItem href="/inputs/number">Number</NavItem>
      <NavItem href="/inputs/dimension">Dimension</NavItem>
      <NavItem href="/inputs/responsive">Responsive</NavItem>
      <NavItem href="/inputs/font-family">Font Family</NavItem>
      <NavSectionTitle>Examples</NavSectionTitle>
      <NavItem href="/examples/transitions">Transitions</NavItem>
      <NavItem href="/examples/shadows">Shadows</NavItem>
      <NavItem href="/examples/filters">Filters</NavItem>
      <NavItem href="/examples/transforms">Transforms</NavItem>
      <NavItem href="/examples/borders">Borders</NavItem>
      <NavItem href="/examples/border-images">Border Images</NavItem>
      <NavItem href="/examples/backgrounds">Backgrounds</NavItem>
      <NavItem href="/examples/space">Space</NavItem>
      <NavItem href="/examples/text-decoration">Text Decoration</NavItem>
      <NavItem href="/examples/grid-layout">Grid Layout</NavItem>
      <NavSectionTitle>TODO</NavSectionTitle>
      <NavItem href="/unsupported">Unsupported Properties</NavItem>
      <NavItem href="https://github.com/components-ai/css.gui/issues">
        Issues
      </NavItem>
      <NavSectionTitle>Reference</NavSectionTitle>
      <NavItem href="/colophon">Colophon</NavItem>
      <NavSectionTitle>Community</NavSectionTitle>
      <NavItem href="https://github.com/components-ai/css.gui">GitHub</NavItem>
      <NavItem href="https://twitter.com/components_ai">Twitter</NavItem>
      <NavItem href="https://discord.gg/PYF52BEEf3">Discord</NavItem>
    </nav>
  )
}
