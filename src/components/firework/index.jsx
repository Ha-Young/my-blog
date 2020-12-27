import React from 'react';
import * as Dom from '../../utils/dom'
import { useFirework } from '../../hooks/useFirework'

import './index.scss'

const FIREWORKS_CANVAS_CLASSNAME = 'canvas_fireworks';

export const Firework = () => {
  useFirework(FIREWORKS_CANVAS_CLASSNAME);

  return (
    <canvas className={FIREWORKS_CANVAS_CLASSNAME}>Canvas is not supported in your browser.</canvas>
  )
}
