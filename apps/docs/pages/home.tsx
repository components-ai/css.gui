import { FontFamilyPreview } from '../components/examples/FontFamilyPreview'
import { FontSizePreview } from '../components/examples/FontSizePreview'
import { ColorPreview } from '../components/examples/ColorPreview'
import { WidthPreview } from '../components/examples/WidthPreview'
import { HeightPreview } from '../components/examples/HeightPreview'
import { BackgroundImagePreview } from '../components/examples/BackgroundImagePreview'
import { BackgroundPreview } from '../components/examples/BackgroundPreview'
import { BorderRadiusPreview } from '../components/examples/BorderRadiusPreview'
import { TextAlignPreview } from '../components/examples/TextAlignPreview'
import { FilterPreview } from '../components/examples/FilterPreview'
import { CursorPreview } from '../components/examples/CursorPreview'
import pkg from '../../../packages/gui/package.json'

export default function Docs() {
  return (
    <div>
      <header sx={{ pt: [5,6,7], mx: 'auto', maxWidth: '1024px', px: 4 }}>
        <h1 sx={{ fontSize: [6,8,'128px'], my: 0, lineHeight: 1 }}>
          CSS GUI
          <span sx={{ fontSize: 1 }}>v{pkg.version}</span>
        </h1>
        <h2 sx={{ fontWeight: 500, my: 0 }}>
          A composable, extensible, and themeable controls for visually editing CSS.
        </h2>
      <p sx={{
        mt: 4,
        fontSize: ['18px', '1.5rem', '2rem'],
        fontWeight: 400,
        mb: 0,
        }}>
         Everyone should be able to explore the creative potential of CSS.
         This project is a growing set of parametric controls for rapidly editing CSS properties. 
         Designed for composability, mix and match any combination of properties
         to create custom components and tap into the vast and beautiful world of CSS. 
      </p>
        <h4 sx={{ mt: 5 }}>Install</h4>
        <code
          sx={{
            bg: 'backgroundOffset',
            p: 3,
            borderRadius: '6px',
            width: '100%',
            display: 'block',
          }}
        >
          npm install --save @compai/css-gui
        </code>
      <h4 sx={{ fontSize: 3, mt: 4 }}>Features</h4>
      <ul
        sx={{
          listStyleType: 'none',
          mb: 7,
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: '1fr 1fr 1fr',
          ml: 0, 
          pl: 0,
        }}
      >
        <li>Controls for 258 CSS properties</li>
        <li>+1000 Google Fonts</li>
        <li>Full variable fonts support</li>
        <li>Responsive value arrays</li>
        <li>Theme aware inputs</li>
        <li>Scrubbable number inputs</li>
        <li>Supports all CSS units</li>
        <li>Advanced layer based gradient editor</li>
        <li>Nested elements</li>
        <li>Cubic bezier editor for custom easings</li>
        <li>Style pseudo-elements and pseudo-classes</li>
        <li>Completely open source</li>
      </ul>
      </header>
      <section sx={{ pb: 6 }}>
        <header sx={{ mb: 5 }}>
          <h2 sx={{ textAlign: 'center' }}>Demo</h2>
          <p sx={{ fontSize: 3, textAlign: 'center', }}>Previews of CSS controls</p>
        </header>
        <div sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(24rem, 1fr))', gap: '4rem', px: [4,5,5], maxWidth: '114em', mx: 'auto', }}>
          <FontSizePreview />
          <FontFamilyPreview />
          <TextAlignPreview />
          <ColorPreview />
          <BackgroundImagePreview />
          <BackgroundPreview />
          <BorderRadiusPreview />
          <WidthPreview />
          <HeightPreview />
          <FilterPreview />
          <CursorPreview />
        </div>
      </section>
    </div>
  )
}
