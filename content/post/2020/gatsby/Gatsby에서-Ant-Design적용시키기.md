---
title: "Gatsby에서 Ant Design적용시키기"
date: "2020-08-17 22:10:13"
draft: false
path: "/gatsby/antd"
category: 'gatsby'

---

### Gatsby에서 Ant Design 적용시키기

우리가 웹 개발을 할 때 필요한 UI를 만들어서 써도 되지만,
이미 완성되어있는 완성도 높고 잘 만든 UI 프레임웤을 쓰는 것도 좋은 방법이 될 수 있다.

우선 커스터마이징은 불가능하지만 이미 완성되어져 있는 여러가지의 컴포넌트와 디자인 리소스들을
사용하므로써 얻는 시간 절감의 이점이 대단히 크다.

그리고 좋은 UI 프레임웤을 사용하면 이미 디자인 철학과 좋은 UX에 대한 고민의 흔적이 담겨있기 때문에
내가 아무리 머리싸매고 만든 UI보다 더 좋을 수도 있다.

### Ant Design이란

나는 많은 UI 프레임웤 중에서 <u>Ant Design</u>을 선택했는데,

Ant Design은 알리바바 그룹에서 공들여서 만들었고, 디자인 철학에 대한 고민이
많이 담겨있기 때문이다.

#### Ant Design은 디자인 원칙이 현실적

Ant Design은 10가지 디자인 원칙을 얘기하고 각 원칙을 사례 중심으로 설명하는데,
이 글은 Ant Design에 세부내용을 모두 담기에는 주제에 벗어나므로 간단하게나마 알려주고 넘어가야겠다.

1. 근접성 (Proximity)
2. 정렬 (Alignment)
3. 대조 (Contrast)
4. 반복 (Repetition)
5. 직관적으로 만들어라 (Make it Direct)
6. 화면에 머물러라 (Stay on the Page)
7. 가볍게 유지하라 (Keep it Lightweight)
8. 가이드를 제공해라 (Provide an Invitation)
9. 트랜지션을 사용하라 (Use Transition)
10. 즉각적인 반응 (React Immediately)

와 같은 철학이 담겨있다.

그 외에도 나의 블로그에 매우 도움이 될만한 **레이아웃, 컴포넌트, 아이콘** 등이 있어서
결정을 하게 되었다.

### Gatsby에 Ant Design 적용시키기

우리가 React 프로젝트에 Ant Design을 적용시키는 것은 쉬운일이다.

npm으로 install해서 별다른 문제없이 사용했던 기억이 있는데,
내가 블로그를 위해 ant design을 적용시키려고 하니 Gatsby로 만들어져서 바로 사용 할 수가 없었다.

시간이 걸려서 겨우 적용하였는데, 방법은 아래와 같다.

#### 1. antd와 gatsby-antd-plugin 설치

먼저 프로젝트에 antd를 설치하고,
Gatsby이기 때문에 gatsby-antd-plugin 또한 설치해야 한다.

```bash
npm install antd gatsby-antd-plugin
```

혹은

```bash
yarn add antd gatsby-antd-plugin
```

으로 다운받아 준다.

#### 2. gatsby-config.js에 적용시키기

우리가 gatsby에 사용할 plugin을 설치했으므로 당연히 gatsby에 plugin을 적용시켜야 한다.

그럼 당연히 **gatsby-config.js**에서 처리를 해줘야겠지.

```javascript
plugins: [
  {
    resolve: "gatsby-plugin-antd",
    options: {
      style: true,
    },
  },
]
```

와 같이 plugins 배열에 위 객체를 주가해주면 된다.

#### 3. 나의 Gatsby 프로젝트에 antd 적용시키기

나는 우선적으로 나의 Gatsby 프로젝트에 적용시켜야 될 것이
Modal Component였는데, 이를 적용시키면서 설명을 하겠다.

우선 React와 동일하게 antd로부터 사용해야 된다.

