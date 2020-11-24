import React, { useCallback } from 'react'

export const Item = ({ title, selectedCategory, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(title)
  }, [])

  return (
    <li
      className="item"
      aria-selected={selectedCategory === title ? 'true' : 'false'}
    >
      <div onClick={handleClick}>{title}</div>
    </li>
  )
}
