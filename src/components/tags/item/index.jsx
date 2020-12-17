import React from 'react'

export const Item = ({ tag, onClick }) => {
  return (
    <li className="tag">
      <div onClick={onClick}>{tag}</div>
    </li>
  )
}
