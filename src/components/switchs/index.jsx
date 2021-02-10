import React from 'react'
import { EffectSwitch } from "./effect-switch"
import { ThemeSwitch } from "./theme-switch"

import './index.scss'

export const Switchs = () => {
  return (
    <div className="switch-container">
      <EffectSwitch />
      <ThemeSwitch />
    </div>
  )
}
