import React from 'react'

import { Header } from '../components/header'
import { ThemeSwitch } from '../components/theme-switch'
import { Footer } from '../components/footer'
import { rhythm } from '../utils/typography'

import './index.scss'

export const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`

  return (
    <React.Fragment>
      <div className="layout-wrapper">
        <Header title={title} location={location} rootPath={rootPath} />
        <ThemeSwitch />
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)} ${rhythm(1)} ${rhythm(3 / 4)}`,
          }}
        >
          {children}
          <Footer />
        </div>
      </div>
    </React.Fragment>
  )
}
