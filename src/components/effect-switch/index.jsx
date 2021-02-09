import React, { useState, useEffect } from 'react'
import Switch from 'react-switch'

import * as Dom from '../../utils/dom'
import * as Storage from '../../utils/storage'
import { EFFECT } from '../../constants'

import './index.scss'

const FireWorkIcon = () => {
  return (
    <svg height="24" width="24">
      <g id="XMLID_763_"><g id="XMLID_1326_"><path id="XMLID_387_" d="m222.21 229c-2.074 0-4.137-.644-5.879-1.91-3.08-2.237-4.622-6.029-3.978-9.781l5.565-32.446-23.574-22.978c-2.726-2.657-3.707-6.631-2.531-10.251s4.306-6.258 8.073-6.806l32.578-4.734 14.569-29.52c1.685-3.413 5.161-5.574 8.967-5.574 3.807 0 7.283 2.161 8.968 5.574l14.568 29.52 32.577 4.734c3.768.547 6.896 3.186 8.073 6.806 1.176 3.62.195 7.594-2.53 10.251l-23.573 22.979 5.565 32.446c.644 3.751-.899 7.543-3.979 9.781-3.08 2.237-7.163 2.532-10.531.761l-29.138-15.319-29.138 15.318c-1.463.77-3.061 1.149-4.652 1.149zm.604-67.293 12.829 12.504c2.357 2.297 3.433 5.607 2.876 8.852l-3.028 17.657 15.857-8.336c2.914-1.532 6.394-1.531 9.307 0l15.857 8.336-3.029-17.657c-.556-3.244.52-6.554 2.876-8.851l12.829-12.505-17.728-2.576c-3.258-.473-6.073-2.519-7.53-5.47l-7.93-16.065-7.929 16.065c-1.457 2.951-4.272 4.997-7.529 5.47z"/></g><g id="XMLID_51_"><path id="XMLID_384_" d="m186.911 366.75c-3.024 0-5.932-1.374-7.851-3.807l-16.378-20.762-26.388 1.722c-3.792.249-7.408-1.683-9.311-4.979s-1.77-7.388.344-10.553l14.685-21.992-9.792-24.565c-1.41-3.536-.689-7.565 1.857-10.394 2.548-2.829 6.479-3.967 10.143-2.934l25.454 7.17 20.337-16.903c2.929-2.433 6.983-2.993 10.46-1.445s5.774 4.936 5.925 8.74l1.046 26.423 22.36 14.118c3.218 2.032 5.004 5.715 4.607 9.501-.398 3.786-2.911 7.017-6.481 8.335l-24.807 9.161-6.518 25.628c-.938 3.689-3.889 6.526-7.612 7.317-.693.147-1.389.219-2.08.219zm-19.633-44.891c3.049 0 5.947 1.394 7.85 3.807l7.085 8.982 2.819-11.086c.811-3.19 3.14-5.776 6.227-6.917l10.731-3.963-9.673-6.107c-2.783-1.757-4.523-4.771-4.653-8.06l-.453-11.43-8.797 7.312c-2.532 2.104-5.936 2.828-9.104 1.935l-11.011-3.102 4.236 10.627c1.219 3.057.855 6.519-.973 9.256l-6.353 9.513 11.415-.745c.22-.015.438-.022.654-.022z"/></g><g id="XMLID_669_"><path id="XMLID_381_" d="m325.344 366.75c-.691 0-1.388-.072-2.08-.219-3.723-.792-6.674-3.628-7.612-7.317l-6.518-25.629-24.808-9.161c-3.571-1.319-6.084-4.55-6.482-8.335-.397-3.786 1.388-7.469 4.607-9.501l22.361-14.118 1.046-26.423c.15-3.804 2.447-7.191 5.925-8.74s7.533-.988 10.459 1.445l20.337 16.903 25.455-7.17c3.66-1.031 7.595.105 10.143 2.934 2.547 2.829 3.267 6.858 1.857 10.394l-9.791 24.565 14.685 21.992c2.113 3.166 2.247 7.257.344 10.553s-5.5 5.227-9.312 4.979l-26.388-1.722-16.378 20.762c-1.919 2.433-4.827 3.807-7.85 3.808zm-15.082-54.068 10.732 3.963c3.088 1.14 5.416 3.727 6.228 6.916l2.819 11.087 7.085-8.982c2.039-2.584 5.21-3.995 8.503-3.786l11.415.745-6.353-9.513c-1.828-2.737-2.191-6.199-.973-9.256l4.235-10.627-11.012 3.102c-3.168.891-6.573.168-9.103-1.935l-8.798-7.312-.452 11.43c-.13 3.289-1.87 6.303-4.653 8.06z"/></g><g id="XMLID_58_"><path id="XMLID_380_" d="m256.13 512c-2.63 0-5.21-1.07-7.07-2.93-1.87-1.86-2.93-4.44-2.93-7.07s1.06-5.21 2.93-7.07c1.86-1.86 4.44-2.93 7.07-2.93s5.21 1.07 7.07 2.93c1.859 1.86 2.93 4.44 2.93 7.07s-1.07 5.21-2.93 7.07-4.44 2.93-7.07 2.93z"/></g><g id="XMLID_52_"><path id="XMLID_379_" d="m256.127 467c-5.523 0-10-4.477-10-10v-91.5c0-5.523 4.477-10 10-10 5.522 0 10 4.477 10 10v91.5c0 5.523-4.478 10-10 10z"/></g><g id="XMLID_64_"><path id="XMLID_378_" d="m43.02 142.89c-2.63 0-5.21-1.07-7.07-2.93s-2.93-4.44-2.93-7.07 1.07-5.21 2.93-7.07 4.44-2.93 7.07-2.93 5.21 1.07 7.07 2.93 2.93 4.44 2.93 7.07-1.07 5.21-2.93 7.07-4.44 2.93-7.07 2.93z"/></g><g id="XMLID_63_"><path id="XMLID_377_" d="m152.736 206.241c-1.697 0-3.416-.432-4.991-1.341l-70.75-40.847c-4.783-2.761-6.422-8.877-3.66-13.66s8.877-6.421 13.66-3.66l70.75 40.847c4.783 2.761 6.422 8.877 3.66 13.66-1.852 3.207-5.214 5.001-8.669 5.001z"/></g><g id="XMLID_60_"><path id="XMLID_376_" d="m468.979 142.89c-2.64 0-5.21-1.07-7.069-2.93-1.86-1.86-2.931-4.44-2.931-7.07s1.07-5.21 2.931-7.07c1.859-1.86 4.43-2.93 7.069-2.93 2.63 0 5.21 1.07 7.07 2.93s2.93 4.44 2.93 7.07-1.069 5.21-2.93 7.07c-1.859 1.86-4.44 2.93-7.07 2.93z"/></g><g id="XMLID_55_"><path id="XMLID_375_" d="m359.265 206.241c-3.457 0-6.817-1.793-8.67-5.001-2.762-4.783-1.123-10.899 3.66-13.66l70.796-40.874c4.783-2.761 10.899-1.123 13.66 3.66 2.762 4.783 1.123 10.899-3.66 13.66l-70.796 40.874c-1.574.909-3.294 1.341-4.99 1.341z"/></g><g id="XMLID_80_"><path id="XMLID_374_" d="m172.509 121.375c-3.456 0-6.817-1.793-8.669-5.002l-56.104-97.175c-2.762-4.783-1.123-10.899 3.66-13.66 4.782-2.763 10.899-1.123 13.66 3.66l56.104 97.175c2.762 4.783 1.122 10.899-3.66 13.66-1.575.91-3.294 1.342-4.991 1.342z"/></g><g id="XMLID_230_"><path id="XMLID_373_" d="m89 266h-79c-5.523 0-10-4.477-10-10s4.477-10 10-10h79c5.523 0 10 4.477 10 10s-4.477 10-10 10z"/></g><g id="XMLID_231_"><path id="XMLID_372_" d="m116.386 507.803c-1.697 0-3.416-.432-4.991-1.341-4.783-2.761-6.422-8.877-3.66-13.66l56.104-97.175c2.762-4.783 8.879-6.42 13.66-3.66 4.783 2.761 6.422 8.878 3.66 13.66l-56.104 97.175c-1.851 3.208-5.213 5.001-8.669 5.001z"/></g><g id="XMLID_317_"><path id="XMLID_371_" d="m395.614 507.803c-3.457 0-6.817-1.793-8.67-5.001l-56.104-97.175c-2.762-4.783-1.123-10.899 3.66-13.66s10.899-1.122 13.66 3.66l56.104 97.175c2.762 4.783 1.123 10.899-3.66 13.66-1.574.909-3.294 1.341-4.99 1.341z"/></g><g id="XMLID_319_"><path id="XMLID_370_" d="m502 266h-79c-5.522 0-10-4.477-10-10s4.478-10 10-10h79c5.522 0 10 4.477 10 10s-4.478 10-10 10z"/></g><g id="XMLID_321_"><path id="XMLID_369_" d="m339.49 121.375c-1.696 0-3.415-.432-4.99-1.341-4.783-2.761-6.422-8.877-3.66-13.66l56.104-97.175c2.762-4.782 8.875-6.422 13.66-3.66 4.783 2.761 6.422 8.877 3.66 13.66l-56.104 97.175c-1.851 3.207-5.214 5.001-8.67 5.001z"/></g><g id="XMLID_323_"><path id="XMLID_368_" d="m256 74c-5.523 0-10-4.477-10-10v-54c0-5.523 4.477-10 10-10 5.522 0 10 4.477 10 10v54c0 5.523-4.478 10-10 10z"/></g><g id="XMLID_324_"><path id="XMLID_367_" d="m42.967 389.001c-3.456 0-6.817-1.793-8.669-5.001-2.762-4.783-1.123-10.899 3.66-13.66l46.766-27c4.782-2.763 10.899-1.123 13.66 3.66 2.762 4.783 1.123 10.899-3.66 13.66l-46.766 27c-1.575.909-3.295 1.341-4.991 1.341z"/></g><g id="XMLID_325_"><path id="XMLID_366_" d="m42.967 389.001c-3.456 0-6.817-1.793-8.669-5.001-2.762-4.783-1.123-10.899 3.66-13.66l46.766-27c4.782-2.763 10.899-1.123 13.66 3.66 2.762 4.783 1.123 10.899-3.66 13.66l-46.766 27c-1.575.909-3.295 1.341-4.991 1.341z"/></g><g id="XMLID_406_"><path id="XMLID_365_" d="m469.032 389.001c-1.696 0-3.415-.432-4.99-1.341l-46.765-27c-4.783-2.761-6.422-8.877-3.66-13.66 2.762-4.782 8.876-6.422 13.66-3.66l46.765 27c4.783 2.761 6.422 8.877 3.66 13.66-1.852 3.208-5.214 5.001-8.67 5.001z"/></g></g>
    </svg>
  )
}