공식 Documents는 [여기](https://ant.design/components/modal/)를 참조하고
기본적인 사용방법은 [Code SandBox]("https://codesandbox.io/s/twilight-snow-v7wkb?file=/index.js")를 참조하자.

내가 사용한 방법은 [여기 Info](https://codesandbox.io/s/mec9n?file=/index.js)

그래서 나는 맨 먼저
추가시킬 버튼 부분 **onClick, onKeyDown**에 showModal() 함수를 추가.

```javascript
<div style={{ position: "relative" }}>
    <h3>Frontend</h3>
        <div
        css={styles.helpButton}
        onClick={() => showModal()}
        onKeyDown={(e) => {
            if (e.keyCode === 13) showModal()
        }}
        role="button"
        tabIndex={0}
        >
        <img src={questionSvg} alt="hint button" />
</div>
```

showModal 함수는

```javascript
const showModal = () => {
  Modal.info({
    title: "Skill Info",
    content: (
      <div>
        <div>
          <Stars countOfStars={3} />
          <p>고급 기능까지 문서없이 구현 가능</p>
        </div>
        <div>
          <Stars countOfStars={2} />
          <p>
            고급 기능은 문서를 참조해야 하고 기초기능은 문서참조를 하지않아도
            됨.
          </p>
        </div>
        <div>
          <Stars countOfStars={1} />
          <p>기초 지식과 사용은 무리가 없으나 문서참조를 자주해야 됨.</p>
        </div>
      </div>
    ),
    onOk: () => {},
  })
}
```

다음과 같이 구현하였다.

#### 4. less쪽 error 발견

이렇게 해서 실행을 해봤는데 아니나다를까 애러를 발견했다.

<img src=".\lessError.JPG" alt="image-20200728164139495" style="zoom:100%;" />

해당 애러내용은 찾아보니 antd 모듈은 less 모듈을 사용하는데 이 less모듈이 없어서 나는 애러였다.

#### 5. less 모듈, gatsby-plugin 설치 및 config 적용

번거롭게도 gatsby에서는 less모듈 또한 gatsby-less-plugin을 설치해줘야 한다.

```bash
npm install less gatsby-less-plugin
```

yarn을 쓸거면 yarn으로 add시켜도 된다.

less-to-json은 사용에 다른 문제가 있어서 로컬파일에서 less를 만들어 쓸 것이기 때문에 추가.

그 후에 plugin을 설치했으므로 당연히 **gatsby-config.js에 추가**해야된다.

```javascript
plugins: [
  {
    resolve: "gatsby-plugin-antd",
    options: {
      style: true,
    },
  },
  {
    resolve: "gatsby-plugin-less",
    options: {
      lessOptions: {
        javascriptEnabled: true,
      },
    },
  },
]
```

아래 gatsby-plugin-less를 추가하고
Option값에 javascriptEnabled를 반드시 true로 설정해야 한다.

다시 gatsby develop를 하자.

#### 6. 또 다른 애러 확인

역시 새롭게 사용하는 것에는 한번에 되는일은 없다.
이제 한번에 되는게 이상할 정도....
이번 문제는 이랬다.

![](.\noJavascriptEnabled.JPG)

찾다찾다 안나와서 그냥 gatsby starter pack 중에서 ant design을 사용한 것이 있길래 해당 git을 clone해서 참조해보았다.

그 결과 찾은것이 less-to-json.

less에 사용되는 vars값들을 로컬로 만들고 가져오도록 하고있었다.
starter pack에서 이렇게 사용하면 방법이 이런가보다.

자 다시 install 하자...ㅠㅠ

#### 7. less-to-json 설치 및 적용

```bash
npm install less-to-json
```

설치를 했으면 적용해야되는데,

**gatsby-config.js**에 추가해야 될 것이 있다.

우선, 맨 위에 less-to-json을 require해야된다. 사용해야되서...

```javascript
const lessToJson = require("less-to-json")
```

그러고 다시 앞에서 plugins에 추가시켰던 less부분에 사용해야 된다.

```javascript
plugins: [
  {
    resolve: "gatsby-plugin-antd",
    options: {
      style: true,
    },
  },
  {
    resolve: "gatsby-plugin-less",
    options: {
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: lessToJson("src/theme/vars.less"),
      },
    },
  },
]
```

보면 **modifyVars : lessToJson("....path....")** 가 추가되어있는데
로컬파일을 생성해줘야 된다.

해당 경로에 아래 파일을 만들자.
(src/theme/vars.less)

```less
@primary-color: #1890ff; // primary color for all components
@link-color: #1890ff; // link color
@success-color: #52c41a; // success state color
@warning-color: #faad14; // warning state color
@error-color: #f5222d; // error state color
@font-size-base: 18px; // major text font size (changed from 14 to 18)
@heading-color: rgba(0, 0, 0, 0.85); // heading text color
@text-color: rgba(0, 0, 0, 0.65); // major text color
@text-color-secondary: rgba(0, 0, 0, 0.45); // secondary text color
@disabled-color: rgba(0, 0, 0, 0.25); // disable state color
@border-radius-base: 4px; // major border radius
@border-color-base: #d9d9d9; // major border color
@box-shadow-base: 0 2px 8px rgba(0, 0, 0, 0.15); // major shadow for layers
```

자 이제 끝났다.

#### 8. 확인

자 확인해보니 잘 나온다ㅎㅎㅎ 앞으로 다양하게 ant design을 적용시켜서
Gatsby 프로젝트를 꾸며보자!

![modal](.\modal.jpg)

만약 안되면
npm 모듈을 clean하고 reinstall 하도록 하자.
