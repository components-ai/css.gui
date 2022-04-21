# css.gui

**_Visual development environment for CSS._**

CSS GUI is a visual toolkit for editing element styles on the web. It's theme-aware, performant, and can be composed into any React app.

⚠️ CSS GUI is currently under active development (contributions are welcome)

## Installation

```sh
npm install --save css-gui
```

## Usage

```js
import { useState } from 'react'
import { Editor, RenderElement } from 'css-gui'

export const MyEditor = () => {
  const [styles, setStyles] = useState({})

  return (
    <>
      <Editor value={styles} onChange={setStyles} />
      <RenderElement tagName="p" styles={styles}>
        Hello, world!
      </RenderElement>
    </>
  )
}
```

[Read the full getting started guide &rarr;](https://cssgui.components.ai/getting-started)

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
