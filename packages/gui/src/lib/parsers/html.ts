import { htmlToEditorSchema } from '../transformers'

export const html = (htmlString: string) => {
  // TODO: Use unified to wrap and remove doctype
  const fullString = `<div><div>${htmlString.replace(
    '<!DOCTYPE html>',
    ''
  )}</div></div>`
  const data = htmlToEditorSchema(fullString)
  return data
}
