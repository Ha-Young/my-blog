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
      // TOC를 최상단에 오게하기위해 gatsby-remark-img가 적용된 img에 대해 z-index를 낮춰야 함.
      const postImgElements = Dom.getElements(className.gatsby_plugin.post_img)
      const postImgZIndex = isOpen ? -1 : 1

      console.log(postImgElements)

      postImgElements.forEach(postImgElement => {
        postImgElement.style.zIndex = postImgZIndex
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
