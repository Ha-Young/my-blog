import React from 'react'
import { Tag } from '../tag'

import './index.scss'

export const Tags = ({ tags }) => {
  return (
    <ul className="post-tags">
      {tags.map((tag, idx) => (
        <Tag key={idx} tag={tag} />
      ))}
    </ul>
  )
}
