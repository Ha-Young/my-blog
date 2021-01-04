import React from 'react'

import { Header } from '../components/header'
import { ThemeSwitch } from '../components/theme-switch'
import { Footer } from '../components/footer'
import { rhythm } from '../utils/typography'

import './index.scss'
import { Firework } from '../components/firework'

export const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`

  return (
    <React.Fragment>
      <Firework />
      <div className="layout-wrapper">
        <Header title={title} location={location} rootPath={rootPath} />
        <ThemeSwitch />
        <div
          className='content'
          style={{
            marginLeft: `auto`,
            marginRight: `auto`
          }}
        >
          {children}
          <Footer />
        </div>
      </div>
    </React.Fragment>
  )
}
