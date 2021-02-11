import React from 'react'
import { useScrollEvent } from '../../hooks/useScrollEvent'
import * as Dom from '../../utils/dom'
import * as EventManager from '../../utils/event-manager'

import './index.scss'

export const ScrollerIndicator = () => {
  const onScroll = () => {
    let bodyScrollTop =
      document.body.scrollTop || document.documentElement.scrollTop
    let viewportHeight = window.innerHeight
    let totalBodyHeight = document.body.clientHeight
    let scrollArea = totalBodyHeight - viewportHeight
    let scrollPercentage = Math.round((100 / scrollArea) * bodyScrollTop)

    const displayElement = Dom.getElement('.scroll-indicator-display')
    displayElement.textContent = `${scrollPercentage}%`
  }

  useScrollEvent(() => {
    return EventManager.toFit(onScroll, {})()
  })

  return (
    <div className="scroll-indicator-wrapper">
      <div className="scroll-indicator-display">0%</div>
    </div>
  )
}
