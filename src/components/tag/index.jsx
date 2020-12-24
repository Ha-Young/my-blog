import { Link } from 'gatsby'
import React from 'react'
import kebabCase from 'lodash/kebabCase'

import './index.scss'

export const Tag = ({ tag, onClick, totalCount }) => {
  return (
    <li className="tag">
      <Link to={`/tags/${kebabCase(tag)}/`}>
        <div className="tag-content" onClick={onClick}>
          {tag}
          {totalCount && <span class="totalCount">{totalCount}</span>}
        </div>
      </Link>
    </li>
  )
}
