import React from 'react'
import PropTypes from 'prop-types'

// Utilities
import kebabCase from 'lodash/kebabCase'

// Components
import { Link, graphql } from 'gatsby'
import { Layout } from '../layout'
import { SEO } from '../components/seo'
import { Tag } from '../components/tag'

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title, keywords },
    },
  },
  location,
}) => (
  <Layout location={location} title={title}>
    <SEO title="Tags" keywords={keywords} />
    <div>
      <h1>Tags</h1>
      <ul>
        {group.map(tag => (
          <Tag tag={tag.fieldValue} totalCount={tag.totalCount} />
        ))}
      </ul>
    </div>
  </Layout>
)

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
