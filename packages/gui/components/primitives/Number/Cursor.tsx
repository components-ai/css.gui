import { forwardRef } from 'react'
import { CursorProps } from './types'

const InternalCursor = ({ x, y }: CursorProps, ref: any) => {
  return (
    <svg
      ref={ref}
      width="35px"
      height="35px"
      viewBox="0 0 35 35"
      version="1.1"
      style={{
        position: 'absolute',
        top: -17.5,
        left: -17.5,
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      <g stroke="none" strokeWidth="1">
        <path
          d="M9,17.9907 L9,17.9957 L14.997,23.9917 L14.998,19.9927 L16.997,19.9927 L19.017,19.9927 L19.017,23.9927 L24.997,17.9917 L19.017,11.9927 L19.018,16.0117 L16.997,16.0137 L14.997,16.0137 L14.998,11.9917 L9,17.9907 Z M10.411,17.9937 L13.998,14.4057 L13.997,16.9927 L17.497,16.9927 L20.018,16.9927 L20.018,14.4077 L23.583,17.9937 L20.019,21.5787 L20.018,18.9937 L17.497,18.9937 L13.998,18.9927 L13.997,21.5787 L10.411,17.9937 Z"
          fill="#FFFFFF"
          strokeWidth="1"
        />
        <path
          d="M17.4971,18.9932 L20.0181,18.9932 L20.0181,21.5792 L23.5831,17.9932 L20.0181,14.4082 L20.0181,17.0132 L17.4971,17.0132 L13.9971,17.0132 L13.9971,14.4062 L10.4111,17.9932 L13.9971,21.5792 L13.9971,18.9922 L17.4971,18.9932 Z"
          fill="#000000"
        />
      </g>
    </svg>
  )
}

export const Cursor = forwardRef(InternalCursor)
