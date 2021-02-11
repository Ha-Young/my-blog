import { Link } from 'gatsby'
import React from 'react'
import kebabCase from 'lodash/kebabCase'

import './index.scss'

export const Tag = ({ tag, onClick, totalCount }) => {
  return (
    <li className="post-tag">
      <Link to={`/tags/${kebabCase(tag)}/`}>
        <div className="post-tag-content" onClick={onClick}>
          {tag}
          {totalCount && <span className="totalCount">{totalCount}</span>}
        </div>
      </Link>
    </li>
  )
}
