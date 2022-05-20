import { HtmlEditor } from '@compai/css-gui'
const initialValue = {
  tagName: 'div',
  children: [
    'hello',
    'world',
    {
      tagName: 'div',
      children: ['hello'],
    },
  ],
}

export default function HtmlEditorExample() {
  return <HtmlEditor value={initialValue} />
}
