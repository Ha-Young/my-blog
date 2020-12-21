import React, { useCallback, useRef, useEffect } from 'react'
import { rhythm } from '../../utils/typography'
import './index.scss'
import { Item } from './item'

const CATEGORY_CONTAINER_CLASSNAME = "category-container"
const CATEGORY_WRAPPER = "category-wrapper"

export const Category = ({ categories, category, selectCategory }) => {
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)
  let observer = useRef(null)

  const scrollToCenter = useCallback(tabRef => {
    const { offsetWidth: tabWidth } = tabRef.current
    const { scrollLeft, offsetWidth: containerWidth } = containerRef.current
    const tabLeft = tabRef.current.getBoundingClientRect().left
    const containerLeft = containerRef.current.getBoundingClientRect().left
    const refineLeft = tabLeft - containerLeft
    const targetScollX = scrollLeft + refineLeft - (containerWidth / 2) + (tabWidth / 2)

    containerRef.current.scroll({ left: targetScollX, top: 0, behavior: 'smooth' })
  }, [containerRef])

  useEffect(() => {
    observer = new IntersectionObserver(
      ([e]) => {
        e.target.classList.toggle('isTop', e.intersectionRatio < 1)

        if (e.target.classList.contains('isTop')) {
          e.target.children[0] && (e.target.children[0].style.width = null)
        } else {
          e.target.children[0] && (e.target.children[0].style.width = rhythm(26))
        }

      },
      { threshold: [1] }
    );

    observer.observe(wrapperRef.current)

    return function () {
      observer.unobserve(wrapperRef.current)
    };
  }, []);

  return (
    <div className={CATEGORY_WRAPPER} ref={wrapperRef}>
      <ul
        ref={containerRef}
        className={CATEGORY_CONTAINER_CLASSNAME}
        role="tablist"
        id="category"
        style={{
          margin: `0 -${rhythm(3 / 4)}`,
          width: rhythm(26)
        }}
      >
        <Item title={'All'} selectedCategory={category} onClick={selectCategory} scrollToCenter={scrollToCenter} />
        {categories.map((title, idx) => (
          <Item
            key={idx}
            title={title}
            selectedCategory={category}
            onClick={selectCategory}
            scrollToCenter={scrollToCenter}
          />
        ))}
      </ul>
    </div>
  )
}
