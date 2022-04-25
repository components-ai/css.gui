import * as React from 'react'
import { ResponsiveInput } from './Input'
import { LengthInput } from '../Length/Input'
export enum DimensionState {
  ALL = 'all',
  XY = 'xy',
  TLBR = 'tblr'
}

export const DimensionsInput = ({
  value,
  onChange,
  label,
  componentProps,
  property
}: any) => {
  // { value: 16, unit: 'px' }  // all

  // {  // xy
  //   x: { value: 16, unit: 'px' },
  //   y: { value: 16, unit: 'px' },
  // }
  
  // { //xy responsive
  //   x: [ 
  //    { value: 16, unit: 'px' }, 
  //    { value: 16, unit: 'px' },
  //    { value: 16, unit: 'px' }
  //   ],
  //   y: { value: 16, unit: 'px' },
  // }
  const [dimensionState, setDimensionState] = React.useState<DimensionState>(DimensionState.ALL)

  React.useEffect(() => {
    // set dimensions state based on length of value (All, XY, TLBR)
    setDimensionState(DimensionState.ALL)
  }, [])

  const handleDimensionStateSwitch = (newState: DimensionState) => {
    const v = dimensionState === DimensionState.XY 
      ? value['X']
      : dimensionState === DimensionState.TLBR
        ? value['Top']
        : value
    switch (newState) {
      case DimensionState.ALL:
        onChange(v)
        break
      case DimensionState.XY:
        onChange({ 
          X: v,
          Y: v
        })
        break
      case DimensionState.TLBR:
        onChange({
          Top: v,
          Left: v,
          Bottom: v,
          Right: v
        })
        break
    }
  }

  return (
    <>
      <label sx={{ display: 'block'}}>{label}</label>
      {[DimensionState.ALL, DimensionState.XY, DimensionState.TLBR].map((k) => {
        return (
          <label key={k}>
            <input
              type="radio"
              name="dimensions"
              value={value}
              id={k}
              onChange={() => {
                handleDimensionStateSwitch(k)
                setDimensionState(k)
              }}
            />
            {k}
          </label>
        )
      })}
      {dimensionState === DimensionState.ALL && (
        <ResponsiveInput
          label={'A'}
          property={property}
          value={value}
          onChange={onChange}
          Component={LengthInput}
          componentProps={componentProps}
        />
      )}
      {dimensionState === DimensionState.XY && (
        <>
          <ResponsiveInput
            label={`X`}
            property={`${property}X`}
            value={value['X']}
            onChange={(newValue: any) => {
              onChange({ ...value, X: newValue })
            }}
            Component={LengthInput}
            componentProps={componentProps}
          />
          <ResponsiveInput
            label={`Y`}
            property={`${property}Y`}
            value={value['Y']}
            onChange={(newValue: any) => {
              onChange({ ...value, Y: newValue })
            }}
            Component={LengthInput}
            componentProps={componentProps}
          />
        </>
      )}
      {dimensionState === DimensionState.TLBR && (
        <>
          <ResponsiveInput
            label={`Top`}
            property={`${property}Top`}
            value={value['Top']}
            onChange={(newValue: any) => {
              onChange({ ...value, Top: newValue })
            }}
            Component={LengthInput}
            componentProps={componentProps}
          />
          <ResponsiveInput
            label={`Left`}
            property={`${property}Left`}
            value={value['Left']}
            onChange={(newValue: any) => {
              onChange({ ...value, Left: newValue })
            }}
            Component={LengthInput}
            componentProps={componentProps}
          />
          <ResponsiveInput
            label={`Bottom`}
            property={`${property}Bottom`}
            value={value['Bottom']}
            onChange={(newValue: any) => {
              onChange({ ...value, Bottom: newValue })
            }}
            Component={LengthInput}
            componentProps={componentProps}
          />
          <ResponsiveInput
            label={`Right`}
            property={`${property}Right`}
            value={value['Right']}
            onChange={(newValue: any) => {
              onChange({ ...value, Right: newValue })
            }}
            Component={LengthInput}
            componentProps={componentProps}
          />
        </>
      )}
    </>
  )
}