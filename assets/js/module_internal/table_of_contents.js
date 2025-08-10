import { $, $$, byId } from "./helper"

export function tocHandler() {
  const header = $('.header')
  const OFFSET = header?.offsetHeight + 50 || 80

  const tocLinks = $$('#TableOfContents a')
  const headings = Array.from(tocLinks)
    .map(link => {
      const id = link.getAttribute('href')?.slice(1)
      return byId(id)
    })
    .filter(Boolean)

  function onScroll() {
    let activeIndex = -1
    headings.forEach((heading, index) => {
      const rect = heading.getBoundingClientRect()
      if (rect.top <= OFFSET) {
        activeIndex = index
      }
    })

    tocLinks.forEach(link => link.classList.remove('isActive'))
    if (activeIndex >= 0) {
      tocLinks[activeIndex].classList.add('isActive')
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}
