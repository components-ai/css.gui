import * as Slider from '@radix-ui/react-slider'
import ColorMarker from './ColorMarker'

interface Props extends Omit<Slider.SliderProps, 'value' | 'onValueChange'> {
  value: number
  onValueChange(val: number): void
  // The element to render for the slider track
  track: JSX.Element
  // The element to render for the slider thumb
  thumb: JSX.Element
}

/**
 * Represents a single-axis slider for a color channel.
 */
export default function ColorSlider({
  value,
  onValueChange,
  track,
  thumb,
  ...props
}: Props) {
  return (
    <Slider.Root
      value={[value]}
      onValueChange={([value]) => {
        onValueChange(value)
      }}
      sx={{ position: 'relative', display: 'flex', alignItems: 'top' }}
      // Stop propagation so this doesn't trigger restyle
      onKeyDown={(e) => e.stopPropagation()}
      {...props}
    >
      <Slider.Track
        sx={{
          position: 'relative',
          display: 'inline-block',
          width: '100%',
          height: '2rem',
        }}
      >
        {track}
      </Slider.Track>
      <Slider.Thumb
        sx={{
          position: 'absolute',
          display: 'block',
          ':focus': {
            transform: 'scale(1.2)',
          },
          /**
           * Radix adjust the thumbs so that they are flush with the end of the track like so:
           *
           * |( )    |
           *
           * But for color pickers, we want the thumb to overflow like this:
           *
           * (|)     |
           *
           * To get this effect, we set the width to zero for Radix and put all the styling in a child
           * of the thumb.
           */
          width: 0,
        }}
      >
        <ColorMarker
          style={{
            position: 'relative',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        >
          {thumb}
        </ColorMarker>
      </Slider.Thumb>
    </Slider.Root>
  )
}
