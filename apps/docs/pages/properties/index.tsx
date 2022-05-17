import { Type }  from 'react-feather'
import { FontFamilyPreview } from '../../components/examples/FontFamilyPreview'
import { FontSizePreview } from '../../components/examples/FontSizePreview'
import { FontStylePreview } from '../../components/examples/FontStylePreview'
import { LetterSpacingPreview } from '../../components/examples/LetterSpacingPreview'
import { TextTransformPreview } from '../../components/examples/TextTransformPreview'
import { TextIndentPreview } from '../../components/examples/TextIndentPreview'
import { AccentColorPreview } from '../../components/examples/AccentColorPreview'
import { ColorPreview } from '../../components/examples/ColorPreview'
import { BackgroundColorPreview } from '../../components/examples/BackgroundColorPreview'
import { BorderColorPreview } from '../../components/examples/BorderColorPreview'
import { ColorsPreview } from '../../components/examples/ColorsPreview'
import { ColorPairPreview } from '../../components/examples/ColorPairPreview'
import { TextDecorationColorPreview } from '../../components/examples/TextDecorationColorPreview'
import { TextDecorationLinePreview } from '../../components/examples/TextDecorationLinePreview'
import { TextDecorationStylePreview } from '../../components/examples/TextDecorationStylePreview'
import { TextDecorationThicknessPreview } from '../../components/examples/TextDecorationThicknessPreview'
import { WidthPreview } from '../../components/examples/WidthPreview'
import { HeightPreview } from '../../components/examples/HeightPreview'
import { BackgroundImagePreview } from '../../components/examples/BackgroundImagePreview'
import { BackgroundPreview } from '../../components/examples/BackgroundPreview'
import { BackgroundBlendModePreview } from '../../components/examples/BackgroundBlendModePreview'
import { BorderRadiusPreview } from '../../components/examples/BorderRadiusPreview'
import { BorderTopLeftRadiusPreview } from '../../components/examples/BorderTopLeftRadiusPreview'
import { BoxShadowPreview } from '../../components/examples/BoxShadowPreview'
import { TextShadowPreview } from '../../components/examples/TextShadowPreview'
import { TextAlignPreview } from '../../components/examples/TextAlignPreview'
import { FontWeightPreview } from '../../components/examples/FontWeightPreview'
import { FilterPreview } from '../../components/examples/FilterPreview'
import { CursorPreview } from '../../components/examples/CursorPreview'
import { TransitionPreview } from '../../components/examples/TransitionPreview'
import pkg from '../../../../packages/gui/package.json'

// display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(24rem, 1fr))', gap: '4rem', 

export default function Docs() {
  return (
    <div>
      <header sx={{ pt: [5,6,7], mx: 'auto', maxWidth: '1024px', px: 4, textAlign: 'center' }}>
        <h1 sx={{ fontSize: [6,8,'128px'], my: 0, lineHeight: 1.25 }}>
          Properties
        </h1>
        <h2 sx={{ fontWeight: 500, my: 0 }}>
          Preview available controls from the library 
        </h2>
      </header>
      <section sx={{ mt: 6, pb: 6 }}>
        <div sx={{ px: [4,5,5], maxWidth: '114em', mx: 'auto', }}>
          <section sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))', gap: '2rem', }}>
            <FontSizePreview />
            <FontFamilyPreview />
            <FontStylePreview />
            <FontWeightPreview />
            <TextAlignPreview />
            <TextTransformPreview />
            <LetterSpacingPreview />
            <TextIndentPreview />
            <ColorPreview />
            <BackgroundColorPreview />
            <BorderColorPreview />
            <TextDecorationColorPreview />
            <TextDecorationLinePreview />
            <TextDecorationStylePreview />
            <TextDecorationThicknessPreview />
            <AccentColorPreview />
            <BackgroundImagePreview />
            <BackgroundPreview />
            <BackgroundBlendModePreview />
            <BorderRadiusPreview />
            <BoxShadowPreview />
            <TextShadowPreview />
            <FilterPreview />
            <WidthPreview />
            <HeightPreview />
            <CursorPreview />
          </section>
        </div>
      </section>
    </div>
  )
}
