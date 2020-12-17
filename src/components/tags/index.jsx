import React from 'react'
import { Item } from './item'

import './index.scss'

export const Tags = ({ tags }) => {
  return (
    <ul className="tags">
      {tags.map((tag, idx) => (
        <Item
          key={idx}
          tag={tag}
          onClick={() => {
            console.log(tag, 'clicked')
          }}
        />
      ))}
    </ul>
  )
}
