export const format = async (language: string, src: string) => {
  try {
    const res = await fetch('https://components.ai/api/format', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ format: language, src }),
    })

    const { src: output } = await res.json()
    return output
  } catch (e) {
    return src
  }
}
