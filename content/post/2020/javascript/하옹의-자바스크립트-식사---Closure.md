---
title: '하옹의 자바스크립트 식사 - Closure'
draft: false
date: '2020-12-16'
category: 'javascript'
tags: ['javascript', 'closure']
---

\* 이 글은 [MDN](https://developer.mozilla.org/es/), [Vanilla Coding Prep 강의자료](https://www.vanillacoding.co/), [PoiemaWeb](https://poiemaweb.com/)등 공신력있는 곳들을 참조한 글입니다.

## Closure?

클로저(closure)는 내가 Javascript 주요 개념중에서 가장 이해하기 어려웠던 내용 일 것 같다.

간단한 예제는 이해하기 쉬웠지만, Curying과 Memoization 등 다양한 기법들이 첨가되면서 점점 더 복잡해지고 이해하기 어려워졌던 것 같다.

비록 정확한 내용은 아닐지도 모르나 내가 알고있는 지식과 공부한 지식을 나누어 함께 클로저라는 산을 넘어보자.

클로저는 MDN을 참조하자면

> 클로저는 함수와 그 함수가 선언됐을 때의 렉시컬 환경(Lexical environment)과의 조합이다.

라고 시작부터 적혀있다.

알고 보면 맞는말이고 이해가 가지만, 처음 들어서는 잘 모르겠다.

이해를 하고자 하니 함수가 선언되었을 때라고 했으므로 함수가 중요하다는 것과, 렉시컬 환경(Lexical environment)를 알아야 조금이나마 이해가 될 것같다는 느낌이 온다.

이처럼 클로저를 완전히 이해하기위해서는 사전지식이 몇가지가 필요한데,
이 사전지식들은 Javascript Execution Context를 이해하기 위한 발걸음이기도 하다.

> Javascript Excution Context를 알면 Closure 이해가 쉬운데 그만큼 연관되어있는 개념들이다.

내가 이해하는 **클로저는 함수가 선언되는 순간의 환경(Lexical environment)을 기억하는 함수, 함수 내부에 상위 스코프의 변수를 사용하고 있다면 그 상위스코프의 변수를 기억하는 함수** 라고 이해했다.

다른 정의들을 보자면,

1. 변수 자신들이 바인드되는 환경에 한정되지않는 변수를 가지는 표현식
2. 자신이 생성된 함수의 context에 직접 접근(참조)할 수 있는 함수
3. 자신의 context에서 다른 context를 참조하는 상황
4. 함수가 선언됐을 때의 렉시컬 환경과의 조합



여러가지 클로저에 대한 설명과 정리를 보다보니 클로저를 뜻하는 것이
`함수`인건지 발생한 `현상`을 뜻하는건지, `유효범위`를 말하는건지 햇갈렸다.



그래서 내 나름대로 정리를 해봤는데,

'클로저는 함수 선언시 발생하는 렉시컬 환경을 기억하는 현상으로 현재 실행 Context 외부 Context를 참조할 수 있게 되는 함수이자 상황이다.'

라고 정리해보았다.



## Closure를 이해하기위한 사전 지식

클로저를 세부적으로 이해하기위해서는 사전지식이 필요했다.

### 1. 1급 함수 (First class Citizen / First class Obejct / First class Function)

#### 1급 시민 (First class Citizen)

프로그래밍에 있어서 1급시민이라는 말은 다음과 같은 조건이 충족되는 것이다.

- 변수(variable)에 담을 수 있다
- 인자(parameter)로 전달할 수 있다
- 반환값(return value)로 전달할 수 있다



여러 언어를 보면 당연히 변수에 담을 수 있고 인자로 전달할 수도 있으며 반환값이 되는 것들은 정수리터럴, 문자열 리터럴, 그외 자료구조 등등이 될 수 있다.



#### 1급 객체 (First class Obejct)

당연히 1급 객체는 객체를 1급시민으로써 취급되는, 위 조건을 만족하는 객체를 말한다.

객체가 변수에 담을 수 있고, 인자로 전달할 수 있으며 반환값이 되면 1급 객체라 부를 수 있다.



#### 1급 함수 (First class function)

1급 함수는 함수가 1급 객체로 취급된다는 말이며
이말은 1급 함수 또한 마찬가지로 함수가 1급시민의 조건에 부합한다는 말이다.

하지만 1급 함수는 1급객체와는 다르게 추가적인 조건이 더 부합되어야 한다.

- 런타임(runtime) 생성이 가능하다
- 익명(anonymous)으로 생성이 가능하다.

이를 통해 C, C++, Java, C#등의 함수는 1급 함수가 되지 못하는 것을 알 수 있다.

또 **Javascript의 함수는 1급 함수**인 것도 알 수 있다.



#### 1급 함수가 중요한 이유

이 1급 함수가 함수형 프로그래밍의 근간이기도 하면서 상당히 중요한데, 왜 중요하냐면 바로 **고차함수(high order function)**가 가능하기 때문이다.

우리가 Javascript를 사용하면서 배열의 `map`, `reduce`, `filter`등과 같은 메서드들을 사용하였는데,
이들이 모두 고차함수이다. 편리함은 다들 알고있을 것이다.

고차함수는 1급함수의 특징을 이용하여, 

- 함수를 인자로 받거나
- 함수를 반환값으로 전달 할 수 있다.

그리고 이 1급 함수, **고차함수를 이용해 클로저를 형성 및 클로저 함수를 생성**시킬 수 있다.

이런 고차함수와 클로저의 특성을 이용해서 그 유명한 **Currying** 혹은 **Memoization** 과 같은 기법이 가능해진다.

```js
function memoization (func) {
  const cache = {}

  return function(...args) {
    const key = JSON.stringify(args)
    if (!cache.hasOwnProperty(key)) {
      cache[key] = func.apply(this, args)
    }

    return cache[key]
  }
}
```



### 2. Lexical Scoping (Environment)

#### Lexical Scope

Lexical Environment는 **Lexical Scope**에 따라 정해지는 **Context**를 의미한다.

Lexical Scope는 [이전 Scope 포스트의 Lexical Scope](https://ha-young.github.io/2020/javascript/%ED%95%98%EC%98%B9%EC%9D%98-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8B%9D%EC%82%AC---Scope/#%EC%8A%A4%EC%BD%94%ED%94%84-%EA%B2%B0%EC%A0%95-%EB%B0%A9%EC%8B%9D--lexical-scope-%EB%A0%89%EC%8B%9C%EC%BB%AC-%EC%8A%A4%EC%BD%94%ED%94%84)에 적어두었다.

<a href='https://dmitripavlutin.com/simple-explanation-of-javascript-closures/' ><img src=".\javascript-closure-1.png" alt="the closure captures variables from lexical scope" style="zoom:50%;" /></a>

이 이미지를 보면 `innerFunc`이 생성되었을 때의 lexical scope 환경인 outerVar를 접근 할 수 있는데,
이 `outerVar` 변수를 `innerFunc` 함수에서 조작할 수 있는 이 상황이 바로 클로저이다. `innerFunc`에서 계속해서 상위 스코프의 `outerVar` 변수를 계속해서 참조할 수 있고, `outerVar`변수에서의 값은 계속해서 유지된다. (다른 Context에 존재하지만)

#### Scope Chain (유효범위 체인)

클로저는 [Scope 포스팅의 스코프체인](https://ha-young.github.io/2020/javascript/%ED%95%98%EC%98%B9%EC%9D%98-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8B%9D%EC%82%AC---Scope/#scope-chain)에서 설명한 것 그대로 캡처 할 변수를 선택하게 된다. 
Lexical Environment에서 정해진 스코프체인의 특성 및 식별자 결정 순서대로 변수가 캡처되면서 클로저가 형성된다고 보면 된다.



### 3. Garbage Collector(가비지 콜렉터)

객체를 만들면 메모리 공간이 할당됩니다. 객체가 참조하지 않는 상태가 되었을 때 메모리 공간을 자동으로 없애주는 역할을 하는 것이 **가비지 컬렉터**입니다.

<iframe src="https://wooder2050.medium.com/media/ab1188dd959c3ff3a7ce4bff8890bd92" allowfullscreen="" frameborder="0" height="105" width="680" title="alone_js3.js" class="fy fo fl kq w" scrolling="auto" style="box-sizing: inherit; width: 680px; left: 0px; top: 0px; position: absolute; height: 105px;"></iframe>

세 번째 줄에서 ‘p = null; ’을 실행하게 되면 변수 p는 더 이상 x,y를 참조하지 않게 되고 x와y를 참조하는 변수는 없게 됩니다. 이때 x와 y는 가비지 컬렉터에 의해서 메모리에서 해제됩니다.



참조되지 않는 객체는 가비지 컬렉터에 의해서 메모리 해제된다.

가비지 컬렉터는 브라우저마다 다르게 실행됩니다. 예를 들어 IE 6 이전 버전에서는 **참조 카운터 방식**을 사용하는데 이 방식은 고립된 **순환 참조**가 발생했을 때 메모리 누수를 해결하지 못한다는 단점이 있습니다.

https://wooder2050.medium.com/%EC%9D%B4%EB%A1%A0-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8A%A4%EC%BD%94%ED%94%84%EC%99%80-%ED%81%B4%EB%A1%9C%EC%A0%80-%EC%A0%95%EB%A6%AC-331da8d8b00b

https://www.slideshare.net/jisuyoun/javascript-closure-13832628



## Closure의 특성

1. 지역변수 x는 자신을 참조하는 함수가 소멸될 때까지 유지된다.
2. 클로저에 존재하는 변수들은 값이 계속해서 유지된다.
3. 전역 변수의 사용을 막을 수 있다.
4. 

[https://dmitripavlutin.com/simple-explanation-of-javascript-closures/]: 