---
title: "Prep 2주차 수요일 오피스아워 정리"
draft: false
date: "2020-10-14 21:00"
path: "/vanillacoding/prep/week3_op1"
category: "vanilla coding"
---

## 과제

먼저 살펴 볼 함수는

calculatorWinner() -> 승자 판별하는 함수. 어떻게 승자판별하는지 잘 파악해보자.

배열 어떻게 넘겨주고 하는건 그 다음.

그리고 승자판별을 언제해야되느냐? 이 타이밍은 잘 생각해보자.



## Q. 과제에서 css :before, :after 선택자 어떤역할?

css에는 box-sizing이라는 속성이 있는데,

블록 요소는 안에서부터 padding, border, margin의 순서대로 존재.

근데, box-sizing 속성에 따라 이러한 값들에 대한 값이 달라질 수 있다.

과제에서 box-sizing: inherit; 속성은 각 브라우저마다 다르게 작동할 수 있는 box-sizing속성을 일관되게 맞춰준다고 보면 됨.



#### Reset-css

브라우저 별로 내장되어있는 css 설정값(h1의 크기차이 등)은 다를 수 있기다.
각 브라우저별로 다른 설정값들을 맞춰주기에는 힘드므로 모든 브라우저 기본 css 설정값을 없애서 처음부터 일관되게 개발하기 위해 쓴다.





## Q. calculateWinner 함수부분

```js
if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
```

**Q. 앞의 squares[a] && squares[a] 는 항상 같은 것 아닌가?**

이 부분에서는 3파트가 있는데,

일단 여기서 비교연산자 `===` 우선순위가 `&&`연산자보다 크다

그래서 먼서 `===`연산자가 수행되고 난 후에 `&&` 연산자가 작동되는데 이는 우리가 저번주차 Operator Truthy Falsy에서 봤던 논리연산자. 

`&&`연산자는 Falsy를 찾는 연산자라고 보면 되는데,

```js
if (squares[a] && ~~ )
```

와 같이 되면서, squares[a]가 Falsy인지 아닌지 유무를 판단하는 것. 더 자세히 말하면 **squares[a]가 존재하는지 존재하지 않는지를 판별하는 것**



좀 더 디테일한 예를 살펴보면,

```js
var arr = [
  {
    title: "vanilla coding"
  }
];

if (arr[0].title) {
  // ToDo..
}
```

 다음과 같은 상황에서는 문제 될 것이 없다.

하지만

```js
var arr = [
  /* 
  {
    title: "vanilla coding"
  }
  */
];

if (arr[0].title) {
  // ToDo..
}
```

다음과 같은 상황에서는 arr[0]이 존재하지 않아서 문제가 발생할 수 있다.



arr[0]이 존재하지 않기때문에 undefined가 되고,

**undefined.title이 되면서 애러**가 난다.

> undefined는 객체가 아니기 때문에 dot notation을 사용할 수 없다.



그래서 이럴때, 간단하게 예외처리를 하면서 이러한 애러를 막을 수 있는데,

```js
var arr = [];

if (arr[0] && arr[0].title) {
  // ToDo
}
```

다음과 같이 배열에 인덱싱을하고 속성을 참조하는 구문 앞에 arr[0] && 을 넣어서 arr[0]의 값이 falsy인지 확인 한 후에 진행하도록 하는 것.

> arr[0]이 falsy면 false값으로 if문을 벗어난다. 



## Q. 스크립트에서 console.log와 브라우저 개발자도구에서 console.log

Q. 스크립트에서 console.log와 브라우저 개발자도구에서의 console.log로 똑같은 변수를 찍으면 없다고 함.

이 문제는 우리가 parcel 모듈을 써서 그럼.

parcel로 빌드하면 스크립트에서 작성된 변수명이나 이런것들이 변환되어서(보호?) 빌드되기 때문에 개발자 도구에서 콘솔이 찍히지 않는다.



**따라서 Console.log대신 개발자 도구로 디버깅해보자**



## getElementByClassName 유의사항

