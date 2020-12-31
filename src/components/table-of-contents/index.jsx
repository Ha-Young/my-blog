import React from 'react'

import * as Dom from '../../utils/dom'

import './index.scss'

export const TableOfContents = ({ toc }) => {
  const onClickTOCOpen = e => {
    const tocContent = e.target.previousSibling
    if (tocContent) {
      Dom.addClass(tocContent, 'open')
    }
  }
  return (
    <div className="toc-wrapper">
      <div
        className="toc-content"
        dangerouslySetInnerHTML={{ __html: toc }}
      ></div>
      <div className="toc-open-btn" onClick={onClickTOCOpen}></div>
    </div>
  )
}
