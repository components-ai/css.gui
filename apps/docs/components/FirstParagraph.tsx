import { HTMLAttributes } from 'react'

interface FirstParagraphProps extends HTMLAttributes<HTMLDivElement> {}
export const FirstParagraph = (props: FirstParagraphProps) => {
  return (
    <div
      sx={{ fontSize: [2, 3, 4], color: 'muted', lineHeight: 1.4 }}
      {...props}
    />
  )
}
