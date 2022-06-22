import { HtmlNode } from '../types'

export type Prop = {
  name: string
  type: 'string' | 'number'
  defaultValue?: string | number
}

export type Props = Prop[]

export type Component = {
  id: string
  name?: string
  props: Props
  value: HtmlNode
}
