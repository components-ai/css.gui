import { FontFamilyPreview } from '../../components/examples/FontFamilyPreview'
import { FontSizePreview } from '../../components/examples/FontSizePreview'
import { FontStylePreview } from '../../components/examples/FontStylePreview'
import { LetterSpacingPreview } from '../../components/examples/LetterSpacingPreview'
import { TextTransformPreview } from '../../components/examples/TextTransformPreview'
import { ColorPreview } from '../../components/examples/ColorPreview'
import { ColorsPreview } from '../../components/examples/ColorsPreview'
import { ColorPairPreview } from '../../components/examples/ColorPairPreview'
import { WidthPreview } from '../../components/examples/WidthPreview'
import { HeightPreview } from '../../components/examples/HeightPreview'
import { BackgroundImagePreview } from '../../components/examples/BackgroundImagePreview'
import { BackgroundPreview } from '../../components/examples/BackgroundPreview'
import { BackgroundBlendModePreview } from '../../components/examples/BackgroundBlendModePreview'
import { BorderRadiusPreview } from '../../components/examples/BorderRadiusPreview'
import { BoxShadowPreview } from '../../components/examples/BoxShadowPreview'
import { TextShadowPreview } from '../../components/examples/TextShadowPreview'
import { TextAlignPreview } from '../../components/examples/TextAlignPreview'
import { FontWeightPreview } from '../../components/examples/FontWeightPreview'
import { FilterPreview } from '../../components/examples/FilterPreview'
import { CursorPreview } from '../../components/examples/CursorPreview'
import { LinkPreview } from '../../components/examples/LinkPreview'
import pkg from '../../../../packages/gui/package.json'

export default function Docs() {
  return (
    <div>
      <header sx={{ pt: [5,6,7], mx: 'auto', maxWidth: '1024px', px: 4 }}>
        <h1 sx={{ fontSize: [6,8,'128px'], my: 0, lineHeight: 1.25 }}>
          Properties
        </h1>
        <h2 sx={{ fontWeight: 500, my: 0 }}>
          Preview available controls from the library </h2>
      </header>
      <section sx={{ mt: 6, pb: 6 }}>
        <div sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(24rem, 1fr))', gap: '4rem', px: [4,5,5], maxWidth: '114em', mx: 'auto', }}>
          <FontSizePreview />
          <FontFamilyPreview />
          <TextAlignPreview />
          <TextTransformPreview />
          <FontStylePreview />
          <FontWeightPreview />
          <LetterSpacingPreview />
          <ColorPreview />
          <BackgroundImagePreview />
          <BackgroundPreview />
          <BackgroundBlendModePreview />
          <BorderRadiusPreview />
          <BoxShadowPreview />
          <TextShadowPreview />
          <WidthPreview />
          <HeightPreview />
          <FilterPreview />
          <CursorPreview />
        </div>
      </section>
    </div>
  )
}
