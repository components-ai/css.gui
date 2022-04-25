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
      <NavItem href="/open-source/css-gui/introduction">Introduction</NavItem>
      <NavItem href="/open-source/css-gui/getting-started">
        Getting Started
      </NavItem>
      <NavSectionTitle>Components</NavSectionTitle>
      <NavItem href="/open-source/css-gui/components/editor">Editor</NavItem>
      <NavItem href="/open-source/css-gui/components/fieldset">
        Fieldset
      </NavItem>
      <NavSectionTitle>Inputs</NavSectionTitle>
      <NavItem href="/open-source/css-gui/inputs/color">Color</NavItem>
      <NavItem href="/open-source/css-gui/inputs/number">Number</NavItem>
      <NavItem href="/open-source/css-gui/inputs/dimension">Dimension</NavItem>
      <NavSectionTitle>Guides</NavSectionTitle>
      <NavItem href="/open-source/css-gui/guides/style-schema">
        Style Schema
      </NavItem>
      <NavItem href="/open-source/css-gui/guides/theming">Theming</NavItem>
      <NavItem href="/open-source/css-gui/guides/typescript">
        TypeScript
      </NavItem>
      <NavSectionTitle>Utilities</NavSectionTitle>
      <NavItem href="/open-source/css-gui/utilities/random-color">
        Random Color
      </NavItem>
      <NavItem href="/open-source/css-gui/utilities/transformers">
        Transformers
      </NavItem>
      <NavItem href="/open-source/css-gui/utilities/codegen">Codegen</NavItem>
      <NavSectionTitle>Examples</NavSectionTitle>
      <NavItem href="/open-source/css-gui/examples/transitions">
        Transitions
      </NavItem>
      <NavItem href="/open-source/css-gui/examples/shadows">Shadows</NavItem>
      <NavItem href="/open-source/css-gui/examples/filters">Filters</NavItem>
      <NavSectionTitle>Community</NavSectionTitle>
      <NavItem href="https://github.com/components-ai/css.gui">GitHub</NavItem>
      <NavItem href="https://twitter.com/components_ai">Twitter</NavItem>
      <NavItem href="https://discord.gg/PYF52BEEf3">Discord</NavItem>
    </nav>
  )
}
