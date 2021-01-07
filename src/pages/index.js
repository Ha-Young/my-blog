import React from 'react'

import { Layout } from '../layout'
import { SEO } from '../components/seo'
import LandingBio from '../components/landing-bio'
import { HOME_TITLE } from '../constants/meta'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const IndexPage = ({ data, location }) => {
  const { siteMetadata } = data.site

  useIntersectionObserver()

  return (
    <Layout location={location} title={siteMetadata.title}>
      <SEO title={HOME_TITLE} keywords={siteMetadata.keywords} />
      <LandingBio />
    </Layout>
  )
}

export default IndexPage

export const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        keywords
      }
    }
  }
`
