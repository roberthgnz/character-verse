import { useCallback, useEffect, useRef } from "react"

interface UseScrollToBottomOptions {
  smooth?: boolean
}

export const useScrollToBottom = <T extends HTMLElement>(
  options: UseScrollToBottomOptions = {}
) => {
  const { smooth = true } = options
  const containerRef = useRef<T | null>(null)

  const getScrollableChild = useCallback((element: T | null): T | null => {
    if (!element) return null

    const isScrollable = (el: T) => {
      const hasScrollableContent = el.scrollHeight > el.clientHeight
      const overflowYStyle = window.getComputedStyle(el).overflowY
      const isOverflowHidden = overflowYStyle.indexOf("hidden") !== -1

      return hasScrollableContent && !isOverflowHidden
    }

    if (isScrollable(element)) {
      return element
    }

    for (const child of Array.from(element.children)) {
      const scrollableChild = getScrollableChild(child as T)
      if (scrollableChild) {
        return scrollableChild
      }
    }

    return null
  }, [])

  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      const scrollableElement = getScrollableChild(containerRef.current)

      if (scrollableElement) {
        const { scrollHeight } = scrollableElement

        scrollableElement.scrollTo({
          top: scrollHeight,
          behavior: smooth ? "smooth" : "auto",
        })
      }
    }
  }, [smooth, getScrollableChild])

  useEffect(() => {
    scrollToBottom()
  }, [scrollToBottom])

  return { ref: containerRef, scrollToBottom }
}
