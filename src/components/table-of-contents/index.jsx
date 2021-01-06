import React, { useEffect, useRef } from 'react'

import * as Dom from '../../utils/dom'
import { className } from '../../constants/className'

import './index.scss'
import {} from 'react'
import { useActiveEntry } from '../../hooks/useActiveEntry'

// TOC 읽은 주제 표시
// @copyright https://codepen.io/Radiergummi/pen/bjEZMO
// https://blueshw.github.io/2020/05/30/table-of-contents/
// https://whywhyy.me/blog/2020/06/10/%EA%B3%A0%EC%98%A4%EA%B8%89%20%EB%AA%A9%EC%B0%A8(Table%20of%20Contents)%EC%9D%84%20%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90#%EB%AA%A9%ED%91%9C
function getHeaderElements() {
  console.log('getHeaderElements')

  const headerSelectors = [
    `.${className.post_content} h2`,
    `.${className.post_content} h3`,
    `.${className.post_content} h4`,
    `.${className.post_content} h5`,
    `.${className.post_content} h6`,
  ]

  let headerElements = []

  headerSelectors.forEach(selector => {
    const headerNodeList = Dom.getElements('a')
    console.log(headerNodeList)
    headerElements = headerElements.concat(
      Array.from(Dom.getElements(selector))
    )
    console.log('headerElements', headerElements)
  })

  return headerElements
}

function onClickTOCOpen(e) {
  const tocContent = e.target.previousSibling
  if (tocContent) {
    const isOpen = Dom.togleClass(tocContent, 'open')
    // TOC를 최상단에 오게하기위해 최상단에 위치해져있는 Element들의 z-index를 낮춰야 함.
    const headerElementList = getHeaderElements()
    const postTopestElementList = headerElementList.concat(
      Array.from(Dom.getElements('.' + className.gatsby_plugin.post_img))
    )
    console.log(postTopestElementList)
    const guidedZIndex = isOpen ? -1 : 'auto'

    postTopestElementList.forEach(postTopestElement => {
      postTopestElement.style.zIndex = guidedZIndex
    })

    const themeSwitch = Dom.getElement(`.${className.theme_switch}`)
    const guidedOpacity = isOpen ? 0 : 1

    themeSwitch.style.opacity = guidedOpacity
  }
}

export const TableOfContents = ({ toc }) => {
  const activeElement = useActiveEntry(getHeaderElements())
  console.log(activeElement)
  useEffect(() => {
    console.log('asdf')
  }, [])

  return (
    <div className="toc-container">
      <div className="toc-wrapper">
        <div className="toc-content">
          <div className="toc" dangerouslySetInnerHTML={{ __html: toc }} />
        </div>
        <div className="toc-open-btn" onClick={onClickTOCOpen}></div>
      </div>
    </div>
  )
}
