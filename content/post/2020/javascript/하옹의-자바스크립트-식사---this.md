---
title: '하옹의 자바스크립트 식사 - this'
draft: false
date: '2021-01-13'
category: 'javascript'
tags: ['javascript', 'this', '바인딩']
---

## this?

모든 프로그래밍 언어를 통틀어서 코드를 보다보면 각 언어마다  `this` 키워드는 빼놓지 않고 나오는 것 같다.

그리고 모두 `this`의 의미는 모두 **생성된 객체 인스턴스**의 의미를 가지고 있다.

근데, 대부분의 언어가 `this`의 사용처가 제한적인것에 반해 Javascript에서는 이 `this`는 아무곳에서나 쓸 수 있고 의미도 다양하게 쓰일 수 있다.

아래 코드를 보자.

```js
function helloThis () {
    console.log('hello', this); // 
}

helloThis(); // Window 객체가 출력된다.
```

이와같이 객체 인스턴스와 아무 상관없는 함수에서도 `this`를 사용할 수 있으며

> 다른 대부분의 언어는 this를 쓸 수 있는 상황이 제한적이다.



```js
const thisObj = {
    useThis: true
}; // thisObj 객체 생성

thisObj.helloThis = helloThis; // 앞서 만든 helloThis함수를 속성으로 할당

thisObj.helloThis(); // thisObj 객체가 출력 { useThis: true, helloThis: f}
```

위 예제는 아까 만든 `helloThis`를 분명 재활용했음에도 불구하고 `thisObj`객체가 출력된다.

모두 똑같은 함수인 `helloThis`를 사용했는데, 위 코드는 `window`(전역)객체, 아래코드는 `thisObj`객체로 결과가 각각 다르게 나온다. 

```js
const cat = {
    sound: 'meow',
    speak: function () {
        console.log(this.sound);
    }
}

const func = cat.speak; // speak함수를 func에 할당

cat.speak(); // meow
func(); // undefined
```

여기에서도 분명 똑같은 `speak()` 함수를 사용했음에도 결과는 다르다.

이와 같은 변화무쌍한 점이 사람들이 javascript의 `this`를 어렵게 생각하는 원인.



### 알고보면 쉬운 this?

사실 javascript에서의 `this`가 쓰일 수 있는 곳과 어떤 의미를 가지는지는 굉장히 명확하게 정해져있다.

`this`가 무엇을 나타내고있는지 판단하려면 먼저 `this` 를 쓰는 **함수가 사용되는 시점**을 보면 판단할 수 있다.

그리고 이 함수가 사용될 수 있는 시점은 4가지가 있다.

이 말은 `this`가 나타낼 수 있는 경우의 수도 4가지라는 말.

- Regular Function Call
- Dot Notation (Object Method Call)
- Call, Apply, Bind
- `new` keyword



## this의 경우의 수

### 1. Regular Function Call

### 2. Dot Notation (Object Method Call)

### 3. Call, Apply, Bind

### 4. `new` keyword