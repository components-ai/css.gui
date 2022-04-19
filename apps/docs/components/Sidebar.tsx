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
      <NavItem href="/inputs/number">Number</NavItem>
      <NavItem href="/inputs/color-picker">Color Picker</NavItem>
      <NavItem href="/inputs/color-popover">Color Popover</NavItem>
      <NavItem href="/inputs/unit-select">Unit Select</NavItem>
      <NavSectionTitle>Utilities</NavSectionTitle>
      <NavItem href="/utilities/random-color">Random Color</NavItem>
      <NavItem href="/utilities/transformers">Transformers</NavItem>
      <NavItem href="/utilities/codegen">Codegen</NavItem>
      <NavSectionTitle>Community</NavSectionTitle>
      <NavItem href="https://github.com/components-ai/css.gui">GitHub</NavItem>
      <NavItem href="https://twitter.com/components_ai">Twitter</NavItem>
      <NavItem href="https://discord.gg/PYF52BEEf3">Discord</NavItem>
    </nav>
  )
}
