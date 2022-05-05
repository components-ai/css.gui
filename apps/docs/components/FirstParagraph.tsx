import { HTMLAttributes } from 'react'

interface FirstParagraphProps extends HTMLAttributes<HTMLDivElement> {}
export const FirstParagraph = (props: FirstParagraphProps) => {
  return (
    <div
      sx={{
        p: {
          fontSize: [2, 3, 3],
          color: 'muted',
          lineHeight: 1.5,
          maxWidth: '42em',
        },
      }}
      {...props}
    />
  )
}
