# css.gui

**_Visual development environment for CSS._**

CSS GUI is a visual toolkit for editing element styles on the web. It's theme-aware, performant, and can be composed into any React app.

```ts
import { useState } from 'react'
import { EditorProvider, Styles } from 'css-gui'
import * as Editors from 'css-gui/editors'

export default () => {
  const [styles, setStyles] = useState<Styles>({})

  return (
    <>
      <Canvas styles={styles} />
      <EditorProvider styles={styles} theme={theme}>
        <Editors.Fieldset field="p">
          <Editors.FontSize />
          <Editors.FontWeight />
          <Editors.LineHeight />
          <Editors.Color />
          <BackgroundColor />
        </Editors.Fieldset>
      </EditorProvider>
    </>
  )
}
```

## Controls

- Primitive controls
  - Range/number/slider/scrubber: this is needed to avoid the ranger + number field business
  - Select
  - Color
  - Text
- Higher-level controls
  - Length
  - LengthWithPercentage
  - Keyword (Select populated by property type)
  - ResponsiveInput (FieldArray and FieldObject)
  - UnitSelect (with theme mechanism)
  - Gradient
  - BoxShadow
  - TextShadow
- Generate controls from MDN data: a mapping to our primitive components
  - Defines input type
  - What units (if any)
- Have a theme selection mechanism based on our mapping (we should also fully type the Theme object)
- Generate values for inputs a la [csstype](https://github.com/frenic/csstype)
- Random / Lock pattern per property?

## Implementation

Seems worthwhile to see how far we can get with solidly designed controls for primitives and some higher-level components that would make the majority of the UI. Then generate what's needed to support most of the spec (incrementally) for given element types.

### Internal

Do we continue on with the Immer/context-based editor style implementation that we have in `useEditor`? It seems to work, with solid performance, and be pretty straightforward so I'd be fine rolling with it unless someone has strong opinions otherwise.

CSS values will be stored in an 'unpacked' way to avoid multiple parses. We will offer a one-way (for now) stringification for those values.

#### CSSUnitValue

```typescript
enum Units {
  Theme = 'theme',
  Number = 'number',
  Keyword = 'keyword',
  Px = 'px',
  Em = 'em',
  Rem = 'rem',
  Percent = '%',
  // ...
}

type CSSUnitValue = {
  unit: `${Units}`
  value?: string | number
}
```

#### ThemeValue

```ts
// Value maps to the token alias from the theme.
// I.e., 'purple.3'
type ThemeValue = CSSUnitValue & {
  rawValue: CSSUnitValue
}
```

### API

There are times when we might want to derive controls and their constraints based off the context of the other properties and their values. For example, `color` and `backgroundColor` likely want to enforce a contrast ratio. As such we can have a `Fieldset`.

The outer field is passed via context, and something like `LineHeight` would effectively `joinPath(field, 'lineHeight')`.

```js
<Fieldset field={joinPath(field, 'p')} controlConstraints="theme">
  <LineHeight />
  <Color contrastRatio={4.2} />
  <BackgroundColor />
</Fieldset>
```

##### Nesting

```ts
import { useState } from 'react'
import { EditorProvider, Styles } from 'css-gui'
import * as Editors from 'css-gui/editors'

export default () => {
  const [styles, setStyles] = useState<Styles>({})
  return (
    <>
      <EditorProvider styles={styles} theme={theme}>
        <Editors.Fieldset field="p">
          <Editors.FontSize />
          <Editors.FontWeight />
          <Editors.LineHeight />
          <Editors.Color />
          <BackgroundColor />
          <Editors.Fieldset field=":first-of-type">
            <Editors.FontSize />
            <Editors.FontWeight />
            <Editors.LineHeight />
            <Editors.Color />
            <BackgroundColor />
          </Editors.Fieldset>
        </Editors.Fieldset>
      </EditorProvider>
    </>
  )
}
```

### Misc

- Fully typed
- Radix UI-based
- Styling solution? (Theme UI, Stitches, Vanilla Extract, etc)

### Can kicking

Save CSS value parsing from raw strings until later. JSON objects based on our types will go in and out.

## Considerations

- The element and CSS properties available may expand or collapse the possible controls e.g. setting `display` to `grid` will expose relevant grid properties like `grid-template-rows` and `grid-template-columns`
- How do we pass around values that are more unpacked internally (like CSSUnitValue) to the consumer? For now I guess we just return them in the unpacked way for folks to handle. Can add a `toCSS` mechanism.
- Keywords - is that a kick the can for some length inputs?

## Resources

- [MDN data](https://github.com/mdn/data/blob/main/css/properties.json)
- [csstype](https://github.com/frenic/csstype)

## Inspiration

- [**dat.gui**](https://github.com/dataarts/dat.gui) well known, especially in the generative design/three space
- [**leva**](https://github.com/pmndrs/leva) a React-based [pmndrs](https://pmnd.rs/) project that builds the entire control set from hooks
- [**Blender**](https://blender.org) - Shader and Geometry nodes allow for rapid exploration withiin the available rendering space
- [MDN Docs](https://developer.mozilla.org/en-US/) have long been an amazing introduction to how various CSS property values will affect the appearance of a DOM element.
