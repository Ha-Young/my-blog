---
title: "Prep 6주차 수요일 오피스아워 정리"
draft: false
date: "2020-11-11 21:20"
path: "/vanillacoding/prep/week6_op2"
category: "vanilla coding"
---

## Q. this Quiz

```js
var something = {
    age: 10,
    speak: function () {
        console.log(this.age);
    }
};

var butler = {
    age: 20,
    serve: function (cb) {
        cb();
    }
};

butler.serve(something.speak);
```

함수의 실행시점을 잘 보자.

함수의 실행시점은 11라인 `cb()`

dot notation을 통해서 넘겨지더라도 실행시점에서 dot notation이 없으면 일반함수 실행과 같다.



또한 `butler.serve()` 의 인자로`something.speak`  과 같이 dot notation을 통해서 넘기더라도 `something.speak` 는 그냥 해당 `speak` key값의 value 인 

```js
function () {
    console.log(this.age);
}
```

함수의 레퍼런스 값만 가져오기 때문에 speak객체와는 상관이 없어진다.

그래서 11라인의 `cb()` 에서 일반함수처럼 실행.



### something.speak()를 인자로 준다면?

이 경우에는 `something.speak()` 로 함수를 실행시켰으므로 해당 함수의 `return` 값, 즉 반환값이 인자로 들어가게 될 것이다.

`something.speak()` 함수는 리턴값이 없으므로 `undefined`가 리턴되어 인자값으로 전달 된다.



### 어떤 함수의 reference를 가지고 있다면, 무조건 일반함수실행인지?

아니다 다음과 같은 경우가 있다.

```js
var something = {
    age: 10,
    speak: function foo () {
        console.log(this.age);
    }
}

var something2 = {
    age: 20,
    speak: something.speak // something 객체의 speak 메서드 레퍼런스값
}

something2.speak(); // 20
```

다음과 같은 경우에는 함수 실행 위치는 `something2.speak` 이므로 함수내부에서  something2 객체가 this가 된다. 

`something.speak`함수의 레퍼런스값으로 참조하지만, 호출은 `something2`객체에서 했으므로.



## 생성자 함수

- new 키워드를 사용한다

- **대문자 표기**로 구분을 쉽게 한다

- **인스턴스 생성** (빈 객체)

- 함수 내부에서 **this가 빈 객체로 만들어진 인스턴스**로 작용

- 객체 return 문이 없다면 **this 인스턴스 자동 반환**

  

### 우리가 알고있는 생성자 함수

- new Array();
- new Object();
- new Number();
- 등등...



## 프로토타입

`prototype`을 잘 알게되면 ES2015에서 나오는 `class`를 쉽게 알 수 있다.



### Quiz.

풀어봅시다

```js
function Smartphone (name, provider, price) {
    this.name = name;
    this.provider = provider;
    this.price = price
}

var gx20 = new Smartphone("gallaxyS20", "samsung", 1000000);

gx20.start(); // ?

Smartphone.prototype.start = function () {
    console.log(`${this.provider} ${this.name} is starting...`);
};
```



```js
function Smartphone (name, provider, price) {
    this.name = name;
    this.provider = provider;
    this.price = price
}

var gx20 = new Smartphone("gallaxyS20", "samsung", 1000000);

Function.prototype.start = function () {
    console.log(`${this.provider} ${this.name} is starting...`);
};

gx20.start(); // ?
```



```js
function Smartphone (name, provider, price) {
    this.name = name;
    this.provider = provider;
    this.price = price
}

var gx20 = new Smartphone("gallaxyS20", "samsung", 1000000);

console.log(Smartphone.prototype === gx20.__proto__); // ?
```

`__proto__ (dunder proto)` 가 무엇인지만 알고, **사용은 하지 말자.**

> `__proto__`는 모질라에서 베타버전? 실험적인 기능으로 내보냈는데, 실험용으로 내보냈지만, javascript 개발자들이 사용해버려서 없애지 못하고 있다.
>
> standard한 기능이 아니다.



## 상속

이해가 지금 잘 안될 수 있다.

**바로 이해 안해도 되니, 시간을 두고 이해하자.** (5개월?)

주기적으로 계속해서 본다면 자동적으로 습득하게 될 것.



### 상속 시키는 방법

1. 자식 객체 생성자 함수에서 부모 객체 생성자함수를 호출하는데, 호출할 때 this를 바인딩 시켜서 호출해야 한다. 

```js
function Parent() {
    // ToDo
}

Parent.prototype.parent_method = function () {
    console.log("parent's prototype method");
}

function Child() {
    // 상속
    Parent.call(this); //1번.
    this.isChild = true;
}
```

2. 자식 객체에 부모 프로토타입 연결 (프로토타입 체인 형성)

