import React from 'react'
import { className } from '../../constants/className'

export const PostContainer = ({ html }) => (
  <div
    className={className.post_content}
    dangerouslySetInnerHTML={{ __html: html }}
  />
)
