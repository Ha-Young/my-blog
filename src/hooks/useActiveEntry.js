// copyright @gatsby
import { useEffect, useState } from 'react'

export function useActiveEntry(observedElements, rootMargin = undefined) {
  const [activeEntry, setActiveEntry] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveEntry(entry)
          }
        })
      },
      { rootMargin: rootMargin || `0% 0% -85% 0%` }
    )

    observedElements.forEach(element => {
      observer.observe(element)
    })

    return () => {
      observedElements.forEach(element => {
        observer.unobserve(element)
      })
    }
  }, [observedElements, rootMargin])

  return activeEntry
}
