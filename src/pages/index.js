import React from 'react'

import { Layout } from '../layout'
import { SEO } from '../components/seo'
import LandingBio from '../components/landing-bio'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const IndexPage = ({ data, location }) => {
  const { siteMetadata } = data.site

  useIntersectionObserver()

  return (
    <Layout location={location} title={siteMetadata.title}>
      <SEO title="Home" keywords={siteMetadata.keywords} />
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
