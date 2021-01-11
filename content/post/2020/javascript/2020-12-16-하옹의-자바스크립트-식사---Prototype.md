---
title: '하옹의 자바스크립트 식사 - Prototype'
draft: false
date: '2021-1-11'
category: 'javascript'
tags: ['javascript', 'prototype', '객체지향프로그래밍']
---

\* 이 글은 [MDN](https://developer.mozilla.org/es/), [Vanilla Coding Prep 강의자료](https://www.vanillacoding.co/), [PoiemaWeb](https://poiemaweb.com/)등 공신력있는 곳들을 참조한 글입니다.

## Prototype?

프로토타입은 자바스크립트를 작동시키는 근간이 되는 개념중 하나이다.
이 프로토타입의 동작 원리를 알아야 MDN에서 `Array.prototype.splice`와 같은 표준<u>내장객체의 prototype 메서드들의 원리</u>와 <u>객체(Object) 상속 원리</u>를 이해할 수 있다.

또 javascript는 이 Prototype 기반의 **객체지향 언어**로, 다른 클래스 기반의 객체지향언어와는 다르다. 하지만 클래스기반 객체지향 프로그래밍의 특징 중 하나인 <u>상속을 복제의 과정</u>을 통해 구현할 수 있으며, **클래스 기반 객체지향보다 좀 더 인스턴스 지향적**이다.

### 왜 객체지향?

앞서, Prototype은 객체지향 프로그래밍을 하기 위한 방법이고, Prototype기반의 객체지향 프로그래밍은 상속을 복제의 과정을 통해 구현할 수 있다고 했다. 그럼 왜 객체지향 프로그래밍을 하고자 하는 것일까?

- 코드의 재사용성
- 유지보수의 용이성
- 기능 확장에 유리 (상속)

가장 큰 이유는 아마 위 3가지가 아닐까 싶다.

만약, 우리가 객체지향적으로 프로그래밍을 작성하지 않는다면 다음과 같은 코드가 나올 것이다.

```js
const rectangle = {
    width: 10,
    height: 20,
    
    getArea: function () {
        return this.width * this.height;
    },
    printInformation: function () {
        console.log(width, height);
    }
}

const square = {
    width: 10,
    height: 10,
    
    getArea: function () {
        return this.width * this.height;
    },
    printInformation: function () {
        console.log(width, height);
    }
}
```

위와같은 코드를 작성하게되면 단일 객체로 쓰이는 경우에는 상관없으나, 같은 형태의 객체들을 계속 재생성, 재사용하게 될 경우에는 문제를 야기시킬 수 있다.

> rectangle과 square 간의 공통점이 존재함에도 각각 다른 객체 인스턴스로 생성이되어서 코드간의 중복이 발생하고 길이가 다른 rectangle, square가 나올 때 마다 객체 리터럴로 계속해서 생성해주는 번거로움이 생긴다.

위 코드를 객체지향적으로 표현하면 아래와 같은 이점이 생긴다.

#### 코드의 재사용성

위 처럼 코드를 짠다면, rectangle에 대해서 재생성을 할 때 아래처럼 계속해서 생성할것이다.

```js
const rectangle1 = {
    width: 10,
    height: 20,
    
    getArea: function () {
        return this.width * this.height;
    },
    printInformation: function () {
        console.log(width, height);
    }
}
// ...
const rectangle2 = {
    width: 30,
    height: 50,
    
    getArea: function () {
        return this.width * this.height;
    },
    printInformation: function () {
        console.log(width, height);
    }
}
//...
```

이를 객체지향적인 프로그래밍으로 바꿔주자.

```js{10-11}
function Rectangle(width, height) {
    this.width = width;
    this.height = height;
}

Rectangle.prototype.getArea = function () {
    return this.width * this.height;
}

Rectangle.prototype.printInformation = function () {
	console.log(this.width, this.height);
}

const rectangle1 = new Rectangle(10, 20);
const rectangle2 = new Rectangle(30, 50);
```

위와 같이 객체지향의 **생성자함수**를 만들어주니 rectangle을 생성할 때 아주 쉽게 재생성 할 수 있다. 이것이 바로 객체지향의 재사용성이 되겠다.

#### 유지보수의 용이성

유지보수의 용이성이란 수정하기 쉽다는 말인데,

만약 위 코드에서 `printInformation`의 출력 포멧을 수정해야 되는 상황이 발생했다고 치자 그럼 맨 처음 코드에서는 각각 객체 리터럴을 찾아다니며 `printInformation`을 수정해야 된다.

우리는 객체지향의 생성자함수를 만들어놨으므로 생성자 함수만 수정하면 번거로움없이 `printInformation`을 일괄적용시킬 수 있다.

```js{11}
function Rectangle(width, height) {
    this.width = width;
    this.height = height;
}

Rectangle.prototype.getArea = function () {
    return this.width * this.height;
}

Rectangle.prototype.printInformation = function () {
	console.log(`width: ${this.width} height: ${this.height}`);
}

const rectangle1 = new Rectangle(10, 20);
const rectangle2 = new Rectangle(30, 50);

rectangle1.printInformation(); // width: 10 height: 20
rectangle2.printInformation(); // width: 30 height: 50
```

위 처럼 생성자 함수만 수정해줬는데도, 우리가 생성하는 모든 rectangle에 수정사항을 적용시킬 수 있다.

마찬가지로 그럴리는 없겠지만 넓이를 구하는 공식이 바뀌면 생성자 함수의 `getArea` 메서드만 수정해주면 된다.

이처럼 잘 작성한 객체지향적인 코드는 개발을 용이하게 하고 유지보수를 좀 더 쉽게 할 수 있다.

#### 기능확장에 유리 (상속)



```js
function Rectangle(width, height) {
    
}
```



## Javascript Prototype 이해하기

### prototype의 프로퍼티

프로토타입의 동작방식에서 가장 기본적인 원칙은 우리가 가진 객체에서 `Property`를 읽을 때 만약 해당 `Property`가 없다면 자동으로 현재 객체의 `prototype`에서 해당 `Property`를 찾는다.

```js

```



## Prototype VS \_\_proto\_\_



## 상속 구현하기





## hasOwnProperty()