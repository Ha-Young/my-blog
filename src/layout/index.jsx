import React from 'react'

import { Header } from '../components/header'
import { ThemeSwitch } from '../components/switchs/theme-switch'
import { EffectSwitch } from '../components/switchs/effect-switch'
import { Footer } from '../components/footer'
import { rhythm } from '../utils/typography'

import './index.scss'
import { Firework } from '../components/firework'
import { Switchs } from '../components/switchs'

export const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`

  return (
    <React.Fragment>
      <Firework />
      <div className="layout-wrapper">
        <Header title={title} location={location} rootPath={rootPath} />
        <Switchs />
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
