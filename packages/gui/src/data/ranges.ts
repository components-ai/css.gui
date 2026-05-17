import {
  AbsoluteLengthUnits,
  ContainerQueryLengthUnits,
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
    [FontRelativeLengthUnits.Cap]: [0, 8],
    [FontRelativeLengthUnits.Em]: [0, 8],
    [FontRelativeLengthUnits.Rem]: [0, 8],
    [FontRelativeLengthUnits.Ic]: [0, 8],
    [FontRelativeLengthUnits.Lh]: [0, 8],
    [FontRelativeLengthUnits.Rlh]: [0, 8],
    [ViewportPercentageLengthUnits.Dvb]: [0, 128],
    [ViewportPercentageLengthUnits.Dvh]: [0, 128],
    [ViewportPercentageLengthUnits.Dvi]: [0, 128],
    [ViewportPercentageLengthUnits.Dvw]: [0, 128],
    [ViewportPercentageLengthUnits.Lvb]: [0, 128],
    [ViewportPercentageLengthUnits.Lvh]: [0, 128],
    [ViewportPercentageLengthUnits.Lvi]: [0, 128],
    [ViewportPercentageLengthUnits.Lvw]: [0, 128],
    [ViewportPercentageLengthUnits.Svb]: [0, 128],
    [ViewportPercentageLengthUnits.Svh]: [0, 128],
    [ViewportPercentageLengthUnits.Svi]: [0, 128],
    [ViewportPercentageLengthUnits.Svw]: [0, 128],
    [ViewportPercentageLengthUnits.Vb]: [0, 128],
    [ViewportPercentageLengthUnits.Vh]: [0, 128],
    [ViewportPercentageLengthUnits.Vi]: [0, 128],
    [ViewportPercentageLengthUnits.Vw]: [0, 128],
    [ViewportPercentageLengthUnits.VMin]: [0, 128],
    [ViewportPercentageLengthUnits.VMax]: [0, 128],
    [ContainerQueryLengthUnits.Cqb]: [0, 128],
    [ContainerQueryLengthUnits.Cqh]: [0, 128],
    [ContainerQueryLengthUnits.Cqi]: [0, 128],
    [ContainerQueryLengthUnits.Cqmax]: [0, 128],
    [ContainerQueryLengthUnits.Cqmin]: [0, 128],
    [ContainerQueryLengthUnits.Cqw]: [0, 128],
    [PercentageLengthUnits.Pct]: [0, 100],
  }
}