const NormalIcon = () => {
  return (
    <svg height="24" width="24">
      <g><g><path d="M160.334,76.701c-1.882-25.887-24.296-46.392-51.577-46.392c-21.644,0-40.714,12.797-48.321,32.12c-0.531-0.019-1.064-0.028-1.6-0.028c-24.578,0-44.573,19.995-44.573,44.573c0,0.747,0.156,2.745,0.323,4.497C5.875,116.551,0,125.905,0,136.614c0,16.375,13.833,29.655,30.346,29.183c0.096,0.009,0.193,0.012,0.291,0.012h63.166c0.221,0,0.439-0.021,0.651-0.061c9.305-0.648,17.116-6.305,20.85-14.207l45.328-0.046c19.899-1.024,35.487-17.448,35.487-37.39C196.119,94.014,180.215,77.569,160.334,76.701z M93.613,158.655c-0.089,0.004-0.176,0.012-0.261,0.022H31.06c-0.185-0.019-0.373-0.022-0.564-0.021c-0.327,0.014-0.656,0.021-0.987,0.021c-12.339,0-22.377-9.898-22.377-22.063c0-12.165,10.037-22.063,22.377-22.063c0.745,0,1.483,0.037,2.211,0.106c1.656,0.164,3.199-0.843,3.726-2.418c3.548-10.614,13.856-17.746,25.647-17.746c14.826,0,26.888,11.397,26.888,25.436c0,0.977,0.4,1.912,1.109,2.586c0.71,0.674,1.67,1.047,2.639,0.975c0.313-0.016,0.629-0.024,0.945-0.024c9.851,0,17.866,7.898,17.866,17.606C110.54,150.447,103.105,158.171,93.613,158.655z M160.446,144.369l-43.027,0.039c0.149-1.094,0.253-2.203,0.253-3.337c0-12.891-10.017-23.51-22.751-24.639c-1.814-16.317-16.293-29.071-33.828-29.071c-13.905,0-26.202,7.955-31.431,20.058c-0.052,0-0.103,0-0.153,0c-2.782,0-5.465,0.409-8.018,1.124c-0.06-0.797-0.094-1.385-0.095-1.57c0-20.645,16.796-37.441,37.441-37.441c1.245,0,2.478,0.061,3.691,0.179c1.645,0.174,3.211-0.844,3.735-2.43c5.895-17.848,22.972-29.841,42.495-29.841c24.578,0,44.573,19.196,44.573,42.79c0,1.933,1.539,3.514,3.472,3.564c0.432,0.012,0.867,0.007,1.309,0.005l0.568-0.004c16.713,0,30.309,13.596,30.309,30.309C188.988,130.248,176.372,143.544,160.446,144.369z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
    </svg>
  )
}
function getEffect(checked) {
  return checked ? EFFECT.FIREWORK : EFFECT.NOMAL
}

export const EffectSwitch = () => {
  const [checked, setChecked] = useState(false)

  const handleChange = checked => {
    console.log('firework check', checked)
    Storage.setEffect(checked)
    setChecked(checked)
  }

  useEffect(() => {
    const checked = Storage.getEffect(true)

    handleChange(checked)
  }, [])

  return (
    <div className="effect-switch-container">
      <label htmlFor="effect-normal-switch">
        <Switch
          onChange={handleChange}
          checked={checked}
          id="effect-normal-switch"
          height={24}
          width={48}
          checkedIcon={
            <div className="icon checkedIcon">
              <FireWorkIcon />
            </div>
          }
          uncheckedIcon={
            <div className="icon uncheckedIcon">
              <NormalIcon />
            </div>
          }
          offColor={'#A8BAA9'}
          offHandleColor={'#fff'}
          onColor={'#A8BAA9'}
          onHandleColor={'#282c35'}
        />
      </label>
    </div>
  )
}
