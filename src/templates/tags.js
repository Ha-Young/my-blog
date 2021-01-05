import React from 'react'
import PropTypes from 'prop-types'

// Components
import { Link, graphql } from 'gatsby'
import { Layout } from '../layout'
import { ThumbnailContainer } from '../components/thumbnail-container'
import { ThumbnailItem } from '../components/thumbnail-item'

import { rhythm } from '../utils/typography'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { SEO } from '../components/seo'

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const filteredEdges = data.allMarkdownRemark.edges.filter(
    ({ node }) => !node.frontmatter.draft && !!node.frontmatter.category
  )

  const totalCount = filteredEdges.length

  const tagStatement = ' tagged with '
  const tagHeader = `${tagStatement}"${tag}"`

  useIntersectionObserver()
  return (
    <Layout location={location} title={tagHeader}>
      <SEO title={tagHeader} description={tagHeader} />
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
        }}
      >
        <h1>
          <span className="tag-header-count">{totalCount}</span>
          {totalCount === 1 ? '' : 's'}
          {tagStatement}"<span className="tag-header-tag">{tag}</span>"{' '}
        </h1>
        <ThumbnailContainer>
          {filteredEdges.map(({ node }, index) => (
            <ThumbnailItem node={node} key={`item_${index}`} />
          ))}
        </ThumbnailContainer>
        <Link to="/tags">All tags</Link>
      </div>
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 200, truncate: true)
          fields {
            slug
          }
          frontmatter {
            title
            category
            draft
            tags
          }
        }
      }
    }
  }
`
