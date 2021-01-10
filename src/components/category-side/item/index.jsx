import React, { useCallback } from 'react'

export const Item = ({ title, selectedCategory, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(title)
  }, [])

  return (
    <li className="item-side">
      <span
        onClick={handleClick}
        aria-selected={selectedCategory === title ? 'true' : 'false'}
      >
        {title}
      </span>
    </li>
  )
}
