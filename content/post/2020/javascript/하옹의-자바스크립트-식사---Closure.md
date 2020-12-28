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



### 나의 정리

그래서 내 나름대로 정리를 해봤는데,

> '클로저는 어떤 함수 내부에서 함수를 선언시에 렉시컬 스코프 환경을 기억하는 현상으로 현재 실행 Context에서 외부 Context를 참조할 수 있게 되는 함수이자 상황이다.'

라고 정리해보았다.



### 예제로 Closure 맛보기

위에서 간략 정리했듯이, 클로저는 함수 내부에서 함수를 선언(정의)하는 것이고 이 함수를 리턴하여 바깥에서 주로 사용하게 된다.

소스를 보면서 클로저를 이해해보자.

```js
function makeClosure(arg) {
    var outerVariable = 'Closure';
    var count = 0;
    
    return function getClosure() {
        console.log('Hello' + outerVariable);
        console.log('arg : ', arg);
        console.log('count' : count);
        count++;
    }
}

var closureFunc = makeClosure(30);

closureFunc(); // hello Closure / arg : 30
closureFunc(); // hello Closure / arg : 30
```

`makeClosure()` 함수는 매개변수 하나를 받고, 호출되었을 때 주어진 매개변수 `arg`와 `makeClosure()` 내부 변수를 이용하는 새 함수 `getClosure()`를 생성한다.

여기서 함수 `getClosure()`가 리턴되면서 `makeClosure()`  Context가 끝났기 때문에 해당 스코프가 사라진다고 볼 수 있으나, 반환된 `getClosure()` 함수 때문에 해당 스코프내의 변수는 여전히 존재하고 있다.

이처럼 사실은 반환된 함수 `getClosure()` 를 받은 `closureFunc()` 함수는 `outerVariable`, `arg` `count`  와 같은 변수를 가지고 있는 스코프가 아니지만 `getClosure` 함수가 선언 및 생성될 때에 당시의 외부스코프(상위스코프)의 변수(참조하는 값)를 기억하게 되어 이후에도 계속 사용할 수 있게 된다. 이를 클로저가 형성되었다 라고 한다.

> 이를 간단히 함수가 선언될 때 함수의 주변의 환경을 기억하게 된다 고도 한다.



### 

## Closure를 이해하기위한 사전 지식

클로저를 세부적으로 이해하기위해서는 사전지식이 필요하다.

바로 클로저가 생성되는 이유이자 원리를 담당하는 1급함수, 렉시컬 환경, 가비지 콜렉터이다.

이 부분은 바로 이해하지 못하더라도 본문을 읽고 다시보거나 계속해서 본다면 더욱더 클로저와 친밀해질 것이다.

### 1. 1급 함수 (First class Citizen / First class Obejct / First class Function)

#### 🤵1급 시민 (First class Citizen)

프로그래밍에 있어서 1급시민이라는 말은 다음과 같은 조건이 충족되는 것이다.

- 변수(variable)에 담을 수 있다
- 인자(parameter)로 전달할 수 있다
- 반환값(return value)로 전달할 수 있다



여러 언어를 보면 당연히 변수에 담을 수 있고 인자로 전달할 수도 있으며 반환값이 되는 것들은 정수리터럴, 문자열 리터럴, 그외 자료구조 등등이 될 수 있다.



#### 🦝1급 객체 (First class Obejct)

당연히 1급 객체는 객체를 1급시민으로써 취급되는, 위 조건을 만족하는 객체를 말한다.

객체가 변수에 담을 수 있고, 인자로 전달할 수 있으며 반환값이 되면 1급 객체라 부를 수 있다.



#### ⚙1급 함수 (First class function)

1급 함수는 함수가 1급 객체로 취급된다는 말이며
이말은 1급 함수 또한 마찬가지로 함수가 1급시민의 조건에 부합한다는 말이다.

하지만 1급 함수는 1급객체와는 다르게 추가적인 조건이 더 부합되어야 한다.

- 런타임(runtime) 생성이 가능하다
- 익명(anonymous)으로 생성이 가능하다.

이를 통해 C, C++, Java, C#등의 함수는 1급 함수가 되지 못하는 것을 알 수 있다.

또 **Javascript의 함수는 1급 함수**인 것도 알 수 있다.



#### 🎈1급 함수가 중요한 이유

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

<img src=".\javascript-closure-1.png" alt="the closure captures variables from lexical scope" style="zoom: 33%;" />

이 이미지를 보면 `innerFunc`이 생성되었을 때의 lexical scope 환경인 outerVar를 접근 할 수 있는데,
이 `outerVar` 변수를 `innerFunc` 함수에서 조작할 수 있는 이 상황이 바로 클로저이다. `innerFunc`에서 계속해서 상위 스코프의 `outerVar` 변수를 계속해서 참조할 수 있고, `outerVar`변수에서의 값은 계속해서 유지된다. (다른 Context에 존재하지만)

