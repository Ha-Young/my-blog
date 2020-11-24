import React from 'react'
import { Item } from './item'

import './index.scss'

export const CategorySide = ({ categories, category, selectCategory }) => {
  return (
    <div className="category-side-wrapper">
      <h3>Categories</h3>
      <ul className="category-side-container" id="category-side">
        <Item
          title={'All'}
          selectedCategory={category}
          onClick={selectCategory}
        />
        {categories.map((title, idx) => (
          <Item
            key={idx}
            title={title}
            selectedCategory={category}
            onClick={selectCategory}
          />
        ))}
      </ul>
    </div>
  )
}
