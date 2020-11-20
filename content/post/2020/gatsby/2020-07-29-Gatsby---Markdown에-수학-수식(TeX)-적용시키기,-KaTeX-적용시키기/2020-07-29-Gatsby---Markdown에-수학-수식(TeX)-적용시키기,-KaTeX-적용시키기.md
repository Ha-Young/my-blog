---
title: "Gatsby - Markdown에 수학 수식(TeX) 적용시키기, KaTeX 적용시키기"
date: "2020-07-29 17:30:13"
draft: false
path: "/gatsby/KaTeX"
category: 'gatsby'

---

### 수학 수식 입력 필요성

머신러닝 관련 블로그 포스팅을 하던 중에, 수학 수식을 표기해야 될 필요성을 느꼈다.

이유는, html이나 markdown으로 수학수식을 표기하는데 한계가 있었고 매번 해당 수식에 대해 이미지를 따와서 붙일려고 하니 번거롭기도 번거롭고 일관적이지 않은 이미지에 내가 원하는 수식을 만들기도 까다롭다는 것이다.

그래서 인터넷 웹사이트를 구글링하거나 서핑할 때 수학 수식을 표현하는 어떠한 라이브러리가 있는 것 같았고 이를 찾아보았다.



### TeX

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/TeX_logo.svg/1200px-TeX_logo.svg.png" alt="TeX" style="zoom:5%;" />

우선 LaTeX와 KoTeX등의 문서 조판 언어가 있었는데, 이의 근간이 되는 TeX 언어가 있었다.

TeX는 컴퓨터에서 표현하기 어려운 수식등을 표현하기 위해서 도널드 크누스가 만든 문서 조판 언어로,
MetaFont라는 언어 기반의 Computer Modern font를 만들어 적용시켰다.

수식을 다음과 같이 유려하게 표현 할 수 있으나, 도널드 크누스가 혼자 쓰려고 만든거라서 쓰기가 어렵다고 한다.

그래서 나온것이 LaTeX.



### LaTeX

![LaTeX](https://wikimedia.org/api/rest_v1/media/math/render/svg/da441cab3f7a592ecee704077df2f3063c383363)

LaTeX는 쉽게말해서 위에 설명한 TeX를 쉽게 사용하기위한 매크로이다.

그러니까, TeX는 쓰기 어려우니까 LaTeX로 쉽게 TeX를 사용하기 쉽게 해준 것.

오픈소스로 다양한 OS에서 사용 할 수 있다고 한다.



### KaTeX

<img src="https://avatars2.githubusercontent.com/u/31191489?s=400&amp;v=4" alt="Render image from KaTeX · Issue #328 · KaTeX/KaTeX · GitHub" style="zoom:20%;" />

KaTeX는 웹브라우저에서 수식표현을 위해 만들어진 TeX로 빠르게 변환시켜주는 **Javascript 라이브러리**이다.

LaTeX에 대한 인프라 없이도 모바일, 데스크탑, 웹 환경에서 TeX를 쉽고 빠르게 랜더링 할 수 있는 장점이 있으며 LaTeX의 Syntax를 그대로 사용 할 수 있다.

실제로, 내가 KaTeX를 적용시켜 Gatsby Build 폴더를 살펴보니, html에 KaTeX css들이 생성되어져있고,
semantic, mrow, mi, mo 태그들로 수식들이 표현되고 있었다.

css, html로 표현되다보니 속도가 빠르다 싶었다.



### Gatsby에 KaTeX 적용하기

자, 그럼 Gatsby에 KaTeX를 적용시켜보자.

Gatsby에서는 KaTeX를 위해 지원하는 Plugin인 **gatsby-remark-katex** Plugin이 있다.

이것 또한, 이전의 게시글인 [Gatsby-Markdown에 image넣기](https://ha-young.github.io/gatsby/image) 에서 설명한 **gatsby-transformer-remark** Plugin으로 적용가능하다.

#### 1. gatsby-remark-katex 설치

우선, 설치를 진행하자.

```
npm install --save gatsby-transformer-remark gatsby-remark-katex katex
```

설치가 완료되면,

#### 2. gatsby-remark-katex plugin 적용

``` javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-katex`,
          options: {
            // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
            strict: `ignore`
          }
        }
      ],
    },
  },
],
```

와 같이 gatsby-config.js에 gatsby-transformer-remark의 plugin으로 등록시켜주면 된다.

#### 3. CSS 파일 Import하기

그리고 우리가 Gatsby에서 블로그 포스팅에 사용되는 template js에 katex css를 import시켜야 한다.

나의 경우에는 blog-post.js로 생성을 하였고, 이 파일에

```javascript
import "katex/dist/katex.min.css"
```

와 같이 import를 시켰다.



#### 4. Markdown에 적용시키기

MarkDown에 적용시키는 방법은

```markdown
$$
a^2 + b^2 = c^2
$$
```

다음과 같이 $$ 기호로 감싸서 표현하면 된다.

여기서 표현하는 Syntax는 LaTeX 표현과 동일하며
자세한 사항은 [여기](https://en.wikipedia.org/wiki/Help:Displaying_a_formula#Formatting_using_TeX) 에서 확인하면 된다.



성공하면 다음과 같이 수식을 표현 할 수 있다.
$$
(H(x) - y)^2
$$

$$
cost(W, b) = \frac{1}{m} \sum_{i=1}^m (H(x_i) -y_i)^2
$$

$$
W: W - α\frac{1}{m} \sum_{i=1}^m (Wx_i - y_i)x_i
$$





