const BODY = 'body'

export const getElements = selector =>
  typeof document !== `undefined` ? document.querySelectorAll(selector) : null
export const getElement = selector =>
  typeof document !== `undefined` ? document.querySelector(selector) : null
export const addClass = (element, className) => element.classList.add(className)
export const removeClass = (element, className) =>
  element.classList.remove(className)
export const togleClass = (element, className, condition) =>
  element.classList.toggle(className, condition)
export const hasClass = (element, className) =>
  element.classList.contains(className)
export const getBody = () => getElement(BODY)
export const addClassToBody = className => addClass(getBody(), className)
export const removeClassToBody = className => removeClass(getBody(), className)
export const hasClassOfBody = className => hasClass(getBody(), className)
export const getRect = className =>
  getElement(className).getBoundingClientRect()
export const getPosY = className => getRect(className).y

export const getDocumentHeight = () =>
  typeof document !== `undefined` ? document.documentElement.offsetHeight : null

export const createElement = tagName =>
  typeof document != `undefined` ? document.createElement(tagName) : null

export const getBodyScrollTop = () =>
  typeof document != `undefined`
    ? document.body.scrollTop || document.documentElement.scrollTop
    : null

export const getScrollArea = () =>
  typeof window !== `undefined`
    ? document.body.clientHeight - window.innerHeight
    : null

export const getScrollPercent = () => {
  const bodyScrollTop = getBodyScrollTop()
  const scrollArea = getScrollArea()
  return Math.round((bodyScrollTop / scrollArea) * 100)
}
