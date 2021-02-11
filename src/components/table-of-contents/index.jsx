import React, { useEffect } from 'react'

import * as Dom from '../../utils/dom'
import { className } from '../../constants/className'
import { useScrollEvent } from '../../hooks/useScrollEvent'
import * as EventManager from '../../utils/event-manager'

import './index.scss'

// TOC 읽은 주제 표시
// @copyright
// https://blueshw.github.io/2020/05/30/table-of-contents/
// https://whywhyy.me/blog/2020/06/10/%EA%B3%A0%EC%98%A4%EA%B8%89%20%EB%AA%A9%EC%B0%A8(Table%20of%20Contents)%EC%9D%84%20%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90#%EB%AA%A9%ED%91%9C
const HEADER_OFFSET_Y = 180

function getHeaderElements() {
  const headerSelectors = `.${className.post_content} > h2, h3, h4, h5, h6`
  return Array.from(Dom.getElements(headerSelectors))
}

function getElementTopPos(element) {
  const currentoffsetY = window.pageYOffset
  const { top } = element.getBoundingClientRect()

  return top + currentoffsetY
}

function toggleTOCContent(tocContent) {
  if (tocContent) {
    const isOpen = Dom.togleClass(tocContent, 'open')

    // TOC를 최상단에 오게하기위해 최상단에 위치해져있는 Element들의 z-index를 낮춰야 함.
    const headerElementList = getHeaderElements()
    const postTopestElementList = headerElementList.concat(
      Array.from(Dom.getElements('.' + className.gatsby_plugin.post_img))
    )

    const guidedZIndex = isOpen ? -1 : 'auto'

    postTopestElementList.forEach(postTopestElement => {
      postTopestElement.style.zIndex = guidedZIndex
    })

    const isDisplay = isOpen ? 'none' : 'block'
    const themeSwitch = Dom.getElement(`.${className.theme_switch}`)
    themeSwitch.style.display = isDisplay
    const authorContent = Dom.getElement(`.${className.author_name_content}`)
    const postNavigator = Dom.getElement(`.${className.post_navigator}`)

    const footerElements = [authorContent, postNavigator]

    for (const footerElement of footerElements) {
      // footerElement.style.display = isDisplay
    }
  }
}

function onClickTOCOpen(e) {
  const tocContent = e.target.nextSibling
  toggleTOCContent(tocContent)
}

function onClickTOCClose(e) {
  const tocContent = e.currentTarget.parentNode
  toggleTOCContent(tocContent)
}

function getTOCHrefPullPath(headerID) {
  return `${window.location.pathname}#${encodeURI(headerID)}`
}

export const TableOfContents = ({ toc }) => {
  const onScroll = () => {
    const currentoffsetY = window.pageYOffset
    const headerElements = getHeaderElements()
    for (const headerElement of headerElements) {
      if (!!headerElement.id === false) continue // id가 없으면 패스(markdown에서 잘못 적은 것)
      const headerElementTop = getElementTopPos(headerElement)
      const href = getTOCHrefPullPath(headerElement.id)
      const tocLinkElement = Dom.getElement(`a[href="${href}"]`)

      if (currentoffsetY >= headerElementTop - HEADER_OFFSET_Y) {
        headerElement.classList.add('toc-header-active')
        tocLinkElement.classList.add('toc-active')
      } else {
        headerElement.classList.remove('toc-header-active')
        tocLinkElement.classList.remove('toc-active')
      }
    }
  }

  useScrollEvent(() => {
    return EventManager.toFit(onScroll, {})()
  })

  useEffect(() => {
    const headerElements = getHeaderElements()

    headerElements.forEach(headerElement => {
      headerElement.classList.add('toc-header') // active 애니메이션 효과를 위해 사전에 클래스 추가

      const headerElementTop = getElementTopPos(headerElement)
      const tocLinkElement = Dom.getElement(
        `a[href="${getTOCHrefPullPath(headerElement.id)}"]`
      )

      if (tocLinkElement)
        tocLinkElement.addEventListener('click', e => {
          e.preventDefault()
          window.scroll({ top: headerElementTop, behavior: 'smooth' })
        })
    })
  })

  return (
    <div className="toc-container">
      <div className="toc-wrapper">
        <div className="toc-open-btn" onClick={onClickTOCOpen}></div>
        <div className="toc-content">
          <div className="toc-close-btn" onClick={onClickTOCClose}>
            <span className="toc-close-icon"></span>
          </div>
          <div className="toc" dangerouslySetInnerHTML={{ __html: toc }} />
        </div>
      </div>
    </div>
  )
}
