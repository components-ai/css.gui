# [CSS GUI](https://components.ai/open-source/css-gui)

**_Visual development environment for CSS._**

CSS GUI is a visual toolkit for editing element styles on the web.
It's theme-aware, performant, and can be composed into any React app.

[See the docs &rarr;](https://components.ai/open-source/css-gui)

## ⚠️ Under active development

This project is a work in (rapid) progress.

Over the next few weeks the API will be stabilizing as more functionality is added.
CSS GUI only [supports a portion](https://components.ai/open-source/css-gui/unsupported)
of the CSS spec currently, but the intention is to support it all in the future.

[We welcome any and all contributions](https://github.com/components-ai/css.gui/blob/main/.github/contributing.md).
We'd love it if you try to experiment with CSS GUI. Please feel free to report bugs
or make feature requests.

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

## Installation

```sh
npm install --save css-gui
```

## Usage

By default, CSS GUI will generate controls based on the style properties you pass.

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
        <Fieldset type="pseudo-element" name="first-letter">
          <Inputs.FontSize />
          <Inputs.FontWeight />
          <Inputs.Color />
        </Fieldset>
      </Editor>
      <RenderElement tagName="p" styles={styles}>
        Hello, world!
      </RenderElement>
    </>
  )
}
```

[**Read the full getting started guide &rarr;**](https://components.ai/open-source/css-gui/getting-started)

## Development

CSS GUI is a TypeScript-based monorepo that contains the main `@compai/css-gui` package, a docs site,
and its supporting packages.

[**See the contributing guide &rarr;**](https://github.com/components-ai/css.gui/blob/main/.github/contributing.md)

## Resources

- [**MDN data**](https://github.com/mdn/data/blob/main/css/properties.json): Provides amazing documentation of the CSS spec which we use to drive the development of our parametric controls
- [**csstype**](https://github.com/frenic/csstype): Types for CSS properties and their values based on MDN data

## Inspiration

- [**dat.gui**](https://github.com/dataarts/dat.gui): well known, especially in the generative design/three space
- [**leva**](https://github.com/pmndrs/leva): a React-based [pmndrs](https://pmnd.rs/) project that builds the entire control set from hooks
- [**Blender**](https://blender.org): Shader and Geometry nodes allow for rapid exploration withiin the available rendering space
- [**MDN Docs**](https://developer.mozilla.org/en-US/): have long been an amazing introduction to how various CSS property values will affect the appearance of a DOM element.
