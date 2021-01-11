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
이 프로토타입의 동작 원리를 알아야 MDN에서 `Obejct.hasOwnProperty()` `Array.prototype.splice()`와 같은 <u>표준 내장객체의 prototype 메서드들의 원리</u>와 <u>객체(Object) 상속 원리</u>를 이해할 수 있다.

또 javascript는 이 Prototype 기반의 **객체지향 언어**로, 다른 클래스 기반의 객체지향언어와는 다르다. 하지만 클래스기반 객체지향 프로그래밍의 특징 중 하나인 <u>상속을 복제의 과정</u>을 통해 구현할 수 있으며, **클래스 기반 객체지향보다 좀 더 인스턴스 지향적**이다.

> 가장 핵심적인건 이 Prototype원리를 이용해 객체지향프로그래밍을 할 수 있다는데 있다.



## Javascript Prototype 이해하기

### 객체의 prototype

#### 현재 객체에 속성이 존재하지 않으면 프로토타입을 참조

프로토타입의 동작방식에서 가장 기본적인 원칙은 우리가 가진 객체에서 `Property`를 읽을 때 만약 해당 `Property`가 없다면 자동으로 현재 객체의 `prototype`에서 해당 `Property`를 찾는다는 것이다.

이를 알 수 있는 가장 좋은 예제가 바로 `Object` 내장객체에 포함되어있는 메서드들이 우리가 생성한 객체들로도 쓸 수 있다는 점이다.

```js
const human = {
    name: 'ha-young',
    age: 30
};

console.log(human.toString()); // toString 속성은 없지만 사용된다.
console.log(human.hasOwnProperty('name')); // hasOwnProperty 속성은 없지만 사용된다.
```

human 객체에서 `toString()` 과 `hasOwnProperty()`메서드를 선언한 적이 없지만 사용 할 수 있다.

어떻게 사용이 되는 것일까? 이 메서드들은 Object.prototype에 있는 메서드들이다.

![proto-Object](.\하옹의-자바스크립트-식사---Prototype_proto1.jpg)

human 객체를 콘솔에 출력해보면 `__proto__`속성으로 내장객체인 `Object` 를 가지고 있다.

바로 이것이 **프로토타입**으로, 프로토타입의 가장 기본적인 원칙인 프로퍼티를 참조할 때, 현재 객체에 존재하지 않는다면 프로토타입 체인이 연결되어있는 순서대로 타고 올라가면서 프로퍼티를 찾게된다. 바로 그 프로토타입을 확인해볼 수 있는것이 `__proto__` 속성이고 위 human 객체의 프로토타입은 `Object`내장객체 이다.

> 사실 \_\_proto\_\_ 속성을 접근하면 내부적으로 Object.getPrototypeOf 가 호출된다.

>  `Object` 내장객체는 가장 근본이 되는 프로토타입으로 모든 객체들의 프로토타입 체인의 마지막은 `Object`이다.

#### 프로토타입에 있는 속성과 메서드는 공유된다.

또 `Array`를 생성했을 때 모든 `Array`들이 다 같은 메서드들을 가지고 있는데, 이 메서드들은 `Array.prototype`에 있는 메서드들로 모든 `Array`마다 각자 가지고있는 메서드들이 아닌 `Array.prototype`에 있는 메서드들을 모든 `Array`객체에서 공유한다. 그리고 이 또한 프로토타입의 원리이다.

```js
const arr1 = [1, 2, 3];
const arr2 = [10, 11, 12];
```

위 처럼 생성된 Array들을 각각 콘솔에 찍어보면 아래와 같다.

![Array 인스턴스 출력](.\하옹의-자바스크립트-식사---Prototype_proto2_array.jpg)

그럼 보는바와 같이 각각 `Array`객체 모두 우리가 사용하던 `from()`, `splice()`, `push()` 등과 같은 메서드들을 가지고 있지 않다.

당연히 이 메서드들은 `Array`의 프로토타입인 `Array.prototype` 이 가지고 있는 것이고, `__proto__`을 통해 확인할 수 있다.

<img src=".\하옹의-자바스크립트-식사---Prototype_proto2_array_prototype.jpg" alt="Array Prototype" style="zoom:80%;" />



```js
console.log(arr1.__proto__ === arr2.__proto__); // true
```

이를 통해 우리가 알 수 있는건, **`Array.prototype` 프로토타입 객체는 딱 하나만 존재**하고 있고, 새롭게 생성되는 `Array`객체들은 이 `Array.prototype` 프로토타입 객체안의 메서드들을 공유하는 개념이다.

![프로토타입은 공유](.\하옹의-자바스크립트-식사---Prototype_proto2_array_prototype공유.jpg)



### 생성자 함수

#### 생성자 함수란

우리가 `new`키워드와 함께 함수를 사용하면, 이 함수를 **생성자 함수**라고 부르는데, 이 생성자 함수는 새로운 객체를 생성하는 함수이자 일종의 틀이다.

