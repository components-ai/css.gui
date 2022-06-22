import { useHtmlEditor } from '../Provider'
import { PropsEditor } from './Props'
import { Component } from './types'

export const ComponentEditor = () => {
  const { components } = useHtmlEditor()
  return (
    <>
      {components.map((comp: Component, index: number) => {
        return (
          <div key={index}>
            <h3>{comp.name || 'Unnamed Component'}</h3>
            <PropsEditor props={comp.props} onChange={console.log} />
          </div>
        )
      })}
    </>
  )
}
