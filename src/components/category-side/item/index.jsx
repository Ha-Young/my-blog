import React, { useCallback } from 'react'

export const Item = ({ title, selectedCategory, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(title)
  }, [])

  return (
    <li
      className="item-side"
      aria-selected={selectedCategory === title ? 'true' : 'false'}
    >
      <span onClick={handleClick}>{title}</span>
    </li>
  )
}
