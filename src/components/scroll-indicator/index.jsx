import React from 'react'
import { useEffect } from 'react'
import { useScrollEvent } from '../../hooks/useScrollEvent'
import { ScrollIndicatorMini } from './scroll-indicator-mini'
import * as Dom from '../../utils/dom'
import * as EventManager from '../../utils/event-manager'

import './index.scss'

const INDICATOR_CLSNAME = 'data-indicator'

function viewScrollPercent() {
  const scrollPercentage = Dom.getScrollPercent()
  const scrollNumber = Math.floor(scrollPercentage / 10)

  const indicatorElements = Dom.getElements(`li[data-indicator]`)

  for (let i = 0; i < indicatorElements.length; i++) {
    const indicatorElement = indicatorElements[i]
    if (i === scrollNumber) {
      indicatorElement.classList.add('active')
      const contentElement = indicatorElement.querySelector('a')
      contentElement.textContent = `${scrollPercentage}%`
    } else {
      indicatorElement.removeAttribute('class')
    }
  }
}

export const ScrollerIndicator = ({ isFixed }) => {
  const onScroll = () => {
    viewScrollPercent()
  }

  useScrollEvent(() => {
    return EventManager.toFit(onScroll, {})()
  })

  function onClickScrollIndicator(e) {
    e.preventDefault()
    const scrollPercentage = e.target.parentNode.getAttribute(INDICATOR_CLSNAME)
    const scrollArea = Dom.getScrollArea()
    const destScrollTop = (scrollArea * scrollPercentage) / 100

    window.scroll({ top: destScrollTop, behavior: 'smooth' })
  }

  function init() {
    const scrollIndicator = Dom.getElement('.scroll-indicator')
    const ul = Dom.createElement('ul')

    //build the scroll nav
    for (let i = 0; i < 11; i++) {
      const basePercentage = i * 10
      const li = document.createElement('li')
      const a = document.createElement('a')

      li.setAttribute(INDICATOR_CLSNAME, basePercentage)

      a.textContent = basePercentage
      a.addEventListener('click', onClickScrollIndicator)

      li.appendChild(a)
      ul.appendChild(li)
    }

    scrollIndicator.appendChild(ul)
  }

  useEffect(() => {
    init()
    viewScrollPercent()
  }, [])

  return (
    <div className="scroll-indicator-wrapper">
      <ScrollIndicatorMini />
      <div className="scroll-indicator"></div>
    </div>
  )
}
