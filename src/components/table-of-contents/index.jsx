import React from 'react'

import * as Dom from '../../utils/dom'

import './index.scss'

// TOC 읽은 주제 표시
// @copyright https://codepen.io/Radiergummi/pen/bjEZMO

export const TableOfContents = ({ toc }) => {
  const onClickTOCOpen = e => {
    const tocContent = e.target.previousSibling
    if (tocContent) {
      Dom.togleClass(tocContent, 'open')
    }
  }
  return (
    <div className="toc-container">
      <div className="toc-wrapper">
        <div
          className="toc-content"
          dangerouslySetInnerHTML={{ __html: toc }}
        ></div>
        <div className="toc-open-btn" onClick={onClickTOCOpen}></div>
      </div>
    </div>
  )
}
