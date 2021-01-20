---
title: '하옹의 자바스크립트 식사 - Hoisting'
draft: false
date: '2020-12-15'
category: 'javascript'
tags: ['javascript', 'hoisting', '하옹의 자바스크립트 식사']
---

\* 이 글은 [MDN](https://developer.mozilla.org/es/), [Vanilla Coding Prep 강의자료](https://www.vanillacoding.co/), [PoiemaWeb](https://poiemaweb.com/)등 공신력있는 곳들을 참조한 글입니다.

## Hoisting?

우선, 영단어 `Hoisting`의 원형인 `Hoist`라는 단어의 뜻부터 알아보자.

- 감아 올리기, (밧줄이나 장비를 이용하여) 들어[끌어]올리다
- (화물장애인을 들어올리기 위한)승강 장치

이 처럼 Hoisting이라는 의미는 위로 끌어올리다 라는 뜻을 내포하고 있다.

Javascript에서 이런 끌어올리다 라는 개념이 어디에 적용될 수 있을까?

답은 바로 변수와 함수에 있다.

`Hoisting`은 Javascript 실행 컨텍스트(Execution Context)의 특성으로 변수와 함수가 선언 및 할당이 되어진 구문에서 **자동적으로 선언부분만 분리되어 유효 스코프 내에서 최상단으로 끌어올려 이루어지는 작업**을 말한다.

예를 한번 들어보자.

```js
function func() {
  console.log(hoist)
  var hoist = 'Is true?'
}

func()
```

위의 결과는 어떻게 될까?

생각하기로는 당연히 애러가 나와야 정상이지만 Javascript의 실행 컨텍스트(Execution Context)의 특성으로 `func`함수의 **스코프 최상단에서 모든 변수와 함수의 선언**이 이루어진다.

따라서 내부적으로 아래와 같이 동작하게 된다고 보면 된다.

```js
function func() {
  var hoist
  console.log(hoist)
  hoist = 'Is true?'
}

func()
```

이 처럼 **변수의 선언문만 분리되어서 스코프내 최상단으로 올라가는 현상**을 `Hoisting`이라고 한다.

> 사실, 실제로 이러한 식별자(변수, 함수)들이 끌어올려지는건 아니지만 편의상 이와같이 해석해도 무리는 없다.
>
> 호이스팅을 제대로 이해하려면 실행컨텍스트, 자바스크립트 엔진, 컴파일 과정, 스코프, 자바스크립트의 메모리 관리 등을 모두 이해해야 한다고 한다.

## 함수선언식, 함수표현식에서의 호이스팅

이 호이스팅은 함수선언식과 함수표현식에 대해 동작이 다르게 작동한다.

아래에서 어떻게 작동하는지 살펴보자.

### 함수표현식 (Function Expression)

```js
sayHi()

var sayHi = function() {
  console.log('hi')
}
```

우선 이 결과는 error가 나오게 되는데, 그 이유는 sayHi가 `undefined`이기 때문.

함수표현식은 변수가 선언되고 함수가 이 변수에 할당된다고 보면 된다.

1. `sayHi`변수 선언 후
2. `function () { }`의 익명함수를 할당

그래서 호이스팅으로 선언문과 할당문이 분리가 되고, 선언문이 유효 스코프내 최상단으로 끌어올려지게 된다.

```js
var sayHi

sayHi()

sayHi = function() {
  console.log('hi')
}
```

이런식으로 내부적으로 작동되기 때문에 sayHi를 호출한 시점에서는 변수 할당이 되어있지 않으므로 `undefined`로 초기화 되어있는 상태. 그리고 `undefined`를 함수처럼 사용하면 `Uncaught TypeError: undefined is not a function` 애러가 발생한다.

### 함수선언식 (Function)

함수 선언식은 선언문과 할당문이 있는게 아닌, 그 자체로 선언문이기 때문에 호이스팅이 일어나도 선언문 그 자체로 끌어올려지기 된다.

```js
sayHi()

function sayHi() {
  console.log('hi')
}
```

함수표현식과 다르게 `sayHi()` 함수가 정상 작동하게되고, 이는 `sayHi()` 함수가 호이스팅 되었다는걸 의미한다.

```js
function sayHi() {
  console.log('hi')
}

sayHi()
```

와 같다.

### var VS 함수선언식 VS 함수표현식

```js
function func() {
  hello() // 'hello'
  console.log(hoist) // undefined
  console.log(typeof hi) // 'undefined'

  // hois 변수
  hoist = 'Is true?'

  // hi 함수표현식
  hi = function hi() {
    console.log('hi')
  }

  // hello 함수선언식
  function hello() {
    console.log('hello')
  }

  hello() // 'hello'
  console.log(hoist) // 'Is true?'
  console.log(typeof hi) // 'function'
}
```

## let, const의 등장

위와같이 var 키워드로 변수 선언시 Hoisting 때문에 코드 흐름제어가 힘들어지기 시작했는데,

```js
// var count; 로 호이스팅되어 undefined로 초기화된 상태
// ...
count = 10 // count에 10할당

//...

console.log(count)
var count = 0
```

이와 같이 <u>순서가 꼬였을 경우나 중복된 이름의 변수명을 사용할 때</u>에 호이스팅으로 변수 선언문이 자동적으로 올라가게되어 <u>원래 의도했던 동작대로 작동이 안되거나 애러가 날 상황인데 그대로 진행되는 현상</u>이 발생한다.

그렇기 때문에 개발자들이 코딩을 하면서 호이스팅 여부를 계속해서 판단해야되는 번거로움이 생겼고,

이를 **해결하기위해서 나타난게 let과 const 키워드**이다.

> let과 const는 호이스팅뿐만 아니라 중복선언을 해결하고 블록스코프를 적용시키기위해 도입되었다.

위의 코드를 let으로 선언하게될경우 어떻게 되는지 확인해보자.

```js
count = 10 // Error

//...

console.log(count)
let count = 0
```

이처럼 let 키워드는 호이스팅되지 않기 때문에 개발자들이 호이스팅에 신경을 끄고 온전히 코드 흐름에 집중할 수 있게 되었다.

## TDZ (Temporal Dead Zone)

let키워드와 const키워드는 어떻게 호이스팅을 방지한 것일까?

그 방법은 **`let`과 `const`로 선언된 변수는 TDZ가 적용된다는 것이다.**

TDZ란 Temporal Dead Zone으로 직역하면 '임시적으로 죽어있는 공간' 인데, 이는 **변수를 사용할 수 없는, 변수를 사용하는 것을 비허용하는 개념상의 공간**이다.

이 TDZ영역은 `let`과 `const`로 선언된 변수에게만 생기고 변수가 할당(초기화)되기 전까지는 모두 TDZ로 정해진다.

즉, **`let`과 `const`로 선언된 변수는 <u>호이스팅이 일어나지만</u> 할당(초기화)되기 전까지는 TDZ라는 영역으로 정해지기 때문에 선언과 참조가 불가능**하게 된다.

이것이 마치 호이스팅이 일어나지않은 것 처럼 보이게되는 것이다.

우리는 선언된 변수가 호이스팅이 일어났지만 TDZ로 사용할 수 없다는 걸 `typeof` 연산자를 통해 확인해볼 수 있다.

```js
typeof notDefined // 'undefined'
```

```js
typeof varKeyword // 'undefined'
var varKeyword
```

```js
{
  typeof letKeyword // ReferenceError : Cannot access 'letKeyword' before initialization
  let letKeyword
}
```

> 아래 {}는 let키워드의 블록스코프를 지정해주기위해 사용했다.

다음과 같이 선언되지 않거나 `var`로 선언한 변수는 `'undefined'` type이지만,
`let`으로 선언한 TDZ가 생성되어 TDZ영역안에 있는 변수는 `ReferenceError`가 발생하고 있다.

## 호이스팅을 피하기 위한 방법

### 변수 : var 키워드 지양

호이스팅을 피하기위해 변수는 var키워드를 사용하지 말아야 한다.

`var`키워드는 함수스코프적용과 호이스팅이 발생한다는 문제점이 있으므로 사용하지 말고,
`let`과 `const` 키워드를 사용해야 한다.

#### 변수 선언 Tip

변수를 선언할 때 우선 `const`로 선언을 하고 재할당이 된다면 `let`으로 변경하도록 하자.

그 외 `var`키워드는 사용하지 않는다.

### 함수 : 함수표현식보다는 함수선언식

함수는 변수와 다르게 함수 구문 전부가 호이스팅되는 것이 편리하다.

이유는 함수를 사용함에 있어서 먼저 선언이 되고 함수가 호출, 사용하도록 하게 코딩을 한다는 것이 코드 가독성을 해칠수도 있고, 매우 번거로울 수 있다.

그래서 함수 선언식을 통해 자연스럽게 코드에 집중 할 수 있도록 하는 편이 바람직하다.

```js
sayHi()

function sayHi() {
  console.log('hi')
}
```

## Hoisting의 숨겨진 사실

사실 호이스팅은 ES2015이전에 표준 명세에서 사용된 적이 없는 용어이다.

하지만, 위와같은 Javascript 동작에 대해 쉽게 이해하기 위해 만들어진 개념으로,
사실은 물리적으로 작성한 코드의 상단으로 옮겨지는 것이 아니라 위 처럼 변수, 함수 선언이 유효스코프 최상단으로 끌어올려진 후에 사용되는 것 처럼 보이지만 실제 매모리 상에서는 코드에서 입력한 위치 순서대로 들어가게 된다고 한다.

컴파일 단계에서 메모리의 저장된 변수들을 보면, 코드에서 입력한 위치와 정확히 일치한 곳에 있다고 한다.

호이스팅이란 단어는 **Javascript 엔진 동작을 쉽게 이해하기위한 개념으로 알아두자.**
