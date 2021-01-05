---
title: '사이트를 Google 검색엔진에 노출시키기 (SEO 향상)'
date: 2020-12-30 17:00
draft: false
category: 'frontend'
tags:
  [
    'frontend',
    'SEO',
    'google search console',
    'sitemap',
    'gatsby',
    '내손내만블로그',
  ]
---

문득, 내가 열심히 작성한 글이 검색이 되어 사람들이 보고있는지, 사람들이 구글 검색을 통해 유입되는지 확인해보고싶었다.

나는 우선 블로그를 만들면서 기본적인 SEO를 나름 블로그를 찾아서 맞춰주었는데,

- \<title> 요소 alt 속성 작성 및 HTML 구조화
- Sitemap.xml 생성
- RSS feed 생성
- robot.txt에 크롤링 허용 및 sitemap 데이터 추가

와 같은 작업을 해두었었다.

근데 직접 구글에 포스팅 검색도 해보면서 확인을 해보니 검색이 잘 되지않는것 같아 확인을 해봤다.

## 자신의 사이트가 구글 크롤러에 노출이 되었는지 확인

아래와 같이 google 검색창에 `site:<자신의 사이트`로 검색을 하면 우리 사이트들이 크롤링 되어서 구글 검색엔진에 색인이 되어있는지 확인할 수 있다.

<img src=".\Google-site검색화면.png" alt="구글 site: 검색" style="zoom: 67%;" />

```google-search
site:<자신의 사이트>
```

> ex) site:ha-young.github.io

검색을 해보면 사이트 목록이 나오는데,

<img src=".\Google-site검색결과.png" alt="구글 site: 검색결과" style="zoom:67%;" />

나는 분명 20개 이상의 포스팅을 올렸지만 보시다시피 1페이지에 약 10개의 게시글인데 반해 페이지 수는 2개밖에 없다.

이 말인 즉슨, 내 사이트에서 구글 검색엔진에 색인된 html 페이지들이 약 20개 정도라는 얘기다.

결국 구글 검색엔진에서 내 모든 페이지(포스팅)에 대해 크롤링이 이루어지지 않아 색인조차되지않았다는 얘기인데, 우리는 구글 검색 결과 우선순위는 뒷전이고 우선 이 **크롤링이 되도록 노출부터 시켜야 한다.** (구글에서 우리 사이트 페이지들을 색인할 수 있도록)

### 크롤링이 제대로 되지 않았던 이유

구글 크롤링이 제대로 되지않은 이유는 여러가지가 있겠지만 내가 추측한 이유는 다음 두가지로 추측하고 있다.

1. 아직 모든 페이지가 크롤링 되지 않은 상태
2. 해당 페이지를 참조할 링크가 없는 상태 (링크 `href`를 통해 넘어가지 않는 페이지 존재)

## 구글 검색 크롤러에 노출시키는 방법

