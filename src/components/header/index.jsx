import React from 'react'
import { Link, StaticQuery } from 'gatsby'
import { GitHubIcon } from '../social-share/github-icon'
import Image from 'gatsby-image'

import './index.scss'

export const Header = ({ title, location, rootPath }) => (
  <StaticQuery
    query={headerQuery}
    render={data => {
      const isRoot = location.pathname === rootPath
      const { fixed: logoImg } = data.logoImg.childImageSharp

      return (
        <div className="header">
          <div className="header-home">
            {!isRoot && (
              <Link to={`/`} className="link">
                <Image
                  className="logo-image"
                  fixed={logoImg}
                  alt="logo-image"
                  imgStyle={{
                    borderRadius: `50%`,
                  }}
                />
              </Link>
            )}
          </div>
          <div className="header-navigator">
            <Link className="nav-item" to="/blog">
              Blog
            </Link>
            <Link className="nav-item" to="/category">
              Category
            </Link>
            <Link className="nav-item" to="/resume_web">
              Resume
            </Link>
            <div className="socials">
              <GitHubIcon />
            </div>
          </div>
        </div>
      )
    }}
  />
)

const headerQuery = graphql`
  query headerQuery {
    logoImg: file(absolutePath: { regex: "/logo-haong.png/" }) {
      childImageSharp {
        fixed(width: 80, height: 80) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
