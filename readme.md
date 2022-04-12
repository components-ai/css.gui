# css.gui

**_Visual development environment for CSS._**

CSS GUI is a visual toolkit for editing element styles on the web. It&#39;s theme-aware, performant, and can be composed into any React app.

```ts
import { useState } from &#39;react&#39;
import { EditorProvider, Styles } from &#39;css-gui&#39;
import * as Editors from &#39;css-gui/editors&#39;

export default () =&gt; {
  const [styles, setStyles] = useState&lt;Styles&gt;({})
  return (
    &lt;&gt;
      &lt;Canvas styles={styles} /&gt;
      &lt;EditorProvider styles={styles} theme={theme}&gt;
        &lt;Editors.Fieldset field=&quot;p&quot;&gt;
          &lt;Editors.FontSize /&gt;
          &lt;Editors.FontWeight /&gt;
          &lt;Editors.LineHeight /&gt;
          &lt;Editors.Color /&gt;
          &lt;BackgroundColor /&gt;
        &lt;/Editors.Fieldset&gt;
      &lt;/EditorProvider&gt;
    &lt;/&gt;
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
- Generate controls from MDN data: a mapping to our primitive components
  - Defines input type
  - What units (if any)
- Have a theme selection mechanism based on our mapping (we should also fully type the Theme object)
- Generate values for inputs a la [csstype](https://github.com/frenic/csstype)

## Implementation

Seems worthwhile to see how far we can get with solidly designed controls for primitives and some higher-level components that would make the majority of the UI. Then generate what&#39;s needed to support most of the spec (incrementally) for given element types.

### Internal

Do we continue on with the Immer/context-based editor style implementation that we have in `useEditor`? It seems to work, with solid performance, and be pretty straightforward so I&#39;d be fine rolling with it unless someone has strong opinions otherwise.

CSS values will be stored in an &quot;unpacked&quot; way to avoid multiple parses. We will offer a one-way (for now) stringification for those values.

#### CSSUnitValue

```typescript
enum Units {
  Theme = &#39;theme&#39;,
  Number = &#39;number&#39;,
  Keyword = &#39;keyword&#39;,
  Px = &#39;px&#39;,
  Em = &#39;em&#39;,
  Rem = &#39;rem&#39;,
  Percent = &#39;%&#39;,
  // ...
}

type CSSUnitValue = {
  unit: `${Units}`,
  value?: string | number
}
```

#### ThemeValue

```ts
// Value maps to the token alias from the theme.
// I.e., &quot;purple.3&quot;
type ThemeValue = CSSUnitValue & amp
{
  rawValue: CSSUnitValue
}
```

### API

There are times when we might want to derive controls and their constraints based off the context of the other properties and their values. For example, `color` and `backgroundColor` likely want to enforce a contrast ratio. As such we can have a `Fieldset`.

The outer field is passed via context, and something like `LineHeight` would effectively `joinPath(field, &#39;lineHeight&#39;)`.

```js
&lt;Fieldset
  field={joinPath(field, &#39;p&#39;)}
  controlConstraints=&quot;theme&quot;
&gt;
  &lt;LineHeight /&gt;
  &lt;Color contrastRatio={4.2} /&gt;
  &lt;BackgroundColor /&gt;
&lt;/Fieldset&gt;
```

##### Nesting

```ts
import { useState } from &#39;react&#39;
import { EditorProvider, Styles } from &#39;css-gui&#39;
import * as Editors from &#39;css-gui/editors&#39;

export default () =&gt; {
  const [styles, setStyles] = useState&lt;Styles&gt;({})
  return (
    &lt;&gt;
      &lt;EditorProvider styles={styles} theme={theme}&gt;
        &lt;Editors.Fieldset field=&quot;p&quot;&gt;
          &lt;Editors.FontSize /&gt;
          &lt;Editors.FontWeight /&gt;
          &lt;Editors.LineHeight /&gt;
          &lt;Editors.Color /&gt;
          &lt;BackgroundColor /&gt;
          &lt;Editors.Fieldset field=&quot;:first-of-type&quot;&gt;
            &lt;Editors.FontSize /&gt;
            &lt;Editors.FontWeight /&gt;
            &lt;Editors.LineHeight /&gt;
            &lt;Editors.Color /&gt;
            &lt;BackgroundColor /&gt;
          &lt;/Editors.Fieldset&gt;
        &lt;/Editors.Fieldset&gt;
      &lt;/EditorProvider&gt;
    &lt;/&gt;
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

- The element and CSS properties available may expand or collapse the possible controls
- How do we pass around values that are more unpacked internally (like CSSUnitValue) to the consumer? For now I guess we just return them in the unpacked way for folks to handle. Can add a `toCSS` mechanism.
- Keywords - is that a kick the can for some length inputs?

## Resources

- [MDN data](https://github.com/mdn/data/blob/main/css/properties.json)
- [csstype](https://github.com/frenic/csstype)

## Inspiration

- [**dat.gui**](https://github.com/dataarts/dat.gui) well known, especially in the generative design/three space
- [**leva**](https://github.com/pmndrs/leva) an interesting [pmndrs](https://pmnd.rs/) project that builds the entire control set from hooks
