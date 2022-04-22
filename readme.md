# CSS GUI

**_Visual development environment for CSS._**

CSS GUI is a visual toolkit for editing element styles on the web.
It's theme-aware, performant, and can be composed into any React app.

## Why?

We want to improve creative coding and web development workflows by making
it simpler to attach parametric controls that are designed specifically
to work with CSS.

With CSS GUI, folks can visually edit and generate CSS. They can install
the controls and use locally in their own projects or use our hosted version.

Eventually, these controls can also augment development environments like VS Code.

### Supporting the full CSS spec

These controls are specifically built for CSS and will adhere to the CSS spec.
This builds on the web platform itself, allowing the expressiveness of CSS/HTML/SVG
to create endless outputs.

It's our goal and intention to support the entire CSS spec beginning with the more
common controls like Length, Color, Keywords and expanding over time to more complex
stacks and grammars (think gradients, background-image, box shadow, etc.).

## ⚠️ CSS GUI is currently under active development (contributions are welcome)

Please bear with us as the API stabilizes and more (missing) functionality is added.
We welcome any and all contributions and would love it if you try to experiment with
CSS GUI and report bugs or open up feature requests.

## Installation

```sh
npm install --save css-gui
```

## Usage

By default, CSS GUI will provide controls based on the style properties you pass.

```js
import { useState } from 'react'
import { Editor, RenderElement } from '@compai/css-gui'

export const MyEditor = () => {
  const [styles, setStyles] = useState({
    fontSize: { value: 16, unit: 'px' },
    lineHeight: { value: 1.4, unit: 'number' },
    color: 'tomato',
  })

  return (
    <>
      <Editor styles={styles} onChange={setStyles} />
      <RenderElement tagName="p" styles={styles}>
        Hello, world!
      </RenderElement>
    </>
  )
}
```

For more customization, you can compose together your own controls and style
pseudo-elements.

```js
import { useState } from 'react'
import { Editor, Inputs, RenderElement } from '@compai/css-gui'

export const MyEditor = () => {
  const [styles, setStyles] = useState({
    fontSize: { value: 16, unit: 'px' },
    lineHeight: { value: 1.4, unit: 'number' },
    color: 'tomato',
  })

  return (
    <>
      <Editor styles={styles} onChange={setStyles}>
        <Inputs.FontSize />
        <Inputs.LineHeight />
        <Inputs.Color />
        <PseudoFieldset name="first-letter">
          <Inputs.FontSize />
          <Inputs.FontWeight />
          <Inputs.Color />
        </PseudoFieldset>
      </Editor>
      <RenderElement tagName="p" styles={styles}>
        Hello, world!
      </RenderElement>
    </>
  )
}
```

[Read the full getting started guide &rarr;](https://components.ai/open-source/css-gui/getting-started)

## Development

### Installation

```sh
git clone https://github.com/components-ai/css-gui
cd css-gui
yarn
```

### Running the development server

```sh
yarn dev
open http://localhost:3001
```

### Running the tests

```sh
yarn test
```

### Reinstalling dependencies and clearing caches

On rare ocassions, especially when changing configurations, you might
need to clear the cache and reinstall the dependencies:

```sh
yarn nuke
```

## Resources

- [MDN data](https://github.com/mdn/data/blob/main/css/properties.json)
- [csstype](https://github.com/frenic/csstype)

## Inspiration

- [**dat.gui**](https://github.com/dataarts/dat.gui) well known, especially in the generative design/three space
- [**leva**](https://github.com/pmndrs/leva) a React-based [pmndrs](https://pmnd.rs/) project that builds the entire control set from hooks
- [**Blender**](https://blender.org) - Shader and Geometry nodes allow for rapid exploration withiin the available rendering space
- [**MDN Docs**](https://developer.mozilla.org/en-US/) have long been an amazing introduction to how various CSS property values will affect the appearance of a DOM element.
