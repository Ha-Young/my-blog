import React from 'react'

export const Item = ({ tag, onClick }) => {
  return (
    <li className="item">
      <div onClick={onClick}>{tag}</div>
    </li>
  )
}
