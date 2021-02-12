import React from 'react'
import { useScrollEvent } from '../../../hooks/useScrollEvent'
import * as EventManager from '../../../utils/event-manager'
import * as Dom from '../../../utils/dom'

import './index.scss'

export const ScrollIndicatorMini = ({ isOnPage }) => {
  const onScroll = () => {
    const scrollPercentage = Dom.getScrollPercent()

    const displayElement = Dom.getElement('.scroll-indicator-mini')
    displayElement.textContent = `${scrollPercentage}%`
  }

  useScrollEvent(() => {
    return EventManager.toFit(onScroll, {})()
  })

  return isOnPage ? (
    <div className="scroll-indicator-mini on-page">0%</div>
  ) : (
    <div className="scroll-indicator-mini on-content">0%</div>
  )
}
