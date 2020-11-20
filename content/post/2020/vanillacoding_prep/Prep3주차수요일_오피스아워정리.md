---
title: "Prep 3주차 수요일 오피스아워 정리"
draft: false
date: "2020-10-21 21:13"
path: "/vanillacoding/prep/week3_op2"
category: "vanilla coding"
---

## Primitive Vs Reference

#### Primitive

Object를 제외한 나머지

- String
- Number
- Boolean
- Undefined
- Null
- Symbol

#### Reference

Object 타입

- Object (객체)
- Array
- Function



## 퀴즈

풀어봅시당

#### 문제1.

```js
let galaxy = {
  brand: "samsung",
  product: "S20"
};

let iphone = {
  brand: "apple",
  product: "12pro"
};

const smartphone = [galaxy, iphone];

galaxy = {
  brand: "samsung",
  product: "fold"
}

console.log(galaxy); 
console.log(galaxy === smartphone[0])
```

이 문제는 Reference를 이해해야됨!



#### 문제2.

```js
var vanillacoding = {
  ceo: "ken"
};

function destroy (something) {
  something = null;
}

destroy(vanillacoding);

console.log(vanillacoding);
```

이 문제는 함수 매개변수에 대해 이해해야됨!

> 함수 매개변수는 함수 스코프가 적용된다.



## var vs let vs const

- scope의 차이 (var - 함수 스코프 / let, const - 블록 스코프)
- 재선언 유무 (var는 가능 / let, const - 불가능 (블록스코프내부에서) )



- var : 함수 스코프 변수 선언
- let : 블록 스코프 변수 선언
- const : 블록 스코프의 재할당이 불가능한 변수 선언(constant)



## let, const 재선언오류?

```js
let vanilla = "coding";
let vanilla = "icecream"; 
```

우리가 let, const는 재선언이 안된다고 배웠는데, 위 처럼 하면 재선언이 된다. 이는 **블록 외부라서 되는 것**.
아래와 같이 하면 애러 발생

```js
{
  let vanilla = "coding";
  let vanilla = "icecream"; // error
}
```

다음과 같이 **블록 내부에서 재선언이 안되는 것!**



## TDZ!

TDZ(Temporal Dead Zone) 중요!

변수가 할당 되기전에는 사용할 수 없는 구간.

> 호이스팅으로 선언은 일어났으나 사용할 수 없는 죽은 구간이라고 생각하면 된다. -> ReferenceError



## 공식문서의 한글?

공식문서(MDZ과 같은)를 읽을때 한글로 되어있는 것들은 우리와 같은 사람들이 번역해서 올려둔 것. 그래서 잘못 번역된 것이 있을수도 있다.

반드시! 반드시! 영어문서로 읽어야 한다.

> 영어문서로 읽는 사람들의 성장이 그렇지 않은 사람들보다 훨씬 빠르다.



**생각보다 엄청 중요하다고 한다.**



## You don't know JS

책인데 꼭 읽어보자

호이스팅과같은 기술적인 것들에 대해 세부내용을 알 수 있다.

지금은 아니라도 나중에 꼭 읽어보자.

> 켄님의 적극 권장



## var, let, const 일반적인 컨벤션?

1. 일단 const로 변수 선언
2. 개발하다가 재할당 할 일이 생기면 let으로 바꾼다.
3. var는 기억너머 추억속으로 지워버리자.

그렇다고 이러한 방법이 정답은 아니다. 일반적인 방법이라는 것.

다르게 한다고 해서 틀리다고 생각하지는 말자!

> 이번 과제에서 이렇게 적용시켜보자!



## Q.DOM 변수 네이밍

```js
const clickButtonElement = document.querySelector(".click-button")
// Element를 뒤에 붙이기
const $clickButton = document.querySelector(".click-button")
// $를 앞에 붙이기
```

둘 다 상관없다.

> 어떠한 방식으로든 DOM 요소라는 걸 표기해야된다.



## Q.인덴팅 어떻게?

거의 대부분의 사람들은 인덴팅 할 때 `space`로 한다.

**`space`로 쓰자!**

- space 2번 or 4번

tab은 git을 쓸 때 문제가 생길수도 있다.

> 만약 기존에 개발되어있는 코드라면 해당 코드의 컨벤션을 따르면 된다.



**그리고 space를 쓰면 연봉이 오른다....**



## ETC

- 이제 오피스아워 첫 시작에 자기소개시간?
  - 이전시간에 소개자가 지목!
- 이번주 과제 저번주보다 쪼끔 어려울수도 있는데, 그래도 괜찮을거다.