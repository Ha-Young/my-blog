import { graphql } from 'gatsby'
import _ from 'lodash'
import React, { useMemo } from 'react'
import { Bio } from '../components/bio'
import { Category } from '../components/category'
import { CategorySide } from '../components/category-side'
import { Contents } from '../components/contents'
import { SEO } from '../components/seo'
import { HOME_TITLE } from '../constants'
import { useCategory } from '../hooks/useCategory'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useRenderedCount } from '../hooks/useRenderedCount'
import { useScrollEvent } from '../hooks/useScrollEvent'
import { Layout } from '../layout'
import * as Dom from '../utils/dom'
import * as EventManager from '../utils/event-manager'
import { rhythm } from '../utils/typography'

const BASE_LINE = 80

function getDistance(currentPos) {
  return Dom.getDocumentHeight() - currentPos
}

export default ({ data, location }) => {
  const { siteMetadata } = data.site
  const { countOfInitialPost } = siteMetadata.configs
  const posts = data.allMarkdownRemark.edges
  const categories = useMemo(
    () => _.uniq(posts.map(({ node }) => node.frontmatter.category)),
    []
  )

  const [count, countRef, increaseCount] = useRenderedCount()
  const [category, selectCategory] = useCategory()

  useIntersectionObserver()

  useScrollEvent(() => {
    const currentPos = window.scrollY + window.innerHeight
    const isTriggerPos = () => getDistance(currentPos) < BASE_LINE
    const doesNeedMore = () =>
      posts.length > countRef.current * countOfInitialPost

    return EventManager.toFit(increaseCount, {
      dismissCondition: () => !isTriggerPos(),
      triggerCondition: () => isTriggerPos() && doesNeedMore(),
    })()
  })

  return (
    <Layout location={location} title={siteMetadata.title}>
      <SEO title={HOME_TITLE} keywords={siteMetadata.keywords} />
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)} ${rhythm(1)} ${rhythm(
            3 / 4
          )}`,
        }}
      >
        <Bio />
        <CategorySide
          categories={categories}
          category={category}
          selectCategory={selectCategory}
        />
        <Category
          categories={categories}
          category={category}
          selectCategory={selectCategory}
        />
        <Contents
          posts={posts}
          countOfInitialPost={countOfInitialPost}
          count={count}
          category={category}
        />
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        configs {
          countOfInitialPost
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { ne: null }, draft: { eq: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200, truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
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
