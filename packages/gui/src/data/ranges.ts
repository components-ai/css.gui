import {
  AbsoluteLengthUnits,
  FontRelativeLengthUnits,
  PercentageLengthUnits,
  ViewportPercentageLengthUnits,
} from '../types/css'

export type UnitRanges = Record<string, [number, number]>

// TODO: Make this take a px for min/max and derive other ranges
export const positiveRanges = (): UnitRanges => {
  return {
    [AbsoluteLengthUnits.Px]: [0, 128],
    [AbsoluteLengthUnits.Cm]: [0, 32],
    [AbsoluteLengthUnits.Mm]: [0, 128],
    [AbsoluteLengthUnits.In]: [0, 32],
    [AbsoluteLengthUnits.Pc]: [0, 32],
    [AbsoluteLengthUnits.Pt]: [0, 2056],
    [FontRelativeLengthUnits.Em]: [0, 8],
    [FontRelativeLengthUnits.Rem]: [0, 8],
    [ViewportPercentageLengthUnits.Vh]: [0, 128],
    [ViewportPercentageLengthUnits.Vw]: [0, 128],
    [ViewportPercentageLengthUnits.VMin]: [0, 128],
    [ViewportPercentageLengthUnits.VMax]: [0, 128],
    [PercentageLengthUnits.Pct]: [0, 100],
  }
}