만약, getElementByClassName으로 Element를 가져올 경우, **유사배열의 형태**로 값을 가져온다.

> HTMLCollection

그래서 주의해야되고, 배열처럼 다뤄줘야 된다.

> 배열과 같이 [] indexing을 해줘야 함.



왜 유사배열로 가져오나면
ClassName은 같은 ClassName을 가지고 있는 Element가 여러개 있을 수 있기 때문에 여러개를 가져 오도록 해야 되기 때문.

반대로 id는 page에 하나만 있어야 되므로
`getElementById()`로 가져오는 값은 반드시 하나인 것.



쉽게 이해할려면, nodeList, htmlElementList등과 비슷하다고 생각하면 된다.



## event 객체

```js
element.addEventListener("click", function (event) {
  // ToDo
})
```

위 함수에 인자로 전달받는 event객체는 event에 대한 정보를 담고있는 객체!



## event 객체에서 target 과 currentTarget 차이?

event 객체에서,
target은 event가 실제로 일어나는 element라고 보면되고,

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

다음과 같이 outer에 이벤트를 추가하면,
자식인 inner에도 해당 이벤트가 발생이 된다.

근데, inner에서 이벤트가 발생할때 

target과 currentTarget이 달라질 수 있다.

> target : inner
> currentTarget : outer

바로 event를 추가한 element 내부에 존재하는 element가 있을 때, 이 element에서 event가 발생되었을 때, 



## 다음 결과는?

```js
var a = 3;

function foo() {
  var a = 2;
  console.log(a); // 2 출력 동일 함수 scope에 a변수 존재
}

foo();
console.log(a); // 3 출력 
```



여기서 Scope는

##### Global Scope

- a = 3
- function foo

##### foo 함수 Scope

- a = 2



## 다음 결과는?

```js
var a = 3;

function foo() {
  console.log(a); // undefined
  var a = 2;
}

foo();
```

다음과 같은 상황에서는 

foo함수내부에서 
console.log(a)가 실행 되기 이전에
a가 선언이 먼저 되고 (값만 할당되지 않은 상태)로 Hoisting이 일어나기 때문.

Hoisting으로 a변수가 존재하긴 하나 값은 할당되지 않은 상태에서 console.log(a)가 실행 된 것.

그래서 javascript 내부적으로는 다음과 같이 작동한다고 보면 된다.

```js
var a = 3;

function foo() {
  var a; // undefined
  console.log(a);
  a = 2;
}

foo();
```

실제로 이렇게 바뀌는건 아니고, 내부적으로 작동한다고 알아두자.



## 다음 결과는?

```js
var a = 5;

for (var i = 0; i < a; i++) {
  console.log(a);
}

console.log(i); // 5
```

i가 5까지 간다음 for 조건문을 탈출하기 때문.



## 다음 결과는?

```js
var a = 1;

function bar() {
  function foo() {
    console.log(a); // 2출력
  }
  
  a = 2;
  
  foo();
}

bar();
```

실행 순서를 파악하면 답은 쉽다.

foo함수가 실행되기 직전에 이미 a = 2로 바꾸어 놓았기 때문.



## 예제 콘솔에 복붙 했는데 undefined?

console.log() 찍은 것 말고도 콘솔에 undefined가 나오는데 이는 복붙한 소스코드의 리턴값.

함수 선언의 결과값은 undefined.



## 같은 Scope에서 변수 계속 선언?

```js
function prep() {
  var value = 1;
  
  // ToDo
  
  var value = 2; // 이렇게 하지말자.
  // 같은 Scope에서는 재선언 하지말고 이미 만들어진 변수를 활용하면 됨.
  value = 3;
  
  function inner() {
    var value = 5; // 다른 Scope에서는 해도 상관 X.
  }
}
```



## 호이스팅 예제

```js
// var a;  <- Hoisting
function bar() {
  console.log(a); // undefined
}
bar();

var a = 1;
```



## 전역변수 = 객체객체 속성. 그럼 delete?

```js
delete window.something // false
```

전역 객체에서의 속성 삭제는 안된다.