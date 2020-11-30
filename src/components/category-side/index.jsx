import React from 'react'
import { Item } from './item'

import './index.scss'

export const CategorySide = ({ categories, category, selectCategory }) => {
  return (
    <div className="category-side-wrapper">
      <div className="category-side-container">
        <div className="category-side">
          <h3>Categories</h3>
          <ul className="category-side-list">
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
      </div>
    </div>
  )
}
