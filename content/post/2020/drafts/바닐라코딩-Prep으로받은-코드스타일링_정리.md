---
title: "바닐라코딩 Prep 과제로 받은 코드스타일링"
draft: true
date: "2020-12-03"
category: "vanilla coding"
tags: ['javascript', 'prep', 'code-review', 'code-styling']
---

## Prep 코드리뷰로 정리하는 코드 스타일링

### .gitignore에 package-lock.json을 넣으면 안된다.

나는 `package-lock.json`이 필요없이, 그냥 `npm install`시에 생기는 부산물이라고 생각해서 `.gitignore`에 `package-lock.json`을 추가했던 적이 있다. 하지만 이 `package-lock.json`은 `package.json`의 부족한 정보를 담고있는 것인데, `pack.json`에 우리가 다운받으면 나오는 버전에 대한 정보는 사실 명확한 버전이 아니라 버전에 대한 `범위(Caret Range)`를 표기하고 있다. 그래서 명확한 버전이 아니기 때문에 명확한 버전에 대한 정보를 담는 것이 바로 `package-lock.json`이고 이 `package-lock.json`이 있다면 `npm install`시에 `package-lock.json`을 통해 `node-modules`폴더를 생성하게 된다. 만약, `package-lock.json`이 없다면 `package.json`을 참고해서 생성되기 때문에 명확하지 않은 정보로 생성이 된다. 

소스를 배포나 공유시에 이 `package-lock.json`이 없다면, 내가 다운받고 개발한 환경과 다르게 `package.json`을 통해 명확하지 않은 모듈들을 받을 수 있으므로 제대로 작동하지 않을 확률이 높다.

따라서 `package-lock.json`은 소스 코드를 배포 혹은 공유시에 함게 공유되어야 한다.



### newline 추가

git을 이용할때에는 항상 파일의 끝에 `new line`이 추가되어야 한다.

이는 git에서 `new line`을 통해 파일 구분을 하기 때문.

`new line`이 없다면 git에서 문제가 생길 확률이 높다.



### 사용하지 않는 변수 꼭 제거하기

사용하지 않는 변수는 꼭 제거해야 한다.



### addEventListener에 함수 인스턴스 차이

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

  



### 변수에 leteral로 할당하는 것 보다 상수로 관리할 수 있다면 관리하자.

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





### 디버깅을 위한 console.log는 PR(Pull Request) 혹은 MR(Merge Request)전에 항상 제거하자

완성 후 제출을 하는 PR이나 MR에서 디버깅을 위한 console.log가 찍혀있다면 코드 완성도의 느낌이 떨어질 수 있고, master에 Merge시킬 때 관리자가 일일이 다 제거해야되는 번거로움이 생긴다. 



### 줄임말 보다는 길더라도 명확하게 Naming하자



### 함축적인 표현보다 길더라도 명확하게 Naming하자

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







### Bool 변수 Naming

### 함수 Naming에서는 동사가 앞에 와야 한다.



### 