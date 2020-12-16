import React, { useMemo } from 'react'

import { ThumbnailContainer } from '../thumbnail-container'
import { ThumbnailItem } from '../thumbnail-item'
import { CATEGORY_TYPE } from '../../constants'

export const Contents = ({ posts, countOfInitialPost, count, category }) => {
  const refinedPosts = useMemo(() =>
    posts
      .filter(
        ({ node }) =>
          category === CATEGORY_TYPE.ALL ||
          node.frontmatter.category === category
      )
      .slice(0, count * countOfInitialPost)
  )

  const tags = useMemo(() => {
    var result = []
    posts.map(({ node }) => (result = [...result, ...node.frontmatter.tags]))
    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        if (result[i] === result[j]) result.splice(j--, 1)
      }
    }
    return result
  }, [posts])

  return (
    <ThumbnailContainer>
      {refinedPosts.map(({ node }, index) => (
        <ThumbnailItem node={node} key={`item_${index}`} />
      ))}
    </ThumbnailContainer>
  )
}
