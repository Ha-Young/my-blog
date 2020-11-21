import React from 'react'
import { Link } from 'gatsby'
import { GitHubIcon } from '../social-share/github-icon'

import './index.scss'

export const Top = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  return (
    <div className="top">
      {!isRoot && (
        <Link to={`/`} className="link">
          {title}
        </Link>
      )}
      <div className="header-navigator">
        <Link className="nav-item" to="/blog">
          Blog
        </Link>
        <Link className="nav-item" to="/category">
          Category
        </Link>
        <Link className="nav-item" to="https://ha-young.github.io/resume_web/">
          Resume
        </Link>
      </div>

      <GitHubIcon />
    </div>
  )
}
