import { ComponentType } from 'react'

/**
 * Bind `props` onto `Component` and create a new component without those props
 */
export function bindProps<P, Q extends Partial<P>>(
  Component: ComponentType<P>,
  props: Omit<P, keyof Q> | ((props: Q) => Omit<P, keyof Q>)
): ComponentType<any> {
  if (typeof props === 'function') {
    return (subProps: Q) => {
      return <Component {...subProps} {...(props(subProps) as any)} />
    }
  }
  // TODO fix this typing
  return (subProps: Q) => {
    return <Component {...subProps} {...(props as any)} />
  }
}
