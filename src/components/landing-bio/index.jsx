import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

import './index.scss'

export const LandingBio = () => (
  <StaticQuery
    query={landingBioQuery}
    render={data => {
      const { author, social, introduction } = data.site.siteMetadata
      const { fixed: profileImg } = data.profileImg.childImageSharp

      return (
        <div className="landingBio">
          <div className="container">
            <Link to="/about">
              <Image
                className="author-image"
                fixed={profileImg}
                alt={author}
                imgStyle={{
                  borderRadius: `50%`,
                }}
              />
            </Link>
            <h1 className="nameHeader">{title}</h1>
            <p className="introduction">{introduction}</p>
          </div>
        </div>
      )
    }}
  />
)

const landingBioQuery = graphql`
  query landingBioQuery {
    avatar: file(absolutePath: { regex: "/profile.png/" }) {
      childImageSharp {
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        introduction
        social {
          github
          medium
          facebook
          linkedin
        }
      }
    }
  }
`

export default LandingBio
