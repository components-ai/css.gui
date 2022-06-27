import { Root } from '@radix-ui/react-label'
import { HTMLAttributes } from 'react'

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  htmlFor?: string
}
export const Label = (props: LabelProps) => {
  return (
    <Root {...props} sx={{ userSelect: 'none', fontSize: 0, fontWeight: 500, display: 'block' }} />
  )
}
