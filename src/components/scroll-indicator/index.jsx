import React from 'react'
import { useEffect } from 'react'
import { useScrollEvent } from '../../hooks/useScrollEvent'
import * as Dom from '../../utils/dom'
import * as EventManager from '../../utils/event-manager'

import './index.scss'

const INDICATOR_CLSNAME = 'data-indicator'

function getBodyScrollTop() {
  return document.body.scrollTop || document.documentElement.scrollTop
}

function getScrollArea() {
  const viewportHeight = window.innerHeight
  const totalBodyHeight = document.body.clientHeight
  return totalBodyHeight - viewportHeight
}

function getScrollPercent() {
  const bodyScrollTop = getBodyScrollTop()
  const scrollArea = getScrollArea()
  return Math.round((bodyScrollTop / scrollArea) * 100)
}

function viewScrollPercent() {
  const scrollPercentage = getScrollPercent()

  const displayElement = Dom.getElement('.scroll-indicator-mini')
  displayElement.textContent = `${scrollPercentage}%`

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
    const scrollArea = getScrollArea()
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
      {isFixed ? (
        <>
          <div className="scroll-indicator-mini fixed">0%</div>
          <div className="scroll-indicator fixed"></div>
        </>
      ) : (
        <>
          <div className="scroll-indicator-mini">0%</div>
          <div className="scroll-indicator"></div>
        </>
      )}
    </div>
  )
}
