# [CSS GUI](https://components.ai/open-source/css-gui)

**_Visual development environment for CSS._**

![CSS GUI screenshot](https://user-images.githubusercontent.com/1748143/173137122-53686102-fda8-4da8-b75f-dd78187b8666.png)

CSS GUI is a visual toolkit for editing element styles on the web.
It's theme-aware, performant, and can be composed into any React app.

- [**Create and save designs &rarr;**](https://comp.new)
- [**Read the documentation &rarr;**](https://components.ai/open-source/css-gui)
- [**Play with a demo on CodeSandbox &rarr;**](https://codesandbox.io/s/cssgui-example-w1c9h5)
- [**Watch an introduction on YouTube &rarr;**](https://www.youtube.com/watch?v=b6J2TGyDYc0)

## Features

- Controls for 280 CSS properties
- Theme aware so you can quickly select from your brand
- Responsive value arrays
- Support for all CSS units
- Variable font support
- +1000 Google fonts
- Support for styling any element, pseudo-element or pseudo-class
- Scrubbable number inputs
- Smart default ranges

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

It's our [goal and intention](https://components.ai/open-source/css-gui/unsupported)
to support the entire CSS spec beginning with the more
common controls like Length, Color, Keywords and expanding over time to more complex
stacks and grammars (think gradients, background-image, box shadow, etc.).

## How can you help?

[We welcome any and all contributions](https://github.com/components-ai/css.gui/blob/main/.github/contributing.md).
We'd love it if you try to experiment with CSS GUI and let us know how it goes. Please feel free to
[report bugs or make feature requests](https://github.com/components-ai/css.gui/issues/new).

## Installation

```sh
npm install --save @compai/css-gui
```

## Usage

By default, CSS GUI will generate controls based on the style properties you pass.

```js
import { useState } from 'react'
import { Editor, styled } from '@compai/css-gui'

export const MyEditor = () => {
  const [styles, setStyles] = useState({
    fontSize: { value: 16, unit: 'px' },
    lineHeight: { value: 1.4, unit: 'number' },
    color: 'tomato',
  })

  return (
    <>
      <Editor styles={styles} onChange={setStyles} />
      <styled.p styles={styles}>Hello, world!</styled.p>
    </>
  )
}
```

For more customization, you can compose together your own controls and style
pseudo-elements.

```js
import { useState } from 'react'
import { Editor, Inputs, styled } from '@compai/css-gui'

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
      <styled.p styles={styles}>Hello, world!</styled.p>
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
- [**MDN docs**](https://developer.mozilla.org/en-US/): have long been an amazing introduction to how various CSS property values will affect the appearance of a DOM element.
