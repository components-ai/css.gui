import Link from 'next/link'
import { FontFamilyPreview } from '../components/examples/FontFamilyPreview'
import { FontSizePreview } from '../components/examples/FontSizePreview'
import { ColorPreview } from '../components/examples/ColorPreview'
import { ColorsPreview } from '../components/examples/ColorsPreview'
import { ColorPairPreview } from '../components/examples/ColorPairPreview'
import { WidthPreview } from '../components/examples/WidthPreview'
import { HeightPreview } from '../components/examples/HeightPreview'
import { BackgroundImagePreview } from '../components/examples/BackgroundImagePreview'
import { BackgroundPreview } from '../components/examples/BackgroundPreview'
import { BackgroundBlendModePreview } from '../components/examples/BackgroundBlendModePreview'
import { BorderRadiusPreview } from '../components/examples/BorderRadiusPreview'
import { BoxShadowPreview } from '../components/examples/BoxShadowPreview'
import { TextShadowPreview } from '../components/examples/TextShadowPreview'
import { TextAlignPreview } from '../components/examples/TextAlignPreview'
import { FilterPreview } from '../components/examples/FilterPreview'
import { CursorPreview } from '../components/examples/CursorPreview'
import { LinkPreview } from '../components/examples/LinkPreview'
import pkg from '../../../packages/gui/package.json'

export default function Docs() {
  return (
    <div>
      <header sx={{ pt: [5,6,7], display: 'block', px: 5,  }}>
        <h1 sx={{ fontSize: [4,6,8], my: 0, lineHeight: 1, maxWidth: '100%', overflow: 'hidden', }}>
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
        maxWidth: '40em',
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))', 
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
        <div sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))', gap: '2rem', px: [4,5,5], }}>
          <FontSizePreview />
          <FontFamilyPreview />
          <TextAlignPreview />
          <ColorPreview />
          <BackgroundImagePreview />
          <BackgroundPreview />
          <BackgroundBlendModePreview />
          <BorderRadiusPreview />
          <FilterPreview />
        
        </div>
<Link href="/properties" passHref={true}>
          <a
            sx={{
              fontWeight: 500,
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gridColumn: 'span 3',
              mt: 5,
              mx: 'auto',
              py: 3,
              px: 4,
              bg: '#675bff',
              borderRadius: '6px',
              transition: 'background-color .2s ease-in-out',
              maxWidth: '16em',
              textAlign: 'center',
              ':hover': {
                bg: '#3e38b0'
              }
            }}
          >
            <span>
              View more properties
            </span>
          </a>
        </Link>
      </section>
      <section sx={{ display: 'none', pb: 6, px: [4,5,5]  }}>
        <header sx={{ mb: 5 }}>
          <h2 sx={{ textAlign: 'center' }}>Composable</h2>
          <p sx={{ fontSize: 3, textAlign: 'center', }}>
            Mix and match controls to create your own custom component design interfaces. 
          </p>
        </header>
        <div sx={{
          display: 'flex',
          gap: '8em',
          }}>
          <ColorPairPreview />
          <ColorsPreview />
        </div>
          <LinkPreview />
        </section>
    </div>
  )
}
