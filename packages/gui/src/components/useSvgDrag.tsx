import { useRef, useEffect } from 'react'

/**
 * Hook that provides functionality for dragging an SVG element.
 * @param ctmFn a reference to the SVG DOMMatrix to use when translating coordinates.
 * @param onDrag the callback that is called when the element is dragged. Passes in the current SVG coordinates.
 * @returns the handlers to apply to the component.
 */
export function useSvgDrag(
  ctmFn: () => DOMMatrix | undefined,
  onDrag: ({ x, y }: { x: number; y: number }) => void
) {
  const isDragging = useRef(false)

  function drag(e: MouseEvent) {
    const ctm = ctmFn()
    if (ctm && isDragging.current) {
      const x = (e.clientX - ctm.e) / ctm.a
      const y = (e.clientY - ctm.f) / ctm.d
      onDrag({ x, y })
    }
  }

  function onMouseDown() {
    isDragging.current = true
  }

  function onMouseUp() {
    isDragging.current = false
  }

  function onMouseMove(e: MouseEvent) {
    if (isDragging.current) {
      drag(e)
    }
  }

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mousemove', onMouseMove)

    return () => {
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mousemove', onMouseMove)
    }
  })

  // Return a spread of handlers to apply to the SVG object to make draggable
  return { onMouseDown }
}
