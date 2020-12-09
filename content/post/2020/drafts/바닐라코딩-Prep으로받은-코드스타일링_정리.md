---
title: '바닐라코딩 Prep 과제로 받은 코드스타일링'
draft: false
date: '2020-12-03'
category: 'vanilla coding'
tags: ['javascript', 'prep', 'code-review', 'code-styling']
---

## 🔧 개발관련

### ● .gitignore에 package-lock.json을 넣으면 안된다.

나는 `package-lock.json`이 필요없이, 그냥 `npm install`시에 생기는 부산물이라고 생각해서 `.gitignore`에 `package-lock.json`을 추가했던 적이 있다. 하지만 이 `package-lock.json`은 `package.json`의 부족한 정보를 담고있는 것인데, `pack.json`에 우리가 다운받으면 나오는 버전에 대한 정보는 사실 명확한 버전이 아니라 버전에 대한 `범위(Caret Range)`를 표기하고 있다. 그래서 명확한 버전이 아니기 때문에 명확한 버전에 대한 정보를 담는 것이 바로 `package-lock.json`이고 이 `package-lock.json`이 있다면 `npm install`시에 `package-lock.json`을 통해 `node-modules`폴더를 생성하게 된다. 만약, `package-lock.json`이 없다면 `package.json`을 참고해서 생성되기 때문에 명확하지 않은 정보로 생성이 된다.

소스를 배포나 공유시에 이 `package-lock.json`이 없다면, 내가 다운받고 개발한 환경과 다르게 `package.json`을 통해 명확하지 않은 모듈들을 받을 수 있으므로 제대로 작동하지 않을 확률이 높다.

따라서 **`package-lock.json`은 소스 코드를 배포 혹은 공유시에 함게 공유**되어야 한다.
<br>
<br>

### ● npm 패키지 매니저를 쓴 프로젝트라면 계속 npm으로 사용하자

package-lock.json이 있다면, npm 패키지 매니저를 이용해 모듈 인스톨이 구성된 상태일 것이다.

하지만 모르고 yarn을 이용해 다시 yarn add를 통해서 구현을 했는데, 이렇게 하면 위와 같이 package-lock.json을 참조하지않아 제대로 된 버전의 모듈들이 설치되지 않는다. 즉, 이전에 개발된 환경과 다른 개발환경이 조성되어 문제가 생길 확률이 높다. 따라서 npm 패키지 매니저를 쓴 프로젝트라면 계속해서 npm 패키지 매니저를 써야 한다.
<br>
<br>

### ● 변수에 leteral로 할당하는 것 보다 상수로 관리할 수 있다면 관리하자.

```js
const startButtonElement = document.querySelector('.start-btn')
const answerTextBoxElement = document.querySelector('input.input-answer')
const timeLimit = 100
```

과 같이 관리하는 것 보다

```js
const START_BTN_CLASSNAME = '.start-btn'
const ANSWER_TEXT_BOX_SELECTOR = 'input.input-answer'
const TIME_LIMIT = 100
```

과 같이 상수로 저장시켜두고, (별도로 상수 파일을 만들면 더 좋다. `variable.js`)

```js
const startButtonElement = document.querySelector(START_BTN_CLASSNAME)
const answerTextBoxElement = document.querySelector(ANSWER_TEXT_BOX_SELECTOR)
const timeLimit = TIME_LIMIT
```

와 같이 상수를 이용하게끔 하면 재사용에 대해 대비할 수 있고 훨씬 완성도 있어 보인다.
<br>
<br>

### ● 디버깅을 위한 console.log는 PR(Pull Request) 혹은 MR(Merge Request)전에 항상 제거하자

완성 후 제출을 하는 PR이나 MR에서 디버깅을 위한 console.log가 찍혀있다면 코드 완성도의 느낌이 떨어질 수 있고, master에 Merge시킬 때 관리자가 일일이 다 제거해야되는 번거로움이 생긴다.
<br>
<br>