#### Scope Chain (유효범위 체인)

클로저는 [Scope 포스팅의 스코프체인](https://ha-young.github.io/2020/javascript/%ED%95%98%EC%98%B9%EC%9D%98-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8B%9D%EC%82%AC---Scope/#scope-chain)에서 설명한 것 그대로 캡처 할 변수를 선택하게 된다. 
Lexical Environment에서 정해진 스코프체인의 특성 및 식별자 결정 순서대로 변수가 캡처되면서 클로저가 형성된다고 보면 된다.



### 3. Garbage Collector(가비지 콜렉터)

C, C++와 같은 Unmanaged 언어를 제외하고서, 프로그래밍에서 기본적으로 객체를 만들면 자동적으로 메모리 공간이 할당되는데, 이 객체가 참조하지 않는 상태가 되었을 때, 더 이상 사용되지 않을 때 메모리 공간을 자동으로 없애주는 역할을 하는 것이 **가비지 컬렉터**이다.

> 자동으로 사용하지 않는 객체들을 수거해 메모리를 청소하는 것.

가비지 컬렉터는 브라우저마다 다르게 실행되는데, 가비지 콜렉터의 방식은 두가지가 있다.

- Reference-Counting (참조 카운터 방식)
- Mark-and-Sweep (표시하고 쓸기 방식)

참조 카운터 방식은 순환참조 발생의 문제가 있는 반면, 표시하고 쓸기 방식은 순환참조의 문제는 없지만 수동 메모리 해제를 하지 못한다는 각각의 장단점이 있다.

2012년을 기준으로 거의 모든 최신브라우저는 Mark-and-Sweep 방식의 가비지 콜렉션을 수행한다.

![Mark and sweep garbage collector](.\javascript-closure-2.png)

클로저에 의해 캡처 된 상위 스코프의 지역 변수는 정의 된 함수가 완료되고 해당 범위 내에 정의 된 모든 함수가 GC 처리되면 가비지 수집됩니다.



#### 🎇클로저를 자세히 이해하는데 가비지 콜렉터를 알아야 되는 이유

바로 위에 설명한 클로저로 형성된 상위 스코프의 지역변수를 GC 처리되는 과정의 이해도 있지만,

클로저를 사용할 때에는 주의할 점이 있는데, 바로 **메모리 누수 문제**이다.

내부함수에서 상위 스코프 외부함수의 객체들을 참조하는 클로저가 형성되면서 해당 객체를 계속해서 참조하고 있게 된다. 즉, **외부 함수(상위스코프)의 객체를 더이상 사용하지 않아도 클로저가 형성되어 내부함수에서 참조**하고 있으므로 이 가비지 콜렉터가 제대로 작동하지 않을 수 있다는 점이 있는 것이다.

```js
function makeClosure(dataLength) {
    var data = new Array(dataLength * 1000).fill(0); // dataLength로 받은 수의 1000배 길이만큼의 배열 생성
    return function () {
        console.log(`closure data length : ${data.length}`);
    }
}

const closureFunc1 = makeClosure(100);
const closureFunc2 = makeClosure(1000);
const closureFunc3 = makeClosure(10000);

closureFunc1(); // closure data length : 100000
closureFunc2(); // closure data length : 1000000
closureFunc3(); // closure data length : 10000000
```

위 코드를 보면 클로저로 생성된 데이터의 크기가 각각 `100000`, `1000000`, `10000000` 인 `closureFunc` 들이 있다.

여기서 이 데이터들은 어떻게 될까? 

**클로저가 형성되고 있는한 이 데이터들은 GC에 의해 메모리 해제되지 않는다.**

그러므로 이러한 작업이 계속 반복되다보면, 클로저로 형성된 데이터 크기만큼이 메모리에 계속해서 누적이 될 것이다. 

그럼 어떻게 해결해야될까?

```js
function makeClosure(dataLength) {
    var data = new Array(dataLength * 1000).fill(0); // dataLength로 받은 수의 1000배 길이만큼의 배열 생성
    return function () {
        console.log(`closure data length : ${data.length}`);
    }
}

const closureFunc1 = makeClosure(100);
const closureFunc2 = makeClosure(1000);
const closureFunc3 = makeClosure(10000);

closureFunc1(); // closure data length : 100000
closureFunc2(); // closure data length : 1000000
closureFunc3(); // closure data length : 10000000

// 클로저 함수에 대한 참조를 없애 형성된 클로저에 대한 참조값에 GC가 적용되도록 하기
closureFunc1 = null;
closureFunc2 = null;
closureFunc3 = null;
```

다음과 같이 각각 클로저 함수에 대해 null로 할당하여 형성된 클로저에 속하는 모든 변수들에 GC가 작용할 수 있도록 만들어 주면 된다.



더 자세한 예시는 [이곳](https://blog.meteor.com/an-interesting-kind-of-javascript-memory-leak-8b47d2e7f156)을 참조하자.



## 🎆Closure는 어떻게 활용될까?

### memoization (상태 기억)

```js
const memoize = function (func) {
    const cache = {};

    return function (...args) {
        const key = JSON.stringfy(args);
        if (!cache.hasOwnProperty(key)) {
            cache[key] = func.apply(this, args);
        }

        return cache[key];
    };
};
```

다음은 유명한 Javascript 유틸 라이브러리인 lodash의 memoize를 간단하게 구현해본 것이다.

클로저를 활용하여 이전의 argument와 같이 들어온다면 cache에 저장해 놓았다가 연산없이 바로 답을 꺼내 쓸 수 있다.

이처럼 memoize 함수가 가장 대표적인 클로저의 상태기억을 활용한 예시라 할 수 있겠다.



### Information Hiding (정보 은닉)

다른 객체지향언어들과 달리 `Prototype`을 base로한 객체지향을 구현하는 Javascript는 `private`와 같은 접근지정자가 없기 때문에 모두 `public`하게 사용된다.

하지만 클로저를 이용하면 `private` 접근지정자 처럼 필드와 메서드를 선언할 수 있다.

```js
function Person (name, ssn, age) {
    this.name = name;
    this.ssn = ssn;
    this.age = age;
}

Person.prototype.getName = function () {
    return this.name;
}

Person.prototype.getAge = function () {
    return this.age;
}

Person.prototype.maskSSN = function () {
    return this.ssn.replace(/(-?)([1-4]{1})([0-9]{6})\b/gi,"$1$2******");
}

Person.prototype.print = function () {
	return `name : ${this.name} / age : ${this.age} / ssn : ${this.maskSSN(this.ssn)}`;
}
```

다음과 같이 `Person`객체를 구성했다고 하자.

여기서 코드를 보면 알 수 있듯이, ssn은 개인정보(주민등록번호)로 가리고 싶다.
하지만 Prototype 객체지향의 특성상 쉽게 참조 할 수 있다.

```js
const hayoung = new Person('hayoung', '921028-1234567', 29);

hayoung.print(); // "name : hayoung / age : 29 / ssn : 921028-1******"
console.log(hayoung.ssn); // "921028-1234567"
console.log(hayoung.maskSSN()); // 921028-1******
```

다음과 같이 `hayoung.ssn` , `hayoung.maskSSN()`과 같이 private로 선언되어야 할 것 같은 필드와 메서드들을 아무런 제재없이 사용 할 수 있다.

이를 클로저로 정보은닉을 해보자.

> 이렇게 클로저를 사용하는 것을 [javascript 모듈 패턴](https://yubylab.tistory.com/entry/%EB%94%94%EC%9E%90%EC%9D%B8-%ED%8C%A8%ED%84%B4-for-javascript-Module-Pattern) 이라고 한다.

```js
function Person (name, ssn, age) {
    this.name = name;
    this.age = age;
    
    var ssn_ = ssn;
    var maskSSN = function () {
    	return ssn_.replace(/(-?)([1-4]{1})([0-9]{6})\b/gi,"$1$2******");
	}
    this.print = function () {
        return `name : ${this.name} / age : ${this.age} / ssn : ${maskSSN(ssn_)}`;
    }
}

Person.prototype.getName = function () {
    return this.name;
}

Person.prototype.getAge = function () {
    return this.age;
}
```

```js
const hayoung = new Person('hayoung', '921028-1234567', 29);

hayoung.print(); // "name : hayoung / age : 29 / ssn : 921028-1******"
console.log(hayoung.ssn); // undefined
console.log(hayoung.maskSSN()); // Error hayoung.maskSSN is not a function
```

다음과 같이 `print()`함수는 정상작동하나 `hayoung.ssn`과 `hayoung.maskSSN()`의 접근은 안된다는 것을 확인 할 수 있다.



## Closure의 메모리 누수 문제

### 각자의 환경을 갖는 클로저, 참조를 제거하지 않았을 때

앞선 예제들로 확인할 수 있는 사항이지만, 클로저는 각자의 환경을 갖는다.

```js
function makeClosure (prop) {
    var closureVal = prop;
    return function () {
        console.log(closureVal);
    }
}

var closureFunc1 = makeClosure(1);
var closureFunc1 = makeClosure(2);
var closureFunc1 = makeClosure(3);

closureFunc1(); // 1
closureFunc2(); // 2
closureFunc3(); // 3
```

다음과 같이 생성된 클로저 함수는 모두 다른환경을 갖게 된다. 

> 각 환경에 따른 스코프체인에 대한 비용도 있을것이다.

따라서 클로저를 형성할 때 참조하는 변수들을 기억하는 이 환경값에 대해 당연히 메모리가 소모될 것이다.

결국에는 이 환경들을 기억하기위한 메모리 소모로 클로저로 형성된 데이터의 양에따라 메모리 소비가 크게 될 것이다.

문제는, **이렇게 형성된 클로저 함수들에 참조를 제거하지 않으면 환경을 기억하기 위해 소모된 메모리들이 해제되지 않는다는 점**이다.

이는 **[앞선 설명](https://ha-young.github.io/2020/javascript/%ED%95%98%EC%98%B9%EC%9D%98-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8B%9D%EC%82%AC---Closure/#%ED%81%B4%EB%A1%9C%EC%A0%80%EB%A5%BC-%EC%9E%90%EC%84%B8%ED%9E%88-%EC%9D%B4%ED%95%B4%ED%95%98%EB%8A%94%EB%8D%B0-%EA%B0%80%EB%B9%84%EC%A7%80-%EC%BD%9C%EB%A0%89%ED%84%B0%EB%A5%BC-%EC%95%8C%EC%95%84%EC%95%BC-%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0)**에서 확인한 바 있다.

그리고 이것은 `C`,  `C++`에서  `malloc`,  `new` 로 메모리 동적할당을 해놓고 `free`, `delete`하지 않는 것과 비슷하다.

그래서 클로저 사용이 끝나면 해당 클로저함수에 대한 참조를 해제하는 것이 맞다.

```js
function makeClosure (prop) {
    var closureVal = prop;
    return function () {
        console.log(closureVal);
    }
}

var closureFunc1 = makeClosure(1);
var closureFunc1 = makeClosure(2);

closureFunc1(); // 1
closureFunc2(); // 2

// GC로 메모리 해제 유도
closureFunc1 = null;
closureFunc2 = null;
```





### 구 브라우저(IE)의 GC 참조카운터방식으로 야기되는 문제 (중요 X)

이는 구 브라우저 (IE)에서 굳이 클로저 때문이 아니라도 Garbage Collection의 방식이 참조카운팅(Reference Counting)이기 때문에 발생하는 문제이다.

참조카운팅 방식의 문제점은 순환참조가 되었을 경우에 GC가 제대로 작동하지 않는다는 문제가 있다.

그런데, 이 순환참조를 클로저가 쉽게 발생시킬 수 있다.
다음 예시를 한번 보자.

```js
function addHandler(){
    var el = document.getElementById('el');
    el.onclick = function onClickHandler(){
        this.style.backgroundColor = 'red';
    }
}
```

이렇게 코드가 짜여지면,  `onClickHandler()` 함수와 `el` 간의 순환참조가 발생하게 된다.

> el은 onclick 속성으로 통해 onClickHandler 함수 참조,
> onClickHandler는 클로저를 통해 외부 스코프에 존재하는 el 참조

```js
function addHandler(){
    var el = document.getElementById('el');
    el.onclick = function onClickHandler(){
        this.style.backgroundColor = 'red';
    }
    el = null;
}
```

다음과 같이 `el = null`을 삽입하여 해결할 수 있다.



## 참고한 사이트

위에서 표기한 [MDN](https://developer.mozilla.org/ko/), [VanillaCoding](https://www.vanillacoding.co/), [Poiemaweb](https://poiemaweb.com/js-closure)을 포함하여 아래 사이트들을 참조하였다.

[MDN - Closure](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures)

[자바스크립트 스코프와 클로저 정리](https://wooder2050.medium.com/%EC%9D%B4%EB%A1%A0-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8A%A4%EC%BD%94%ED%94%84%EC%99%80-%ED%81%B4%EB%A1%9C%EC%A0%80-%EC%A0%95%EB%A6%AC-331da8d8b00b)

[A Simple Explanation of JavaScript Closures](https://dmitripavlutin.com/simple-explanation-of-javascript-closures/)

[Dailly Programming - Closure](https://hyunseob.github.io/2016/08/30/javascript-closure/)

[MDN - 메모리관리](https://developer.mozilla.org/ko/docs/Web/JavaScript/Memory_Management)

[자바스크립트에서-메모리-누수의-4가지-형태](https://itstory.tk/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%97%90%EC%84%9C-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EB%88%84%EC%88%98%EC%9D%98-4%EA%B0%80%EC%A7%80-%ED%98%95%ED%83%9C)