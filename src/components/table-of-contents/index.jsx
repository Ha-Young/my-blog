import React from 'react'

import * as Dom from '../../utils/dom'
import { className } from '../../constants/className'

import './index.scss'

// TOC 읽은 주제 표시
// @copyright https://codepen.io/Radiergummi/pen/bjEZMO

export const TableOfContents = ({ toc }) => {
  const onClickTOCOpen = e => {
    const tocContent = e.target.previousSibling
    if (tocContent) {
      const isOpen = Dom.togleClass(tocContent, 'open')
      // TOC를 최상단에 오게하기위해 최상단에 위치해져있는 Element들의 z-index를 낮춰야 함.
      const postTopestElementsList = [
        Dom.getElements('.' + className.gatsby_plugin.post_img),
        Dom.getElements(`.${className.post_content} h2`),
        Dom.getElements(`.${className.post_content} h3`),
        Dom.getElements(`.${className.post_content} h4`),
        Dom.getElements(`.${className.post_content} h5`),
        Dom.getElements(`.${className.post_content} h6`),
      ]

      const guidedZIndex = isOpen ? -1 : 'auto'

      postTopestElementsList.forEach(postTopestElements => {
        postTopestElements.forEach(postImgElement => {
          postImgElement.style.zIndex = guidedZIndex
        })
      })
    }
  }

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
