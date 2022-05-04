import { HTMLAttributes } from 'react'
import { elements } from '../data/elements'
import { RenderElement } from './RenderElement'

type StyledProps = HTMLAttributes<HTMLBaseElement> & {
  styles: any
}
export const styled: Record<string, any> = {}
elements.forEach((field: string) => {
  styled[field] = ({ styles, ...props }: StyledProps) => (
    <RenderElement tagName={field} styles={styles} {...props} />
  )
})