구글 크롤러에 노출시키기 위해서는 [다음 공식문서](https://developers.google.com/search/docs/guides/get-started?hl=ko) 를 확인해보면 알겠지만, 우선 다음과 같은 [기본적인 SEO](https://developers.google.com/search/docs/beginner/seo-starter-guide?hl=ko) 와 같은 기본 가이드라인을 만족해야 한다.

1. 크롤러가 접근할 수 있는 사이트여야 한다.
2. 모든 기기에서 작동하는 사이트여야 한다.
3. 안전하고 빨라야 한다.

2번 항목에 대해서는 대표적으로 모바일 기기에 친화적이어야 하는데,
[이 사이트](https://search.google.com/test/mobile-friendly?hl=ko)에서 구글 크롤러가 인정하는 모바일 친화적인 사이트인지 확인할 수 있다.

<img src=".\모바일친화확인.jpg" alt="모바일 친화적 확인" style="zoom: 40%;" />

그 외에 [구글 친화적인 가이드라인](https://developers.google.com/search/docs/advanced/guidelines/webmaster-guidelines?hl=ko)이 따로 있는데, 대부분 기본적인 내용이거나 우리가 하지않을 내용들로 이루어져있다.
한번 확인해봐도 괜찮을 것 같다.

위 셋 항목을 모두 만족한 다음부터는 [Google 크롤링 봇이 어떻게 사이트를 인식](https://developers.google.com/search/docs/guides/get-started?hl=ko)하는지 이해하고 그에 맞게 맞춰주어야 한다.

## Google 크롤링 봇이 작동하는 방법

구글 크롤링봇이 사이트를 크롤링하는 방법은 바로 **링크**에 있다.

새로운 페이지를 발견하게 되는 것은 이 새로운 페이지를 링크로 이동할 수 있는 페이지가 있어야하고,
이 말은 **이미 한번 노출된 적이 있는 페이지로부터 링크(`a 태그 - href`)를 이용해 다른 페이지에 대한 크롤링을 진행**한다는 얘기이다.

당연히 아무 연결고리가 없는 사이트를 구글 크롤러가 발견할 수는 없는 샘이다.

1. 특정 사이트 URL 발견
2. 해당 페이지 방문 및 크롤링 - (링크를 이용해 크롤링)
3. 해당 페이지 분석 후 검색결과에 어떻게 표시될지 결정

## 크롤링 개선하기 (Sitemap.xml)

하지만, 이 크롤링 봇과 크롤링 과정이 완벽하지 않은바 제대로 크롤링 되지 않았거나 못했을 수도 있다.
그럴때에 제대로 크롤링 되도록 우리가 유도를 해야하는데,

그 방법이 바로 **`Sitemap`** 을 통해 크롤러에게 알리는 것이다.

이 Sitemap은 구글 크롤러가 새 페이지들이 이러이러한 것들이 있다고 알려줄 수 있는 매개체이다.

참조 : [Sitemap이란?](https://developers.google.com/search/docs/advanced/sitemaps/overview?hl=ko#what-is-a-sitemap)

해당 글에 Sitemap이 왜 필요한지에 대해서도 나와있는데,

<img src=".\sitemap이필요한이유.png" alt="사이트맵이 필요한 이유"/>

하이라이트 처리 해놓은 것 처럼 **`연결되는 외부 링크가 많지 않은 새로운 사이트`**가 바로 내 블로그이지 않나 싶다.

## Sitemap을 구글에 제출하는 방법

근데 앞서 말했듯이 나는 Sitemap을 이미 만들어 두었었다.

하지만 이 Sitemap을 만들어 두어도 구글 크롤러가 이 Sitemap을 참조해야 의미가 있는 것인데,
이는 구글 크롤러가 Sitemap을 참조하기를 기다려도 되지만 페이지를 새로 만들었거나 수정이 있었다면 Google에 수동으로 사이트맵을 제출하는 방법이 있다.

![사이트맵 제출](.\Google에사이트맵제출방법.jpg)

1. **Search Console 사이트맵 도구를 사용해 Google에 사이트맵 제출**
2. robots.txt에 `Sitemap:<내 사이트 sitemap.xml경로>` 입력
3. `ping` 기능으로 Google에 사이트맵 크롤링 요청

이 있다. 나는 맨처음 수동으로 `Search Console 사이트맵 도구`를 사용하기가 귀찮고 2번은 이미 해두었기 때문에
3번 `ping`기능을 이용하였는데,

```url
https://www.google.com/ping?sitemap=https://ha-young.github.io/sitemap.xml
```

과 같이 입력을 하니 아래와 같은 결과가 나왔다.

<img src=".\ping결과.jpg" alt="sitemap ping 결과" style="zoom: 80%;" />

주목할만한 부분이 **Sitemap을 처음 제출하는 경우 http://www.google.com/webmasters/tools/를 통해 Sitemap을 추가**하라는 내용이 있는데,

결국 이는 1번 **`Search Console 사이트맵 도구`**를 이용하라는 것이다.

`ping`을 이용한 방법은 <u>나중에 사이트에 업데이트가 일어났을 때 간편하게 사용</u>하기에 좋을 것 같고, 우선은 `Search Console 사이트맵 도구`를 사용하도록 하자.

## Search Console 사이트맵 도구에 Sitemap 등록

### 사이트 소유권 확인

위 http://www.google.com/webmasters/tools/에 들어가고 로그인을 진행하면 다음과 같은 화면이 나타난다.

![Google Search Console](.\GoogleSearchConsole.jpg)

왼쪽은 중복사이트 존재(모바일사이트, pc사이트)일 경우에 쓰이는 것 같고,
나는 모든 URL을 입력하는 우측으로 진행을 하였다.

자신의 사이트 URL을 치고 계속을 누르자.

<img src=".\사이트소유권확인.png" alt="사이트 소유권 확인" style="zoom:67%;" />

소유권을 확인이라는 메세지가 뜬다.

이는 웹사이트가 내 소유라는 것을 알려주는 것이고, 한 사이트에 소유권을 가지고 있는 사람이 1명이상이어야만 제대로 작동한다.

소유권을 확인 기능은 다음과 같다.

- 웹사이트에 소유자임을 주장
- Google 크롤러 접근
- Google 검색 우선순위 반영

### 소유권 확인 방법

소유권을 확인하는 방법에는위 이미지를 보듯이

1. **HTML파일 사이트에 업로드 - 권장사용방법**
2. HTML 메타태그 추가
3. Google 애널리틱스 사용
4. Google 태그관리자 사용

등이 있다.

### 1. HTML파일 내 사이트에 추가

나는 가장 권장 사용방법인 HTML 파일 추가를 진행해보았다.

우선,
<img src=".\소유권확인HTML파일업로드.jpg" alt="소유권확인 HTML파일 업로드" style="zoom:80%;" />

해당 html파일을 받아서 내 블로그 빌드시에 사이트에 추가되도록 하였고

내 Github.io에 Deploy시켰다.

### 2. Search Console 소유자 확인에서 HTML파일 확인버튼 클릭

사이트에 다운받은 HTML파일을 업로드 한 뒤에 확인버튼을 누르면

<img src=".\사이트소유권확인_HTML파일확인.png" alt="image-20201230190513860" style="zoom: 50%;" />

다음과 같은 이미지로 확인 할 수 있다.

<img src=".\소유권확인메세지.png" alt="소유권확인메세지" style="zoom: 67%;" />

다음과 같은 화면이 뜨면 소유권이 확인되었다는 것.

### 3.Sitemap 등록

<img src=".\절차마무리.jpg" alt="절차마무리" style="zoom: 67%;" />

이제 아래 `속성으로 이동`버튼을 클릭해서 Sitemap을 등록해주면 된다.

<img src=".\Sitemap제출.jpg" alt="Sitemap제출" style="zoom: 50%;" />

제출 하고 아래와 같이 제출된 사이트맵에 상태가 성공이면 작업은 끝난 것.

<img src=".\Sitemap제출성공.jpg" alt="Sitemap 제출성공" />

## 마무리

이렇게 구글 크롤링을 유도한 후 다음날 아침 (약 15시간 이후)에 `site:<내 사이트>`를 검색해서 내 사이트의 구글 색인결과를 확인해보았다.

<img src=".\성공적으로크롤링.jpg" alt="성공적으로크롤링" style="zoom:67%;" />

보는 것 처럼 처음에 2페이지 밖에 없었는데 6페이지로 늘어나있는 걸 확인 할 수 있다.

아직 모든 페이지들이 색인되지는 않았지만, 곧 시간문제 인 것 같다. 크롤러가 좀 더 열심히 일 해주기를 바랄 수 밖에.