```js
// 생성자 함수
function Human (name, age) {
    this.name = name;
    this.age = age;
}

// 만들어진 생성자 함수로 객체 생성
const hayoung = new Human('ha-young', 30);
const hosam = new Human('hosam', 28);

console.log(hayoung); // Human {name: "ha-young", age: 30}
console.log(hosam); // Human {name: "hosam", age: 28}
```

이 생성자 함수는 return이 명시되어있지 않지만 자동적으로 `return this`를 수행한다.

그리고 생성자 함수 내부에서의 `this`는 빈 객체로 자동생성되어져 이후 `this.name = name` 과 같은 코드에 의해 객체에 속성이 할당되는 것.

#### 리터럴에 내부적으로 작동하는 생성자 함수

또 우리가 흔히 리터럴로 생성한 객체들은 모두 내부적으로 이 생성자 함수로 만들어진다고 봐도 좋다.

```js
const obj = {};

const obj = new Object();
```

```js
const arr = [];

const arr = new Array();
```

```js
const func = function () {};

const func = new Function();
```

#### ✨생성자 함수의 'prototype' 속성

우리가 함수를 생성하면 자동적으로 이 `property` 속성이 만들어 진다.

> 함수에만 존재하는 prototype 속성이지만 오직 함수가 생성자 함수로 쓰였을 때만 의미가 있다.

```js
function Person() {};
dir(Person);
```

![prototype속성](.\하옹의-자바스크립트-식사---Prototype_prototype_property.jpg)

이 **`prototype`속성의 값은 객체로써 오직 함수에만 자동생성되어 존재**하는데,

해당 **함수가 생성자 함수로 쓰였을 때 그 생성자 함수가 생성하는 객체의 프로토타입 즉, `__proto__`로 이 prototype 속성의 객체가 설정**된다.

```js
const hoho = {
    prop1: 'haha',
    prop2: 'hihi'
}

function Person() {};
Person.prototype = hoho;

const person1 = new Person();
const person2 = new Person();
console.log(person1.__proto__); // {prop1: "haha", prop2: "hihi"}
console.log(hoho === person1.__proto__); // true
console.log(hoho === person2.__proto__); // true
```

맨 마지막 라인만 봐도 같은것을 알 수 있다.

또 여기서 다시한번 프로토타입 객체는 생성된 객체들과 공유되는 것을 알 수 있다.

> person1, person2 객체 모두 hoho객체를 프로토타입으로 공유한다.

```js
console.log(person1.prop1); // 'haha'
console.log(person2.prop1); // 'haha'
```

당연히 같은 값이 나오게 된다.





## prototype VS \_\_proto\_\_

dunder-proto

## 상속 구현하기





## 왜 객체지향?

앞서, Prototype은 객체지향 프로그래밍을 하기 위한 방법이고, Prototype기반의 객체지향 프로그래밍은 상속을 복제의 과정을 통해 구현할 수 있다고 했다. 이제 프로토타입이 무엇이고, 상속은 어떻게 하는지 알겠다. 그럼 왜 이런 것들로 객체지향 프로그래밍을 하고자 하는 것일까?

가장 큰 이유는 아마 아래 3가지가 아닐까 싶다.

- 코드의 재사용성
- 유지보수의 용이성
- 기능 확장에 유리 (상속)

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
    length: 10,
    
    getArea: function () {
        return this.length * this.length;
    },
    printInformation: function () {
        console.log('this is square, length : ', length);
    }
}
```

위와같은 코드를 작성하게되면 단일 객체로 쓰이는 경우에는 상관없으나, 같은 형태의 객체들을 계속 재생성, 재사용하게 될 경우에는 문제를 야기시킬 수 있다.

> rectangle과 square 간의 공통점이 존재함에도 각각 다른 객체 인스턴스로 생성이되어서 코드간의 중복이 발생하고 길이가 다른 rectangle, square가 나올 때 마다 객체 리터럴로 계속해서 생성해주는 번거로움이 생긴다.

위 코드를 객체지향적으로 표현하면 아래와 같은 이점이 생긴다.

### 코드의 재사용성

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

### 유지보수의 용이성

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

### 기능확장에 유리 (상속)

가장 위의 예제인 rectangle과 square가 나오는 부분을 보자.

square는 rectangle의 특징을 그대로 답습한다. 이럴때는 상속을 이용해 rectangle의 특성을 그대로 가져오면서 square만의 기능을 추가할 수 있다.

```js
function Rectangle(width, height) {
    this.width = width;
    this.height = height;
}

Rectangle.prototype.getArea = function() {
    return this.width * this.height;
}

Rectangle.prototype.printInformation = function () {
	console.log(`width: ${this.width} height: ${this.height}`);
}

function Square(length) {
    Rectangle.call(this, length, length);
}

Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;

Square.prototype.printInformation = function () {
    console.log(`this is square, length : ${this.width}`)
}

const rect = new Rectangle(30, 50);
const square = new Square(30);

rect.getArea(); // 1500
square.getArea(); // 900

rect.printInformation(); // width: 30 height: 50
square.printInformation(); // this is square, length : 30
```

