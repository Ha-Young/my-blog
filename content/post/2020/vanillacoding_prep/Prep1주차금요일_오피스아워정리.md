---
title: "Prep 1주차 금요일 오피스아워 정리"
draft: false
date: "2020-10-09 21:05:00"
path: "/vanillacoding/prep/week1_op3"
category: "vanilla coding"
---

## PrevQ. {} || something

지난시간 {} || something, {} && something 이 안되었던 이유는 

자바스크립트 엔진에서 {}를 구문블록 (block statement)로 해석 한 것!

우리가 if, for 문을 쓸 때 {}를 쓰듯이 {}는 block statement라고 하는데,

```js
{} || 123 // Error
{} && "123" // Error
```

{} 을 block statement로 해석한 것.

```js
var value1 = {} || 123
({}) || 123
```

요렇게 변수에 대입할 때 써주거나 ()로 묶어주면 된다.

실제로는 이렇게 잘 사용하지 않기 때문에 위와 같은 오류는 잘 볼 일이 없다.



사실 위 처럼 변수에 할당하지않고 바로

```js
{} || 123
```

으로 하지는 않기 때문에 흔하지 않은 애러.

자바스크립트 엔진에서 **{}를 객체 리터럴로 받아들이기보다 Block Statement로 인식 할 수 있다는걸** 알아두면 될 것 같다.



#### 근데 이런경우가 있다?

크롬 콘솔에서 

```js
{} || {} // Pass - 세미콜론(;) 없이 수행
{} || {}; // Error - 세미콜론(;) 있음
```

로 하면 애러가 안난다 

하지만 **다른 브라우저**에서는 되는데 브라우저마다 동작하는 방식? 이 조금 다를 수 있다는 점을 알아두면 될 듯.

세밀하게 살펴보지 않으면 절대로 알 수 없는 내용인데 찾으신분은 진짜 대단하신 것 같다.



## 이번 과제 리뷰

#### typeof

typeof 키워드 기억.

- typeof "123" -> "string"
- typeof 123 -> "number"

와 같이 작동하고 type값을 string으로 알려준다.

##### 다음은 어떻게 작동할까?

```js
typeof undefined === undefined // false
// typeof undefined는 "undefined"이기 때문
```

```js
var arr = [1, 2, 3];
typeof arr
arr // "object"

// 그럼 여기서 어떻게 arr이 배열인걸 판별할 수 있을까?
if (Array.isArray(arr)) {
  // ToDo
}
// Array.isArray(something) 로 판별
```

> arr.isArray() 가 아닌걸 염두하자!



### AboutArrays에서 나온 부분

```js
var message = "함수 외부";

function getMessage() {
  return message;
}

function overrideMessage() {
  var message = "함수 내부";
  return message;
}

var result1 = getMessage();
var result2 = overrideMessage();

// 아래는 어떻게 될까?
console.log(result1); //함수 외부
console.log(result2); //함수 내부

console.log(message);
```

**Q. result1 왜 "함수 외부"?**

1. result1는 getMessage() 함수 결과를 받는데,
2. getMessage() 함수 안에 return문에 message를 받아서 쓴다.
3. 하지만, message라는 변수는 getMessage 함수안에 없기 때문에 **제일 가까운 거리**의 message라는 변수를 찾아다니게 되고,
4. 그 전에 선언했던 message = "함수 외부"; 를 가져오게 되는 것.

**Q. result2 왜 "함수 내부"?**

1. result2는 overrideMessage() 함수 결과를 받는데,
2. result2 내부의 message가 가장 가까우므로 이거 리턴.

**Q. 맨 마지막 console.log(message) 결과는?**

결과는 "함수 외부"

overrideMessage() 함수 내부의 결과는 overrideMessage() 함수 내부에만 영향을 미치기때문에 반영 X



**이 부분은 다음주의 Scope와 연관된 부분이니 다음주에 더 자세히 알 수 있다.**



>  **자바스크립트 Definition(정의)에는 거리가 중요하다고 하는 부분이 있는데, Scope와 관련된 개념이니 다음주 Scope 잘 배우자**



js에는 예약어(키워드)가 있는데,
이는 변수명으로 쓸 수 없다.

> function , var, let, const, for, if, return 등등...



## Q. indexOf(숫자 or 문자열?)

과제 AboutString.js에서

> orderMessage.indexOf(3)이 왜 되는지? orderMessage.indexOf("3")이 되어야 되는게 아닌지?

원래 indexOf()에는 문자열이 들어가야되는게 맞지만,
자동으로 string으로 변환? 되었다고 보면 된다.

함수에는 요런 예외적인 부분이 있을 수 있다는 점!



## Q. var VS let

>  var 보다는 let을 사용하는게 좋지 않을까?

맞다. 하지만 Prep에서는 var 쓰는 편

자바스크립트 변수 선언은

```js
var var1 = 1;
let var2 = 2;
const var3 = 3;
```

3가지가 있는데, 이 차이의 개념을 알려면 Scope, Hoisting과 같은 자바스크립트 핵심개념을 알아아 됨.

**나중에 배울 수 있다. 궁금하면 구글 검색.**



## Q. mdn에서 indexOf(searchElement[, fromIndex) ? 

[ 대괄호로 표기된 부분은 **Optional** 

대괄호 뒷부분은 없어도 되는 부분이라

```js
arr.indexOf(searchElement);
arr.indexOf(searchElement, fromIndex);
```

둘 다 가능하다는 표현.



## Q. toMatch()에서 정규표현식?

#### 정규표현식

**정규표현식이 무엇인지는 알 필요가 있지만 어떻게 쓰는지는 지금은 공부 할 필요가 없다.**

현업에서 종종 쓰일일이 있지만, 그때그때 필요할 때 공부하면 된다.

#### toMatch()

Mocha?라는 라이브러리에 내장된 함수.

Mocha?라이브러리를 쓸일이 아니면 쓰일일이 없으니 신경안써도 됨.



## Q. 객체.속성키() ?

```js
var welcomeMessage = function (name) {
  return name + "안녕!"
}

var person = { say: welcomeMessage };

person.say("something");

// 객체의 속성으로 함수를 넣을 수 있기 때문에,
// 해당 키값으로 함수를 불러오고 사용 할 수 있다.
// 여기선 key가 say, value가 welcomeMessage함수.
// person의 say라는 속성으로 함수 사용.

// person.say("something")
// welcomeMessage("something")
// person.say와 welcomeMessage는 같다.
// person.say가 가리키고 있는것이 welcomeMessage이기 때문에.
```



## Q. VS 확장프로그램 Prettier?

써도 상관없다. BootCamp에서는 사용 못함.



Prettier는 opinionated code formatter.

prettier만의 코드스타일로 만들어 준다.



**어떻게 코드스타일링을 하는지 참조하면 좋다.**



하지만, opnionated하기 때문에,
prettier의 코드스타일을 원치 않하지 않는데 적용되거나,
회사 내부의 코드스타일을 망칠 수 있기 때문에 **이런 상황에서는 사용하면 안된다.**



다른 사람의 코드스타일을 이해하고 맞춰서 쓸 수 있으려면 어떤 한 코드스타일을 습득하거나 정립한 후부터 가능.

코드스타일은 정답이 없기 때문에 **회사에 맞추면 된다.**



## ETC

> - 금요일 깜짝 선물은 여수 바다. 실망...
> - 커피 수여식 여러분 감사합니다..!
> - 켄님은 돈까스 많이 좋아하신다.
> - 나이키는 재수없어서 싫어하신다.
> - 이번주말에 코드리뷰 진행된다.

