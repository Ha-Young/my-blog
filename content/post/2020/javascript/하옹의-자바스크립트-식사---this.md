---
title: '하옹의 자바스크립트 식사 - this'
draft: false
date: '2021-01-13'
category: 'javascript'
tags: ['javascript', 'this', 'binding']
---

## this?

모든 프로그래밍 언어를 통틀어서 코드를 보다보면 각 언어마다  `this` 키워드는 빼놓지 않고 나오는 것 같다.

그리고 거의 모든 언어에서 `this`의 의미는 모두 **객체 인스턴스**의 의미를 가지고 있다.

근데, 대부분의 언어가 `this`의 의미와 사용처가 제한적인것에 반해 Javascript에서는 이 `this`는 조금 다르게 동작한다. 
javascript의 `this`는 아무곳에서나 쓸 수 있고 의미도 다양하게 쓰일 수 있다.

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



이처럼 javascript의 `this`는 함수를 호출할 때 마다 어떻게 호출되었느냐에따라 값이 다 다르게 나타난다.

이와 같은 변화무쌍한 점에서 사람들이 javascript의 `this`를 어렵게 생각하게 될 수 있다.



### 알고보면 쉬운 this?

#### 🎇함수가 실행되는 시점을 보면 알 수 있다.

사실 javascript에서의 `this`가 쓰일 수 있는 곳과 어떤 의미를 가지는지는 굉장히 명확하게 정해져있다.

`this`가 무엇을 나타내고있는지 판단하려면 먼저 `this` 를 쓰는 **함수가 실행되는 시점**을 보면 판단할 수 있다.

그리고 이 함수가 사용될 수 있는 시점은 4가지가 있다.

이 말은 `this`가 나타낼 수 있는 경우의 수도 4가지(대표적)라는 말.

- Regular Function Call
- Dot Notation (Object Method Call)
- Call, Apply, Bind
- `new` keyword



## this 판별 방법

바로 위에서 간략하게 설명했듯이 `this` 판별은 생각보다 엄청 쉽다.
자 그럼 이제 어떻게 this를 판별해 나가는지 알아보자.

### 1. this가 사용되는 함수의 실행되는 시점을 찾아본다.

코드를 보다가 `this` 값에 어떤값이 들어가는 줄 모르겠다면 이 함수가 어떻게 호출되고있는지를 확인해보면 된다.

함수 내부에 `this`가 사용되고 있다면 비록 선언부에서 볼때는 같은 함수이지만, 이 함수가 어떻게 실행되었느냐에 따라 완전히 다른함수로 바꿔버릴 수 있다.

따라서 함수 내부에 `this`가 있고, 이 `this`가 정확하게 무엇을 의미하는지 파악하려면 이 함수가 실행되는 시점들을 찾아가서 하나하나 보면서 파악해야 한다.

> 사실 개발자들이 코딩할 때 함수에서 this를 한정해놓지, 함수를 실행할 때 마다 각각 다르게 동작하게 만들지는 않을 것이다. 

함수가 실행되는 시점이란

```js{13-14}
function cry () {
    console.log(this.sound);
}

const cat = {
    sound: 'meow'
}

var sound = 'global-sound'

cat.speak = cry;

cat.speak(); // meow
cry(); // global-sound
```

다음과 같이 첫 라인의 선언부가 아니라 마지막에 표시되어있는 `cat.sound()`와 `cry()` 처럼 ()로 함수를 excution 시킨 부분이다.

`cat.sound()`는 위에서 `cat.speak = cry`로 이미 선언된 `cry`함수의 참조값을 받은 것이므로 `cat.speak()` 함수와 `cry()`함수는 같다.

```js
console.log(cat.speak === cry); // true
```



### 2. 함수가 어떻게 실행되고있는지 파악한다

함수가 실행되고있는 부분을 찾았다면, 이제 어떻게 실행되고있는지를 파악하면 된다.

함수가 실행될 수 있는 경우의 수는 4가지로써 이 4가지 경우의수에 맞게 this도 각각 다르게 작동하게 된다.

#### 1. Regular Function Call

일반적으로 사용되는 함수 호출방법으로 우리가 흔히 `context`에서 함수를 선언하고 사용하는 가장 일반적인 방법이다.

> **Regular Function Call**이라는 표현은 딱히 없지만 일반함수호출을 의미하는 표현으로 [ken](https://www.linkedin.com/in/kenhuh/?originalSubdomain=kr) 님이 하시는 표현이다.

```js{5}
function hello() {
    console.log('hello hayoung');
}

hello();
```

이렇게 사용되는 함수 내부에서의 `this`값은 **Global Object**가 된다.

> 브라우저 환경에서는 Global Object가 Window 객체이다.



``` js{4,6}
var name = 'haong'; // var 키워드로 선언된 변수는 자동으로 Global Object의 속성으로 포함된다.

function hello() {
    console.log(`hello ${this.name}!`); // 함수 내부에서 this 키워드 사용
}

hello(); // hello haong!
```

이 처럼 일반 함수로 쓰일 때 에는 내부의 `this`가 **Global Object**를 의미한다는 것을 알 수 있다.



만약, 아래와 같이 쓰인다면 어떻게 될까?

```js
var name = 'global-haong';

const hayoung = {
    name: 'hayoung',
    hello: function () {
        console.log(`hello ${this.name}`)
	}
}

const outerHello = hayoung.hello; // hayoung.hello 메서드의 참조값을 outerHello에 할당

outerHello(); // ?
```

답은 `hello global-haong` 이 출력된다.

이유는 객체 `hayoung`에 들어있는 메서드이지만, 일반 변수로 담겨서 사용될 때는 Regular Function Call이기 때문.



#### 2. Dot Notation (Object Method Call)

#### 3. Call, Apply, Bind

#### 4. `new` keyword



## Event Listener에서의 this



## 화살표 함수에서의 this



## strict mode



## 