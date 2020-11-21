import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

import './index.scss'

export const LandingBio = () => (
  <StaticQuery
    query={landingBioQuery}
    render={data => {
      const { title, author, social, introduction } = data.site.siteMetadata
      const { fixed: profileImg } = data.profileImg.childImageSharp

      return (
        <div className="landingBio">
          <div className="landingBio-wrapper">
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
            {/* <p className="author-socials">
              {social.github && (
                <a href={`https://github.com/${social.github}`}>GitHub</a>
              )}
              {social.medium && (
                <a href={`https://medium.com/${social.medium}`}>Medium</a>
              )}
              {social.facebook && (
                <a href={`https://www.facebook.com/${social.facebook}`}>
                  Facebook
                </a>
              )}
              {social.linkedin && (
                <a href={`https://www.linkedin.com/in/${social.linkedin}/`}>
                  LinkedIn
                </a>
              )}
            </p> */}
          </div>
        </div>
      )
    }}
  />
)

const landingBioQuery = graphql`
  query landingBioQuery {
    profileImg: file(absolutePath: { regex: "/profile.png/" }) {
      childImageSharp {
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        title
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
