---
title: 'Gatsby 블로그 TOC 만들기'
date: 2021-01-07 23:10:13
draft: false
category: 'gatsby'
tags: ['gatsby', '내손내만블로그']
---

## TOC 청사진 고르기

블로그를 만들면서 TOC를 추가해야겠다고 결정하였다.

이래저래 다른블로그들은 TOC를 어떻게 구성하였나 둘러보던참에,
예전에 [HEROPHY님의 블로그](https://heropy.blog/)의 TOC가 생각났다.

안그래도 HEROPHY님의 블로그가 깔끔하고 예뻐서 참고하려는 기능들이 있었는데,
이참에 HEROPHY님에게 클론을 해도되는지 물어보기로했다.

### 클론코딩 허락

HEROPHY님에게 블로그 몇가지 기능에대해서 클론코딩을 해도 괜찮은지 조심스럽게 메일을 통해 물어보았고 답변을 받았다.

![클론코딩허락](.\Gatsby-블로그-TOC만들기-클론허락.png)

> 예쁜 블로그만큼이나 마음씨도 예쁘신 것 같다.

이렇게 대략적인 모델이 정해졌으므로 클론코딩을 시작하면 되는데,
나는 여기서 <u>TOC Link에만 하이라이팅을 하는 것 대신 포스트의 Header에도 하이라이팅 처리</u>를 하기로 하였다.

그럼 시작.

## TOC 만들기

### 1. Header에 링크걸기

#### gatsby-remark-autolink-headers

Header에 링크를 거는 방법은 `gatsby-remark-autolink-headers`를 이용하면 쉽게 Markdown에 있는 Header들에 빌드할 때 자동으로 링크를 걸어준다. ([참조](https://www.gatsbyjs.com/plugins/gatsby-remark-autolink-headers/?=remark))

역시 gatsby는 remark관련 플러그인들이 많고 원하는 기능을 찾으면 다 있어서 [JAMStack]()에 대한 지원이 아주 좋다고 생각했고 gatsby를 블로그로 선택한 것을 잘했다고 느끼고 있다.

나는 Jbee님의 [Gatsby-starter-bee](https://github.com/JaeYeopHan/gatsby-starter-bee)를 사용했는데 이미 포함되어있으므로 추가 설치작업은 하지 않았다.

```js
npm install gatsby-remark-autolink-headers
```

#### autolink 커스터마이징

`gatsby-config.js`에서 아래와같이 [autolink 커스터마이징](https://www.gatsbyjs.com/plugins/gatsby-remark-autolink-headers/?=remark#options)을 할 수 있다.

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `100`,
              icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
              className: `custom-class`,
              maintainCase: true,
              removeAccents: true,
              isIconAfterHeader: true,
              elements: [`h1`, `h4`],
            },
          },
        ],
      },
    },
  ],
}
```

### 2. TOC 가져오기

TOC를 가져오는 방법은 GraphQL Query로 가져올 수 있다. (remark로 markdown 빌드를 했을시에)

```js{6}
export const pageQuery = graphql`
  query getTableOfContentsExample($slug: String!) {
    markdownRemark() {
      id
      html
      tableOfContents
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
```

위 처럼 `tableOfContents` 키값으로 가져올 수 있다.

해당 GraphQL Query는 markdown파일에 적용되는 template에 적용시키면 되겠다. (`blog-post.js` template)

### 3. TOC 컴포넌트 생성

위 쿼리로 가져온 tableOfContents의 데이터가 text값으로 다음과같이 가져오기 때문에,

```json{4}
{
  "data": {
    "markdownRemark": {
      "tableOfContents": "<ul>\n<li><a href='#fragment1'>First Heading</a></li>\n<li><a href='#fragment2'>Second Heading</a></li>\n</ul>"
    }
  }
}
```

html tag에 `dangerouslySetInnerHTML`로 적용시키면 별도 핸들링 없이 그대로 구현할 수 있다.

```js{7}
export const TableOfContents = ({ toc }) => {
  // ...
  return (
    <div className="toc-container">
      <div className="toc-wrapper">
        <div className="toc-content">
          <div className="toc" dangerouslySetInnerHTML={{ __html: toc }} />
        </div>
        <div className="toc-open-btn" onClick={onClickTOCOpen}></div>
      </div>
    </div>
  )
}
```

