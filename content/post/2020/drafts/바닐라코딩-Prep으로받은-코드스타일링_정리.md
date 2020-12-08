---
title: "바닐라코딩 Prep 과제로 받은 코드스타일링"
draft: true
date: "2020-12-03"
category: "vanilla coding"
tags: ['javascript', 'prep', 'code-review', 'code-styling']
---

## Prep 코드리뷰로 정리하는 코드 스타일링

### 개발관련

#### .gitignore에 package-lock.json을 넣으면 안된다.

나는 `package-lock.json`이 필요없이, 그냥 `npm install`시에 생기는 부산물이라고 생각해서 `.gitignore`에 `package-lock.json`을 추가했던 적이 있다. 하지만 이 `package-lock.json`은 `package.json`의 부족한 정보를 담고있는 것인데, `pack.json`에 우리가 다운받으면 나오는 버전에 대한 정보는 사실 명확한 버전이 아니라 버전에 대한 `범위(Caret Range)`를 표기하고 있다. 그래서 명확한 버전이 아니기 때문에 명확한 버전에 대한 정보를 담는 것이 바로 `package-lock.json`이고 이 `package-lock.json`이 있다면 `npm install`시에 `package-lock.json`을 통해 `node-modules`폴더를 생성하게 된다. 만약, `package-lock.json`이 없다면 `package.json`을 참고해서 생성되기 때문에 명확하지 않은 정보로 생성이 된다. 

소스를 배포나 공유시에 이 `package-lock.json`이 없다면, 내가 다운받고 개발한 환경과 다르게 `package.json`을 통해 명확하지 않은 모듈들을 받을 수 있으므로 제대로 작동하지 않을 확률이 높다.

따라서 **`package-lock.json`은 소스 코드를 배포 혹은 공유시에 함게 공유**되어야 한다.



#### newline 추가

git을 이용할때에는 항상 파일의 끝에 `new line`이 추가되어야 한다.

이는 git에서 `new line`을 통해 파일 구분을 하기 때문.

**`new line`이 없다면 git에서 문제가 생길 확률이 높다.**



#### 사용하지 않는 변수 꼭 제거하기

사용하지 않는 변수는 꼭 제거해야 한다.



#### 변수에 leteral로 할당하는 것 보다 상수로 관리할 수 있다면 관리하자.

```js
const startButtonElement = document.querySelector('.start-btn');
const answerTextBoxElement = document.querySelector('input.input-answer');
const timeLimit = 100;
```

과 같이 관리하는 것 보다

```js
const START_BTN_CLASSNAME = '.start-btn';
const ANSWER_TEXT_BOX_SELECTOR = 'input.input-answer';
const TIME_LIMIT = 100;
```

과 같이 상수로 저장시켜두고, (별도로 상수 파일을 만들면 더 좋다. `variable.js`)

```js
const startButtonElement = document.querySelector(START_BTN_CLASSNAME);
const answerTextBoxElement = document.querySelector(ANSWER_TEXT_BOX_SELECTOR);
const timeLimit = TIME_LIMIT;
```

와 같이 상수를 이용하게끔 하면 재사용에 대해 대비할 수 있고 훨씬 완성도 있어 보인다.



#### 디버깅을 위한 console.log는 PR(Pull Request) 혹은 MR(Merge Request)전에 항상 제거하자

완성 후 제출을 하는 PR이나 MR에서 디버깅을 위한 console.log가 찍혀있다면 코드 완성도의 느낌이 떨어질 수 있고, master에 Merge시킬 때 관리자가 일일이 다 제거해야되는 번거로움이 생긴다. 



### 코드스타일 관련

#### 줄임말 보다는 길더라도 명확하게 Naming하자



#### 함축적인 표현보다 길더라도 명확하게 Naming하자

변수나 함수 Naming시에 짧고 함축적인 것 보다 무조건 명확하게 작성하는게 중요하다.

예를들어,

```js
let quizCount;

function getQuizCount() {
    return quizCount;
}
```

처럼 되어있다면, 이 quizCount는 전체 quiz의 개수인지 내가 푼 quiz의 개수인지 알 수 없다.

logic을 확인해봐야 하는 번거로움이 생긴다.

```js
let currentQuizCount;
let allQuizCount;

function getCurrentQuizCount() {
    return currentQuizCount;
}

function allQuizCount() {
    return allQuizCount;
}
```

와 같이 표현하는게 훨씬 좋다.







#### Bool 변수 Naming

#### 함수 Naming에서는 동사가 앞에 와야 한다.



### 자바스크립트 문법 관련

#### addEventListener callback함수의 인자인 event 객체에서 target과 currentTarget 차이?

event 객체에서, target은 event가 실제로 일어나는 element라고 보면되고,

> click이벤트면 실제 click한 element

event.currentTarget은 event가 실제 장착된 element라고 보면 된다.

> click 이벤트면 element.addEventListener() 로 실제 이벤트 등록한 element

아마 대부분의 경우에서는 target과 currentTarget은 같을 것 같다.

하지만 다른 경우가 존재하는데,

```html
<div class="outer">
  <div class="inner">
    
  </div>
</div>
```

다음과 같이 outer에 이벤트를 추가하면, 자식인 inner에도 해당 이벤트가 발생이 된다.

근데, inner를 클릭해서 outer에 추가한 이벤트가 발생할때에

target과 currentTarget이 달라질 수 있다.

> target : inner / currentTarget : outer

바로 event를 추가한 element 내부에 존재하는 element가 있을 때, 이 내부에 존재하는 element에서 등록된 event가 발생되었다면 **`currentTarget`은 Event가 등록된 element**이고, **`target`은 현재 이벤트가 발생된 element**이다.





#### addEventListener에 함수 인스턴스 차이

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
  
  buttonElement.addEventListener('click', onClickHandler); // 이미 똑같은 함수 인스턴스로 이벤트 등록되어 있기 때문에 추가 등록 되지 않음
  formElement.addEventListener('submit', onSubmitMessage);  // 이미 똑같은 함수 인스턴스로 이벤트 등록되어 있기 때문에 추가 등록 되지 않음
  
  // 버튼 클릭시 'click' 로그 한 번
  // submit시 'submit' 로그 한 번
  ```

- 익명함수 인스턴스

  ```js
  buttonElement.addEventListener('click', (event) => {
     console.log('click');
  });
  formElement.addEventListener('submit', (event) => {
      console.log('submit');
  });
  
  // 함수 인스턴스는 새롭게 생성된 함수 인스턴스이기 때문에 로직만 같을 뿐 똑같은 함수 인스턴스가 없으므로 이벤트 리스너에 추가된다.
  buttonElement.addEventListener('click', (event) => {
     console.log('click');
  });
  formElement.addEventListener('submit', (event) => {
      console.log('submit');
  });
  
  // 버튼 클릭시 'click' 로그 두 번
  // submit시 'submit' 로그 두 번
  ```

참고자료 : [Multiple identical event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Multiple_identical_event_listeners)





#### * addEventListener의 callback 함수에서의 this 키워드

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









### 