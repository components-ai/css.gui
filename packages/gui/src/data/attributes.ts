const GLOBAL_ATTRIBUTES = ['class', 'id', 'title']

export const ATTRIBUTE_MAP: Record<string, string[]> = {
  a: [...GLOBAL_ATTRIBUTES, 'href', 'target'],
  button: ['disabled'],
  img: [...GLOBAL_ATTRIBUTES, 'src', 'alt'],
  input: [...GLOBAL_ATTRIBUTES, 'type', 'name', 'disabled', 'required'],
  h1: GLOBAL_ATTRIBUTES,
  h2: GLOBAL_ATTRIBUTES,
  h3: GLOBAL_ATTRIBUTES,
  h4: GLOBAL_ATTRIBUTES,
  h5: GLOBAL_ATTRIBUTES,
  h6: GLOBAL_ATTRIBUTES,
  p: GLOBAL_ATTRIBUTES,
  span: GLOBAL_ATTRIBUTES,
  div: GLOBAL_ATTRIBUTES,
}