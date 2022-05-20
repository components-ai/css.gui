import { HtmlEditor, HtmlRenderer } from '@compai/css-gui'
const initialValue: any = {
  tagName: 'div',
  children: [
    'hello',
    'world',
    {
      tagName: 'span',
      children: ['hello'],
    },
  ],
}

export default function HtmlEditorExample() {
  return (
    <div sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <HtmlEditor value={initialValue} />
      <HtmlRenderer value={initialValue} />
    </div>
  )
}
