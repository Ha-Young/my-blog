import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { useIntersectionObserver } from "../hooks/useIntersectionObserver"

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
