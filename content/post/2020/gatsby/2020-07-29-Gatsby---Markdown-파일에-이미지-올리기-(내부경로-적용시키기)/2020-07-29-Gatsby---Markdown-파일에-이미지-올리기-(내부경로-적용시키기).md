---
title: "Gatsby - Markdown 파일에 이미지 올리기 (내부경로 적용시키기)"
date: "2020-07-29 07:40:00"
draft: false
path: "/gatsby/image"
category: 'gatsby'
---



### 내부 이미지를 가져오는데 문제 발견

블로그에 포스팅을 하던 중에 문제를 발견했다.

외부 이미지 url을 markdown에 올리는 것은 문제없었지만

``` markdown
![외부 미지 URL]("http://www.gstatic.com/webp/gallery/5.jpg")
```

**내부 이미지**를 올리는데에 문제가 발생하였다.

```markdown
![내부 이미지 경로 URL]("./image-1.jpg")
```



내가 만든 Gatsby블로그에서는

**gatsby-source-filesystem** 플러그인으로 설정된 폴더의 파일을 읽고

**gatsby-transformer-remark** 플러그인을 이용해 마크다운 파일을 해석 및 html로 변환시키는데,

이 과정에서 image 파일을 읽지 않는건지 읽었지만 내부 경로가 바뀌어서 못 읽는 건지 알 수 없었다.

build가 된 후의 build폴더인 <u>public 폴더 내부를 살펴보니</u> 변환된 html 폴더에서 image를 가져오는 것이 빌드 된 후의 asset folder(static)가 아니라 내가 설정한 ./image-1.jpg 그대로 적용되어있는 걸 확인 할 수 있었다.



![image-20200729154157118](.\image-20200729154157118.png)

내가 해당 빌드경로에 이미지를 넣어서 deploy하는 방법도 있겠지만, 이미지를 asset폴더로 빌드하고 자동으로 html에 경로를 설정해주는 무언가가 있을 것이라 생각했다.

없으면 어떻게 자동화 할 방법을 모색해야했다.



### markdown에 쓰이는 image 자동 build 구조 짜기

나는 우선, 블로그 포스팅 Markdown을 작성 할 때 다음과 같이 이미지와 markdown파일을 동일 폴더내에 위치하도록 글을 작성하고 빌드할 때 자동으로 image는 asset경로로 빠지고 html에서는 image src경로가 해당 asset경로로 바뀌길 원했다.

![image-20200729151830923](.\image-20200729151830923.jpg)





### 리서칭

구글링을 하는데 한글로 된 내용이 없어서, 
영어로 검색하니까 제대로 된 내용들을 찾을 수 있었다.

역시 내가 생각했던대로 Gatsby에서 제공하는 기능과 방법이 있었고
당연히, gatsby 홈페이지에 나와있는 공식 docs를 참조하였다.

역시 공식문서를 먼저 확인하는 습관을 길러야겠다.

[공식문서 참조] : https://www.gatsbyjs.org/docs/working-with-images-in-markdown/



### Image 내부경로로 Markdown에 적용시키기

gatsby 빌드시에 내부 경로의 image를 markdown에 포함시키는 방법은 여러가지가 있는데, 공식문서에서는 대표적으로 2가지 방법을 알려주고있다.

1. Markdown의 metadata의 Featured image 필드를 이용한 image 적용
2. MDX Plugin을 쓰는 방법 (gatsby-remark-images)
3. Transformer Remark Plugin을 쓰는 방법 (gatsby-remark-images)



여기서 1번은 markdown의 inline 방식으로 삽입하는게  아니라 고정된 위치에 이미지를 삽입하는 것 같아서 일단 제외하였고,

2, 3번이 inline방식으로 이미지를 삽입 할 수 있었는데, 둘 다 gatsby-remark-images Plugin을 사용한다. 하지만 적용 방식이 2, 3번이 다른 것인데 이 중에 내가 마침 쓰고있던 Plugin이 **Transformer Remark Plugin** 이기 때문에 3번 방식을 채택하였다.



그리고 내가 원했던 방식인 같은 위치의 이미지를 가져 올 수 있게 예시가 나와있었다.



1,2 번 방식에 대한 설명은 위 공식문서를 참조하면되고

3번방식에 대해서 설명하도록 하겠다. [공식문서](https://www.gatsbyjs.org/packages/gatsby-remark-images)



### Transformer Remark Plugin으로 gatsby-remark-images Plugin 적용시키기

Transformer Remark Plugin으로 gatsby-remark-images Plugin을 적용시키는 방법은 다음과 같다.

간단하다.

#### 1. gatsby-config.js에 plugin 적용

gatsby-config.js에 다음과 같이 적용하자.

이미 gatsby-plugin-sharp와 gatsby-source-filesystem이 적용되어 있다면 

gatsby-transformer-remark만 적용시키면 된다.

추가 옵션에 대해 궁금하다면 [여기](https://www.gatsbyjs.org/packages/gatsby-remark-images/#options) 참조.

```javascript
module.exports = {
  plugins: [
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
      },
    },
  ],
}
```

#### 2. Markdown에 inline으로 적용

```markdown
![내부 이미지 경로 URL]("./image-1.jpg")
```

다음과 같이 경로지정을 하면 된다.



그럼 빌드시에 알아서 asset(static)경로로 세팅해 줄 것이다.

gatsby-plugin-sharp가 해준다고 하는데 뭐 알아서 잘 해줄것이니까 걱정말자.

만세~

> 참고로 gatsby-plugin-sharp는 sharp라는 node module을 사용하는 것인데,
>
> 이 sharp는 큰 이미지를 각각 크기의 웹 화면에 맞게 리사이징해서 웹 로딩, 이미지 로딩 속도를
> 비약적으로 상승시키고 이미지 품질 개선, 회전, 감마처리 등의 여러가지 이미지처리도 할 수 있는 node module이다.



### gatsby-remark-images 지원 Format

gatsby-remark-images 지원 포맷은

- .jpg
- .png

두 개 밖에 안되는데 내부적으로 gatsby-plugin-sharp가 처리하기 때문에 GIF나 SVG같은 이미지 포맷은 

불가능 하다고 한다.

만약, 이와 같은 포맷을 사용하려면 [여기](https://www.gatsbyjs.org/packages/gatsby-remark-copy-linked-files/) 를 참조하자.