### ● html에 dataset 속성 사용으로 DOM에 추가 정보 관리 가능

html에 특정 정보를 담고싶을 때 `data-*` 속성을 사용하면 좋다.

```html
<article
  id="electriccars"
  data-columns="3"
  data-index-number="12314"
  data-parent="cars"
>
  ...
</article>
```

```js
var article = document.getElementById('electriccars')

article.dataset.columns // "3"
article.dataset.indexNumber // "12314"
article.dataset.parent // "cars"
```

위와 같이 가능.

하지만 이 dataset 속성으로 저장된 값은 검색 크롤러에 의해 읽히지 않아 SEO에 불리하며,

지원하지않는 브라우저(IE10 이하)가 있기 때문에 고려해서 사용해야 한다.

[참조](https://developer.mozilla.org/ko/docs/Learn/HTML/Howto/%EB%8D%B0%EC%9D%B4%ED%84%B0_%EC%86%8D%EC%84%B1_%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)

<br>
<br>

### ● early return (fail fest)

```js
if (isTrue) {
  // A..
  // B..
  // C..
  // D..
} else {
  return 'early return'
}
```

다음과 같은 분기중에서 한쪽은 길고 한쪽은 짧을 때 혹은 if else문을 통한 예외처리를 `early return` 처리하면 좋다.

```js
if (errorCheck()) {
  return 'fail fest'
}

if (!isTrue) {
  return 'early return'
}

// A..
// B..
// C..
// D..
```

이렇게 할 경우, 가독성이 좋아지고 효율이 좋아진다.

또

- 가독성이 좋아진다.
  - indentation이 줄고,
  - if else문을 다 안봐도 된다.
- if, else 문에 대해 다 보지 않기 때문에 효율성이 있다.
- 예외처리를 `early return`처리하면 **`fail fest`**한 코드가 되어서 빠른 예외처리로 불필요한 로직수행이 없어진다.

<br>
<br>

### ● 커밋후 PR 혹은 MR로 올리는 작업에 ToDo와 같은 주석은 없도록 하자

```js
function doWorkSomething() {
  // ToDo
}
```

이 부분은 실제 업무로 들어갔을 때 만약 남들이 봤을 때 주석으로 ToDo로 적혀있다면,
해당 커밋과 PR, MR에 대한 작업을 덜 한건지 다음 작업을 위해 남겨둔건지 햇갈린다.

해당 PR, MR에 대한 작업을 덜 한것처럼 보일 수 있기때문에 미완성의 느낌이 나서 커밋에 대한 작업이 다 된건지 안된건지 보는사람으로 부터 생각을 하게 한다는 점 때문에 없애는 편이 낫다.

<br>
<br>

### ● css 반응형 작업은 (media query) break point를 4~5개 기준을 두고 작업한다.

이 부분은 내가 break point를 디바이스 (width) 기준으로 break point를 4~5개로 잡고 작업하는지 모르고,

```css
@media (min-width: 361px) and (max-width: 399px) {
  html {
    font-size: 30%;
  }
}

@media (min-width: 400px) and (max-width: 439px) {
  html {
    font-size: 32.5%;
  }
}

@media (min-width: 440px) and (max-width: 479px) {
  html {
    font-size: 35%;
  }
}

/* ... 반복 ...*/
```

다음과 같이 40px정도 단위로 작업을 해서 media query가 굉장히 많았다.

이럴경우 유지보수가 힘들기 때문에 4~5개의 기준을 두고 일한다고 한다.

기준은 각 회사나 제품마다 다르겠지만 4~5 개의 break point를 두는건 비슷한 것 같다.

참고자료

- [Bootstrap 기준 참고](https://getbootstrap.com/docs/4.5/layout/grid/#grid-options)

<br>
<br>

### ● ID Selector는 사용하지 말자

```css
#id-selector {
  background-color: 'black';
  ...;
}
```

CSS에서 ID 선택자는 잘 사용하지 않는다. ID 선택자는 유연성이 떨어지고 (하나 이상이 필요한 경우 더 추가 할 수 없음) 필요한 경우 재정의하기가 더 어렵고 클래스보다 특이성이 높다.

참고자료
[Don't use ID selectors](https://developer.mozilla.org/en-US/docs/MDN/Guidelines/Code_guidelines/CSS#Dont_use_ID_selectors)

<br>
<br>

### ● 스크롤 없는 풀페이지 화면을 만들고 싶다면 overflow: hidden을 사용하자

풀페이지 화면을 만들기위해 body에 margin-top 속성을 작성한 적이 있었는데,
body에 margin-top을 넣는경우는 잘 없으니 body에 overflow: hidden을 사용하자.

https://developer.mozilla.org/en-US/docs/Web/CSS/overflow

<br>
<br>

## 🎭 코드스타일 관련

### ● 줄임말 보다는 길더라도 명확하게 Naming하자

과제 중에 상수로 표기하고 싶어서 , 이를 리뷰로 남겨주셨다.

```js
const ClassNames = {
  active: 'active',
  gBoardCell: 'gboard_cell', // gboard도 globalBoard인지 gameBoard인지 햇갈린다.

  qs: {
    // qs가 무엇일까?
    player1Score: '#play1-score',
    player2Score: '#play2-score',
    tieScore: '#ties-score',
    soundOn: '#sound-on',
    soundOff: '#sound-off',
  },
}
```

다음과 같이 DOM조작을 위해서 HTML의 class name을 상수화 시켰었다.
여기서 `query selector`를 `qs`로 줄여 썼는데 리뷰어분이 `qs`가 무엇인지 추론을 해야 하는 상황이 생겼고 이는 한번 볼 코드를 여러번 보게 만든 요인이 된다.

또 위의 `gBoardCell` 또한 `global board`인지 `game board`인지 햇갈린다.

> 실제로 리뷰어님은 global board로 인지하셨다.

다음과 같이 네이밍에 있어서 줄임말이 효과적인지 다시한번 생각해보게 되었고 줄여서 누구나 알 수 있거나 명확하지 않다면 줄임말을 사용하지 않기로 하였다.

<br>
<br>

### ● html img tag에 alt값을 꼭 넣자

img tag에서

- src : 필수이고 포함하고자 하는 이미지의 경로를 지정
- alt: 필수는 아니지만, 필수적으로 기입해야 한다.이미지의 텍스트 설명이지만 웹 접근성으로 스크린리더가 읽어주기도 하고 오류로인한 이미지를 가져올 수 없을 때 이미지를 대체하는 텍스트로 쓰이기 때문

[참고자료](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img)

<br>
<br>

### ● Header의 h1은 반드시 1개로 하고 순서를 반드시 지키도록 하자

[해당 문서 참고](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements#Accessibility_concerns)

<br>
<br>

### 정보성 값들은 css에 있으면 안되고 반드시 html에 있어야 한다

내가 개발시

```css
.quiz-score::before {
  content: 'score : ';
}
```

다음과 같은 처리를 하였는데 이렇게 하면 안된다. (정보성이기 때문에)

왜냐면, 이 정보값은 DOM에 포함되어있지 않아 페이지에서 콘텐츠로 쓰이지 않는다. 따라서 DOM으로 조작할 수도 없고 검색 크롤러가 크롤링 하지도 못한다.

[다음 문서를 참고하자](https://developer.mozilla.org/en-US/docs/Web/CSS/content#Accessibility_concerns)

<br>
<br>

### ● var 대신에 let, const를 사용하자

var는 호이스팅의 문제와 함수 스코프가 적용되는 등의 개발중에 알수없는 문제를 야기시킬 수 있다.

따라서 var 대신 let, const를 사용하자.

변수 선언은

const로 선언하고 변경되는 값이면 let으로 변경하도록 하자.

참고자료

- [var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
- [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
- [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [Const in JavaScript: when to use it and is it necessary?](https://stackoverflow.com/questions/21237105/const-in-javascript-when-to-use-it-and-is-it-necessary)
- [What's the difference between using “let” and “var”?](https://stackoverflow.com/questions/762011/whats-the-difference-between-using-let-and-var)

<br>
<br>

### ● naming에 있어서 일관성을 가져가자

```js
const className = {
  btnStart: 'btn-start',
  soundBtn: 'sound-btn',
  restartBtn: 'restart-btn',
}

const btnStartElement = document.querySelector('btn-start')
const soundBtnElement = document.querySelector('sound-btn')
const restartBtnElement = document.querySelector('restart-btn')
```

다음과 같은 코드의 문제점은 무엇일까?

-> 코드의 일관성이 떨어져 보인다.

`btnStart`는 btn으로 시작되지만, `soundBtn`과 `restartBtn`은 btn으로 끝난다.
이는 코드가 정돈되어 보이지 않고 심할경우 가독성 또한 헤칠 수 있다.

왠만하면 네이밍에 있어서도 코드의 일관성을 가지자.

```js
const className = {
  startBtn: 'start-btn',
  soundBtn: 'sound-btn',
  restartBtn: 'restart-btn',
}
```

<br>
<br>

### ● 함축적인 표현보다 길더라도 명확하게 Naming하자

변수나 함수 Naming시에 짧고 함축적인 것 보다 무조건 명확하게 작성하는게 중요하다.

예를들어,

```js
let quizCount

function getQuizCount() {
  return quizCount
}
```

처럼 되어있다면, 이 quizCount는 전체 quiz의 개수인지 내가 푼 quiz의 개수인지 알 수 없다.

logic을 확인해봐야 하는 번거로움이 생긴다.

```js
let currentQuizCount
let allQuizCount

function getCurrentQuizCount() {
  return currentQuizCount
}

function allQuizCount() {
  return allQuizCount
}
```

와 같이 표현하는게 훨씬 좋다.

#### 함수 Naming에서는 동사가 앞에 와야 한다.

#### arrow function에는 세미콜론(;)을 붙여야 한다.

함수 표현식과 arrow function은 세미콜론을 붙여야 한다.

```js
// function expression
const func1 = function() {
  console.log('func1')
}

// arrow function
const func2 = () => {
  cosnsole.log('func2')
}
```

<br>
<br>

### ● Bool 변수 Naming

Bool 변수 네이밍에 있어서 일반변수처럼 표기하기보다는 Bool 변수임을 알 수 있도록 표기하는것이 좋다.

```js
const myTurn = true // X
const isMyTurn = true // O
```

아래 사이트를 참조하자.

[Bool 변수 이름 제대로 짓기 위한 최소한의 영어 문법](https://soojin.ro/blog/naming-boolean-variables)

<br>
<br>

### ● css 작성시에는 규칙성을 가져야 한다.

css 작성시에 아무 속성이나 순서없이 적지말고 이 또한 규칙성을 가지고 작성해야 한다.

```
1. Layout Properties (position, float, clear, display)
2. Box Model Properties (width, height, margin, padding)
3. Visual Properties (color, background, border, box-shadow)
4. Typography Properties (font-size, font-family, text-align, text-transform)
5. Misc Properties (cursor, overflow, z-index)
```

대부분 위의 순으로 작성을 한다.

이외에도 알파벳 순이라던지 회사마다 다른 컨벤션을 가지고 있다.

중점은 **css작성에도 규칙성과 일관성이 있어야 된다는 점!**

<br>
<br>

### ● 배열 판별은 Array.prototype.isArray

```js
const arr = []

console.log(typeof arr) // 'object'
console.log(Array.isArray(arr)) // true
```

[참고](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

<br>
<br>

### ● object propery access -> dot notation VS bracket notation

object의 속성에 접근할 때 `.property`으로 접근하는 dot-notation과 `[''property"]`로 접근하는 bracket-notation이 있다. 차이는 아래 참고자료로 확인

참고자료

- [Property_Accessors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_Accessors)
- [dot-notation vs. bracket-notation](https://codeburst.io/javascript-quickie-dot-notation-vs-bracket-notation-333641c0f781)

<br>
<br>

### ● 배열의 length와 관련있는 numerical한 property, method와의 관계

우리가 배열에서 사용하는 메서들 중에는 length속성과 관련이 있는 프로퍼티, 메서드들이 있다.

가령 `join()` `slice()` `push()` 등등이 있는데, 아래 페이지를 참조해보자.

[해당 페이지 참조](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Relationship_between_length_and_numerical_properties)

<br>
<br>

### ● type coercion

자바스크립트에서 `2 + "2"`의 결과는 어떤지 다들 알고있을 것이다.

이와 같이 강제 형변환이 일어나는 것에 대해서 `type corecion`이라고 하는데 아래 참고자료를 확인하자.

`==`와 `===`의 관계또한 알아보자.

참고자료

- [Type_coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion)
- [Equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality)
- [Strict_equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)

<br>
<br>

### ● newline 추가

git을 이용할때에는 항상 파일의 끝에 `new line`이 추가되어야 한다.

이는 git에서 `new line`을 통해 파일 구분을 하기 때문.

**`new line`이 없다면 git에서 문제가 생길 확률이 높다.**

없으면 git에서 No newline at end of file이라는 경고를 보여준다.

아래 문서를 참조하자

[Why should text files end with a newline?](https://stackoverflow.com/questions/729692/why-should-text-files-end-with-a-newline)

<br>
<br>

### ● 사용하지 않는 변수 꼭 제거하기

사용하지 않는 변수는 꼭 제거해야 한다.

<br>
<br>

### ● 함수 Naming에서는 동사가 앞에 와야 한다.

함수 이름은 동사로 시작하는 것이 일반적.

국내에만 국한된 것이 아니라 세계적으로 쓰는 컨벤션.

영어로 이해할 수 있게 잘 네이밍 하는 것이 상당히 중요하다.

<br>
<br>

### ● 자바스크립트는 일반적으로 camelCase를 사용한다

```js
const camelCase = 'thisIsCamelCase'
```

<br>
<br>

### ● Naming할 때 단수, 복수 표현을 명확히 하자.

```js

```

<br>
<br>

### ● DOM 요소 Naming

<br>
<br>

## 📕 자바스크립트 문법 관련

### ● Array.prototype.fill()

```js
const squares = [null, null, null, null, null, null, null, null, null]
```

다음과 같이 반복적인 표현을

```js
const squares = Array.from({ length: 9 }).fill(null)
```

와 같은 표현으로 간단하게 표현할 수 있다.

<br>
<br>

### ● Logical TRUE, NOT을 잘 활용하자 (Truthy, Falsy)

```js
if (someVariable === null) {
  // ToDo...
}
```

와 같은 표현보다

```js
if (!someVariable) {
  // ToDo...
}
```

와 같이 Falsy를 이용하자.

참고자료
[Logical NOT (!)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT)

<br>
<br>

### ● DOM으로 style property를 수정하는 것 대신 classList로 스타일 변경을 꾀하자

```js
if (soundFlag) {
    soundOn.style.display = "block";
    soundOff.style.display = "none";
} else {
    soundOn.style.display = "none";
    soundOff.style.display = "block";
```

다음과 같이 직접적으로 DOM Element의 style property를 수정하지 말고,
classList로 이미 정의된 class를 추가함으로써 스타일 변경을 꾀하는 것이 좋다.

위와 같이 수정하면 inline css로 적용되기 때문에 css적용 우선순위의 문제와 가독성을 헤칠 가능성이 있다.
또, css파일로 스타일을 관리하는 것이 훨씬 유지보수성이 좋다.

```js
element.style.backgroundColor = 'white'
```

```html
<h1 style="background-color: white">안녕하세요</h1>
```

정리하자면, **css파일에 적용시킬 css class를 미리 만들어놓고 이 class를 add, remove** 하는 식으로 관리하는 것이 훨씬 좋다.

참고자료

- [External CSS VS Internal CSS VS Inline CSS](https://www.w3schools.com/css/css_howto.asp)

<br>
<br>

### ● addEventListener callback함수의 인자인 event 객체에서 target과 currentTarget 차이?

> > > > > > > 54ba5a9d0cf9e79eaa3b956dc3c9339c58ac51ca

event 객체에서, target은 event가 실제로 일어나는 element라고 보면되고,

> click이벤트면 실제 click한 element

event.currentTarget은 event가 실제 장착된 element라고 보면 된다.

> click 이벤트면 element.addEventListener() 로 실제 이벤트 등록한 element

아마 대부분의 경우에서는 target과 currentTarget은 같을 것 같다.

하지만 다른 경우가 존재하는데,

```html
<div class="outer">
  <div class="inner"></div>
</div>
```

다음과 같이 outer에 이벤트를 추가하면, 자식인 inner에도 해당 이벤트가 발생이 된다.

근데, inner를 클릭해서 outer에 추가한 이벤트가 발생할때에

target과 currentTarget이 달라질 수 있다.

> target : inner / currentTarget : outer

바로 event를 추가한 element 내부에 존재하는 element가 있을 때, 이 내부에 존재하는 element에서 등록된 event가 발생되었다면 **`currentTarget`은 Event가 등록된 element**이고, **`target`은 현재 이벤트가 발생된 element**이다.

<br>
<br>

### ● addEventListener에 함수 인스턴스 차이

아래 예제를 통해 차이를 확인하자.

- 선언 및 생성된 함수 인스턴스

  ```js
  function onClickHandler (event) {
      console.log('click');
  }

  const onSubmitMessage (event) {
      console.log('submit');
  }

  buttonElement.addEventListener('click', onClickHandler);
  formElement.addEventListener('submit', onSubmitMessage);

  buttonElement.addEventListener('click', onClickHandler); // 이미 똑같은 함수 인스턴스로 이벤트 등록되어 있기 때문에 추가 등록 되지 않음 replace됨
  formElement.addEventListener('submit', onSubmitMessage);  // 이미 똑같은 함수 인스턴스로 이벤트 등록되어 있기 때문에 추가 등록 되지 않음 replace됨

  // 버튼 클릭시 'click' 로그 한 번
  // submit시 'submit' 로그 한 번
  ```

- 익명함수 인스턴스

  ```js
  buttonElement.addEventListener('click', event => {
    console.log('click')
  })
  formElement.addEventListener('submit', event => {
    console.log('submit')
  })

  // 함수 인스턴스는 새롭게 생성된 함수 인스턴스이기 때문에 로직만 같을 뿐 똑같은 함수 인스턴스가 없으므로 이벤트 리스너에 추가된다.
  buttonElement.addEventListener('click', event => {
    console.log('click')
  })
  formElement.addEventListener('submit', event => {
    console.log('submit')
  })

  // 버튼 클릭시 'click' 로그 두 번
  // submit시 'submit' 로그 두 번
  ```

참고자료 : [Multiple identical event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Multiple_identical_event_listeners)

<br>
<br>

### 🎇 addEventListener의 callback 함수에서의 this 키워드

내가 클래스 키워드를 이용해서 컴포넌트를 만들어봤는데, 이 때 이 컴포넌트에 해당되는 버튼을 클릭하면 버튼클릭 이벤트를 추가하는 부분을 넣은 적이 있었다. 하지만 내부에서 `this`키워드가 제대로 동작하지 않았는데 다음을 살펴보자.

`#`으로 붙은 변수들은 class에서 [private field](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Field_declarations)로 선언된 것들이다.

```js
export default class myComponent {
    // 아래는 private field 선언
    #targetElement;
    #requireData;
    #onClickButton;
    constructor ({ $target, requireData, onClickButton }) {
        this.#targetElement = $target;
        this.#requireData = requireData;
        this.#onClickButton = onClickButton;

        this.buttonElement = this.#targetElement.querySelector('.button');

        this.setEvent();
    }

	function setEvent() {
        // 아래와 같이 button Element에 함수 선언식으로 구현된 함수를 onClick Event로 추가
        this.buttonElement.addEventListener('click', this.onButtonClickInnerHandler);
    }

	function onButtonClickInnerHandler(event) {
    	console.log('this data:', this.requireData); // 현재 클래스로 생성된 인스턴스의 requireData를 사용하려고 하였음.

        this.#onClickButton(); // 생성자 인자로 받았던 onClickButton함수 실행
	}
}
```

위 코드처럼 구현을 했었는데, 문제가 있었다.

문제는 `addEventListener`로 등록된 `onButtonClickInnerHandler` 함수에서 발생하였는데,
`addEventListener`로 등록된 함수에서의 `this`키워드는 `event.target`과 똑같다.

```js
someElement.addEventListener('click', function (e) {
    console.log(e.currentTarget === this); // true
}
```

참고자료:

- [this: As a DOM event handler](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#As_a_DOM_event_handler)

- ["this" and Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#this_and_Arrow_Functions)

그래서 나는 해결을

```js
	onButtonClickInnerHandler = (event) => {
    	console.log('this data:', this.requireData); // 현재 클래스로 생성된 인스턴스의 requireData를 사용하려고 하였음.

        this.#onClickButton(); // 생성자 인자로 받았던 onClickButton함수 실행
	}
```

와 같이 class 내부에서 arrow function으로 해결을 했는데 class내부에서 arrow function은 쓰면 안된다.

<br>
<br>

### ● class 내부에서 arrow function 사용 불가능

class 내부에서 arrow function 사용 불가능하다.

위와같이 class 내부에서 이벤트함수로 this를 사용해야된다면 this를 bind시키는 방법을 사용하자.

```js
export default class myComponent {
    constructor ({ $target, requireData, onClickButton }) {
        this.targetElement = $target;
        this.requireData = requireData;
        this.onClickButton = onClickButton;

        this.buttonElement = this.targetElement.querySelector('.button');

        this.setEvent();
    }

	function setEvent() {
        // 아래와 같이 button Element에 함수 선언식으로 구현된 함수를 onClick Event로 추가
        this.buttonElement.addEventListener('click', this.onButtonClickInnerHandler.bind(this)); // this bind!
    }

	function onButtonClickInnerHandler(event) {
    	console.log('this data:', this.requireData); // 현재 클래스로 생성된 인스턴스의 requireData를 사용하려고 하였음.

        this.#onClickButton(); // 생성자 인자로 받았던 onClickButton함수 실행
	}
}
```

<br>
<br>

### 🎇 module.exports는 ES5가 아니라 NodeJS 문법이고, CommonJS이다.

우리가 흔히 쓰는 `import` `export` 키워드는 ES2015에서 새롭게 도입된 키워드.

```js
import lodash from 'lodash'

export default function moduleFunc() {
  // ToDo...
}
```

하지만 이 전에 모듈사용은 다음과같이

```js
const lodash = require('lodash')

function moduleFunc() {
  // ToDo...
}

module.exports = moduleFunc
```

와 같이 `require`를 사용하였는데, 이는 JavaScript 문법이 아니고 당연히 ES5 문법이 아니다.

**이는 `NodeJS`에서 기본모듈시스템으로 도입된 `CommonJS`이다.**

CommonJS 관련 문서는 아래를 참조하자.

- [Indroduction to CommonJS](https://flaviocopes.com/commonjs/)
- [Poiemaweb Module](https://poiemaweb.com/es6-module)
- [Node.js Documentation Modules](https://nodejs.org/docs/latest/api/modules.html)

<br>
<br>