다음과 같은 형식을 취해주면 된다.

### 4. TOC에 하이라이트효과 부여

이 방법을 실현하려면 두 가지 방법이 있는 것 같다.

- `scrollEvent`에서 Header가 윗부분으로 오는지 체크
- `IntersectionObserver`를 `rootMargin`을 위쪽영역으로 하여 가시성이 보이는 순간(`isIntersecting`) 체크

개인적인 판단으로는 `scrollEvent`에서 스크롤의 매 순간 header의 영역과 window `offsetY`를 체크하여 계산하기보다는 `IntersectionObserver`로 Header들의 가시성이 변환 될 때만 체크를 하는 것이 더 효율적으로 생각되었다.

따라서 `IntersectionObserver`를 이용해 체크하기로 결정.

> IntersectionObserver에 대해서 잘 모른다면 [HEROPY님의 포스팅](https://heropy.blog/2019/10/27/intersection-observer/)을 참고하자.
>
> 정리가 매우 잘 되어 있다. 👍

```js{7-15}{numberLines: true}
useEffect(() => {
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const headerElement = entry.target
        const tocLinkElement = Dom.getElement(
          `a[href*="${encodeURI(header.id)}"]`
        )

        if (entry.isIntersecting) {
          headerElement.classList.add('toc-header-active')
          tocLinkElement.classList.add('toc-active')
        } else if (currentYPos < targetStaticYPos) {
          // 스크롤을 위로 올려서 헤더 주제를 벗어난 경우
          headerElement.classList.remove('toc-header-active')
          tocLinkElement.classList.remove('toc-active')
        }
      })
    },
    { rootMargin: `0% 0% -85% 0%` }
  )

  headerElements = getHeaderElements()

  headerElements.forEach(headerElement => {
    observer.observe(headerElement)
  })
})
```

다음과 같이 `TableOfContents` 컴포넌트 내부에서 `IntersectionObserver`를 이용해 현재 보고있는 Content의 Header를 체크하고 효과를 주기위해 css class를 toggle하였다.

observing하는 root는 `0% 0% -85% 0%`로 설정해서 Header가 root로 설정한 상위 observing 영역에 올 경우
`entry.isIntersection`으로 체크하였다.

여기서 이것저것 해보다가 발견한 사실이 또 있는데
`entry.boundingClientRect.top + window.pageYOffset`의 결과가 Element의 static한 top 좌표라는 사실을 알게되었다.

<img src=".\Gatsby-블로그-TOC만들기-rootMargin.png" alt="rootMargin" style="zoom:67%;" />

### 5. 문제점 발견

이 다음단계로 `Intersectioning` 하는 부분을 따로 hooks로 분리시키는 등의 리팩토링을 진행하려고 하였으나,
문제점을 발견하였다.

나는 `entry.isIntersection`으로 체크가 되었을 때 하이라이팅처리, `IntersectionObserver`를 통한 계산값으로 스크롤을 헤더 위로 올렸을때 하이라이팅을 제거하도록해서 css class를 toggle시키는 방법을 선택했었다.

스크롤 하면서 처음 보여질 때 css classname을 추가해서 하이라이트 처리가 되도록하고,
스크롤을 위로올리면서 두번째로 보여질 때 cssclassname을 제거하면서 하이라이트를 제거하려고 하였다.

> HEROPHY님 Tech blog 처럼 읽은 주제에 대해서는 하이라이트, 다시 위로 올리면 하이라이트제거

하지만, **header #경로로 이동할 때 스크롤의 속도가 너무 빨라 `isIntersection` `true`가 발생하지않아 toggle이 꼬이는 상황이 발생**하였다.

그래서 이래저래 로그도 찍어보면서 방법을 강구한 결과, `scroll Event`로 각 Header들의 위치판단으로 적용시키기로 하였다.

#### 해결책

- `Scroll Event` 사용하기로 결정
- 낮아진 효율성은 `Scroll Event`에 Task Queue(Event Queue)대신 Animation frames(`rAF`)으로 처리되도록 하기 - [Jbee님의 스크롤이벤트 최적화 포스트 참조](https://jbee.io/web/optimize-scroll-event/)

### 6. 해결책 (Scroll event) 적용

위 해결책을 적용하기 위해 기존에 [gatsby-starter-bee](https://github.com/JaeYeopHan/gatsby-starter-bee) 에 존재하는 `onScroll`과 `toFit`을 적용시키고 scroll Event로 잘 수행되는지 확인해보았다.

```js{21-23}{numberLines: true}
// TableOfContents
const onScroll = () => {
  const currentoffsetY = window.pageYOffset
  const headerElements = getHeaderElements()
  for (const headerElement of headerElements) {
    const { top } = headerElement.getBoundingClientRect()
    const elementTop = top + currentoffsetY
    const tocLinkElement = Dom.getElement(
      `a[href*="${encodeURI(headerElement.id)}"]`
    )
    if (currentoffsetY >= elementTop - HEADER_OFFSET_Y) {
      headerElement.classList.add('toc-header-active')
      tocLinkElement.classList.add('toc-active')
    } else {
      headerElement.classList.remove('toc-header-active')
      tocLinkElement.classList.remove('toc-active')
    }
  }
}

useScrollEvent(() => {
  return EventManager.toFit(onScroll, {})()
})
```

잘 작동하는 것을 확인하였다.

적용된 `useScrollEvent`와 `toFit` 함수는 아래와 같다.

```js
// useScrollEvent
import { useEffect } from 'react'

export function useScrollEvent(onScroll) {
  useEffect(() => {
    window.addEventListener(`scroll`, onScroll, { passive: false })
    return () => {
      window.removeEventListener(`scroll`, onScroll, { passive: false })
    }
  }, [])
}
```

```js
// toFit
export function toFit(
  cb,
  { dismissCondition = () => false, triggerCondition = () => true }
) {
  if (!cb) {
    throw Error('Invalid required arguments')
  }

  let tick = false

  return function() {
    if (tick) {
      return
    }

    tick = true
    return requestAnimationFrame(() => {
      if (dismissCondition()) {
        tick = false
        return
      }

      if (triggerCondition()) {
        tick = false
        return cb()
      }
    })
  }
}
```

### 7. # url 불편함 제거

다 완성하고 난 후에 이래저래 테스트를 해보다보니 불편함 점을 발견했다.
TOC 컴포넌트의 Link를 클릭하면 `originURL/#header` 처럼 url이 바뀌기 때문에 나중에 뒤로가기를 수행하였을 경우 이전에 클릭했던 TOC Link(URL)로 이동하게 되는 것.

그래서 번거롭지만 각 TOC Link에 <u>Click EventListener</u>를 추가하였다.

```js{12-15}
useEffect(() => {
  const headerElements = getHeaderElements()

  headerElements.forEach(headerElement => {
    headerElement.classList.add('toc-header') // active 애니메이션 효과를 위해 사전에 클래스 추가

    const headerElementTop = getElementTopPos(headerElement)
    const tocLinkElement = Dom.getElement(
      `a[href*="${encodeURI(headerElement.id)}"]`
    )

    tocLinkElement.addEventListener('click', e => {
      e.preventDefault()
      window.scroll({ top: headerElementTop, behavior: 'smooth' })
    })
  })
})
```

## 마무리

어찌보면 간단한 기능처럼 보이는데, 생각보다 오래작업하게 되었고 배운것도 정말 많다.

- IntersectionObserver
- CSS `className[propertyName*="likeSearch"]` 선택자
- scroll event 최적화
- window.scroll
- 미리 작성된 양질의 코드 재사용 (`Jbee` 님의 소스를 보면서 많이 배웠다.)

## 참조

- [HEROPHY님의 IntersectionObserver](https://heropy.blog/2019/10/27/intersection-observer/)
- [보노님의 TOC만들기 포스트](https://blueshw.github.io/2020/05/30/table-of-contents/)
- [Jbee님의 스크롤이벤트 최적화](https://jbee.io/web/optimize-scroll-event/)
