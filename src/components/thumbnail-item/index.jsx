import React from 'react'
import { Tags } from '../tags'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'

import './index.scss'

export const ThumbnailItem = ({ node }) => (
  <div className={`thumbnail ${TARGET_CLASS}`}>
    <div key={node.fields.slug}>
      <Link to={node.fields.slug}>
        <h3>{node.frontmatter.title || node.fields.slug}</h3>{' '}
      </Link>

      {node.frontmatter.tags && <Tags tags={node.frontmatter.tags} />}

      <Link to={node.fields.slug}>
        <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
      </Link>
    </div>
  </div>
)
