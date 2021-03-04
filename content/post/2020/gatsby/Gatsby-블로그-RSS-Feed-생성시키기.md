---
title: 'Gatsby 블로그 RSS Feed 생성시키기'
date: 2020-12-29 17:00
draft: false
category: 'gatsby'
tags: ['google search console', 'gatsby', '내손내만블로그']
---

![Feed-icon.svg](https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Feed-icon.svg/300px-Feed-icon.svg.png)

## RSS 피드란?

[RSS피드](https://en.wikipedia.org/wiki/RSS)는 웹 사이트의 컨텐츠를 나열해놓은 XML 파일로, 피드 리더 앱이나 뉴스 애그리게이터 등으로 RSS피드를 통해 웹사이트의 컨텐츠를 구독 할 수 있게끔 해준다.

그리고 이 RSS 피드를 통해 구독자들이 웹 사이트를 구독하게끔하여 새로운 컨텐츠 소식을 알릴 수 있고, 검색엔진에 이 RSS 피드를 통해 컨텐츠를 지속 노출시킬 수 있다.

## Gatsby 블로그에 RSS 피드 생성시키기

Gatsby 블로그에 RSS 피드를 생성시키는 방법은 다음과 같다.

- `gatsby-plugin-feed` 패키지 설치
- `gatsby-config.js`에 적용
- `gatsby-node.js`에서 Markdown파일(포스팅)에 적용시키기
- RSS피드 커스터마이징(선택)
- gatsby 빌드로 rss.xml 파일 생성

### gatsby-plugin-feed 패키지 설치

```bash
npm install gatsby-plugin-feed
```

로 `gatsby-plugin-feed`를 설치시킬 수 있다.

혹은

```bash
yarn add gatsby-plugin-feed
```

### gatsby-config.js에 적용시키기

`gatsby-plugin-feed`를 설치하였다면, `gatsby-config.js`에 적용시켜야 한다.

```js
module.exports = {
  siteMetadata: {
    siteUrl: `https://www.example.com`,
  },
  plugins: [
    // ...
    `gatsby-plugin-feed`,
    // ...
  ],
}
```

### gatsby-node.js에서 Markdown파일(포스팅)에 적용시키기

```js
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
```

`gatsby-node.js` 맨 아래에 다음과 같이 추가해준다.

여기서 `createNodeField()`를 할 때 `name`은 반드시 unique 해야 한다. 따라서 경로를 나타내는 `slug`를 사용하는 것이 일반적이다.

### RSS피드 커스터마이징

위 단계까지하고 이 부분은 생략해도 기본적인 RSS피드는 잘 생성될 것이다.

하지만 자동으로 생성되는 RSS피드 대신에 내부의 `description`, `date`, `url`, `guid`, `custom_elements`등의 컨텐츠들을 직접 커스터마이징 하고 싶다면 아래와 같은 방법으로 설정할 수 있다.

`gatsby-config.js`

```js
{
    resolve: `gatsby-plugin-feed`,
    options: {
      query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
      feeds: [
        {
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.edges.map(edge => {
              return Object.assign({}, edge.node.frontmatter, {
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [{ 'content:encoded': edge.node.html }],
              })
            })
          },
          query: `
            {
              allMarkdownRemark(
                sort: { fields: [frontmatter___date], order: DESC }
                filter: { frontmatter: { draft: { eq: false } } },
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
          `,
          output: '/rss.xml',
        },
      ],
    },
},
```

다음과 같이 `graph 쿼리문`을 통해 원하는 데이터를 가져오고 RSS 피드에 들어갈 XML 키 밸류를 커스터마이징 할 수 있다.

### gatsby 빌드로 RSS 피드 생성

```bash
gatsby build
```

로 빌드를 하면, 이제 배포 폴더에 `rss.xml`이 생겼을 것이다.

`https://localhost:8000/rss.xml` 로컬로 실행한뒤 해당 url로 접근하여 잘 생성되었는지 확인해보자.

## RSS피드 Google Search Console에 적용시키기

[링크 참조](https://ha-young.github.io/2020/frontend/Google-site%EA%B2%80%EC%83%89%EC%97%94%EC%A7%84%EC%97%90%EB%85%B8%EC%B6%9C%EC%8B%9C%ED%82%A4%EA%B8%B0/2020-12-30-%EC%82%AC%EC%9D%B4%ED%8A%B8%EB%A5%BC-Google-%EA%B2%80%EC%83%89%EC%97%94%EC%A7%84%EC%97%90-%EB%85%B8%EC%B6%9C%EC%8B%9C%ED%82%A4%EA%B8%B0-(SEO-%ED%96%A5%EC%83%81)/#%EC%B6%94%EA%B0%80--rss%EB%A5%BC-google-search-console%EC%97%90-%EB%93%B1%EB%A1%9D%ED%95%98%EA%B8%B0)

## 참조한 곳

https://www.gatsbyjs.com/docs/how-to/adding-common-features/adding-an-rss-feed/
