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
        pt: [2, 3],
      }}
    >
      <NavSectionTitle>Overview</NavSectionTitle>
      <NavItem href="/introduction">Introduction</NavItem>
      <NavItem href="/getting-started">Getting Started</NavItem>
      <NavSectionTitle>Components</NavSectionTitle>
      <NavItem href="/components/editor">Editor</NavItem>
      <NavSectionTitle>Inputs</NavSectionTitle>
      <NavItem href="/inputs/color-picker">Color Picker</NavItem>
      <NavItem href="/inputs/color-popover">Color Popover</NavItem>
      <NavItem href="/inputs/number">Number</NavItem>
      <NavItem href="/inputs/length">Length</NavItem>
      <NavSectionTitle>Guides</NavSectionTitle>
      <NavItem href="/guides/style-schema">Style Schema</NavItem>
      <NavItem href="/guides/theming">Theming</NavItem>
      <NavItem href="/guides/typescript">TypeScript</NavItem>
      <NavSectionTitle>Utilities</NavSectionTitle>
      <NavItem href="/utilities/random-color">Random Color</NavItem>
      <NavItem href="/utilities/transformers">Transformers</NavItem>
      <NavItem href="/utilities/codegen">Codegen</NavItem>
      <NavSectionTitle>Examples</NavSectionTitle>
      <NavItem href="/examples/transitions">Transitions</NavItem>
      <NavItem href="/examples/shadows">Shadows</NavItem>
      <NavSectionTitle>Community</NavSectionTitle>
      <NavItem href="https://github.com/components-ai/css.gui">GitHub</NavItem>
      <NavItem href="https://twitter.com/components_ai">Twitter</NavItem>
      <NavItem href="https://discord.gg/PYF52BEEf3">Discord</NavItem>
    </nav>
  )
}