```js
Child.prototype = Object.create(Parent.prototype);
```

`Object.create()` 는 빈 객체를 반환하지만, 인자값으로 받은 객체가 있다면 인자값으로 받은 객체를 prototype으로 갖는 빈 객체를 반환한다. (인자로 받은 객체를 `__proto__` 로 가르키는 빈 객체 리턴) 



3. 자식객체에 빈 객체로 만들어진 prototype에 `constructor` 를 자식객체를 가르키도록 해야 한다.

   > 빈 객체이기 때문에 prototype객체가 기본적으로 가지는 constructor 속성이 없음. 그래서 부모객체 prototype의 constructor를 참조하게 된다. 이를 자식객체로 바꿔줘야됨.

```js
Child.prototype.constructor = Child;
```



**그리고 반드시 2번 이후에 자식 객체 protype에 할당을 진행해야 된다.** 새로 생성된 prototype객체에서 할당을 해야 되기 때문.

아니면 다시 새로 생성되기 때문에 이전에 할당한 prperty나 method는 사라진다.



#### 전체 코드

```js
function Parent() {
    this.isParent = true;
}

Parent.prototype.parent_method = function () {
    console.log("parent's prototype method");
}

function Child() {
    // 상속
    Parent.call(this); //1번.
    this.isChild = true;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

// 이후에 Child prototype 할당작업
Child.prototype.method2 = function () {
    console.log("child's prototype method");
}

var child = new Child();

child.method1(); // parent's prototype method
child.method2(); // child's prototype method
```



### Q. 3번 처럼 constructor 할당 안해주면 undefined?

`Child.prototype.constructor === undefined` ?

아니다. 2번에서 자식 객체의 prototype으로 부모 객체의 prototype이 설정되었으므로 prototype 체인을 통해서  부모객체의 prototype에 있는 constructor를 가져오게 된다.

그래서 **결과는**
**부모객체 prototype의 constructor**



### Q. 생성자 함수에서 2, 3번?

이렇게 하면 제대로 작동 X.

상속이 제대로 이루어지지 않는다.

그리고 이와 같은 방법으로 할 경우, 생성자함수로 해당 객체 인스턴스를 만들 때 마다 새로 prototype 을 새로 만들어서 prototype 체인을 형성하는 것이므로 올바르지 않다.



### MDN에서 자주보이던 Array.prototype.~

이제 이해 할 수 있어야 한다.

Array 객체 prototype에 존재하는 메서드들.

Array 생성자함수를 통해 만들어진 Array들에 해당 메서드들을 사용할 수 있는 것.

> 그렇다면 `[]` 배열 리터럴이 내부적으로 Array 생성자함수를 사용한다는 걸 알 수 있다.

## Q. 간혹 브라우저 console에서 코딩시에 브라우저별로 다르게 작동 하는데?

브라우저 별로 console의 결과값이 다르게 나올때가 있는데, 이는 브라우저별로 작동하는 방식이 조금씩 다를 수 있기 때문.

브라우저별로 그렇게 만들어졌고 설계되었기 때문에 그렇게 알고 넘어가자.



## Q. protype과 함께 class, constrouctor 문법도 알아야 될까?

지금 굳이 안 알아도 된다.



## Q. 메서드는 prototype에 정의하고, property는 생성자함수에서 하는것이 관습일까요?

그렇지는 않다.

개념상으로 **생성자 함수에 들어가는 property는 생성자 함수가 실행될 때 마다 생성**되는 것들이고,

**property에 선언된 property나 method는 공용으로 딱 한번만 생성되서 공유**되는 것.

그래서 지속적으로 새롭게 생성되는 것이냐, 아니면 하나만 생성해서 하나를 계속 공유하면서 쓰는것이냐 의 차이가 있다. 이는 또 상황에 맞게 써야 한다.



## Q. Object.create() 할 때 prototype이 생성되면서 빈객체에 할당되는지?

새로 만들어지는 것은 아니고, 

Object.create()로 새로 생성되는 빈 객체에 인자값으로 넘어온 객체를 dunder proto 로 설정한다고 보면 된다. (링크 설정)



## Q. 어떠한 객체의 프로토타입이라는 표현?

엄밀히 말하면 이는 잘못된 표현.

함수가 프로토타입 속성을 가지고 있는 것이지만,

일반적으로는 어떠한 객체의 프로토타입이라고 하면, 어떠한 객체의 생성자 함수의 프로토타입이라고 받아들여서 쓴다.



## ETC

- 부트캠프 1차 프로젝트는 팀별로 한다.

  - 1차 프로젝트.
  - 2차 프로젝트는 솔로.
  - 팀은 2~3명

- 이번주 금요일은 과제(Digital Clock) 대략 설명

  - 금요일 7시까지 MergeRequest 꼭!

  

