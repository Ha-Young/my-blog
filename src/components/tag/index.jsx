import React from 'react'

import './index.scss'

export const Tag = ({ tag, onClick }) => {
  return (
    <li className="tag">
      <div onClick={onClick}>{tag}</div>
    </li>
  )
}
