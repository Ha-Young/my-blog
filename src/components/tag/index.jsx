import { Link } from 'gatsby'
import React from 'react'
import kebabCase from 'lodash/kebabCase'

import './index.scss'

export const Tag = ({ tag, onClick }) => {
  return (
    <li className="tag">
      <Link to={`/tags/${kebabCase(tag)}/`}>
        <div onClick={onClick}>{tag}</div>
      </Link>
    </li>
  )
}
