---
title: "바닐라코딩 Prep코스 사전준비 - 1주차 두번째 오피스아워 정리"
draft: false
path: "/vanillacoding/prep/week1_oh2"
date: "2020-10-07 21:00"
category: 'vanilla coding'
---

## 오피스아워에서 하는 것

- 월요일 : 해당 주 과제, 배우는 것에 대하여 설명
- 수요일 : 해당 주 주제에 관해 주요한 부분 설명
- 금요일 : 해당 주차 과제에 대한 솔루션

## JavaScript Type

- Boolean
- Null
- Undefined
- Number
- String
- Symbol
- Object



NaN의 type은 number

NaN은 주로 애러상황에서 만나게 됨

숫자가 아닌걸 숫자로 변환하려고 하였을때.

isNaN()으로 판별가능. type은 number이기 때문에 판별 불가



#### undefined

undefined는 주로 대입으로 선언하지 않음

컨벤션이 주로 그러하지 않다는 말

초기값 세팅이 안되어 있을 때 주로 나온다 (빈값으로 쓰이는편)



#### Object 타입

함수, 배열과 같은 것들...



#### 심볼

지금 당장은 몰라도 됨.

하지만 나중에는 꼭 알고있어야 됨.

심볼이라는 자료형은 객체를 만들 때 

```
var obj = {
	a: 1,
	b: 2
};
```

와 같은걸 암호화? 처럼 할 수 있음

조금 더 자바스크립트 코드에 보안성 강화와 유지보수측면에서 좋음.

고유한 값? 암호화 된 값? 해쉬키 값? 같은거라고 생각하면 됨





## Truthy and Falsy

Falsy는 어떤것들이 있나?

> false, 0, -0, "", null, undefined, NaN, 0n

- function을 Boolean으로 바꾸면 Truthy



#### Big int 0n?

- javascript 검색할때는 default로 MDN을 보자.

- 0n -> big int 형식으로 Falsy!



## Q. Or, And Operator 문법애러 

#### 함수 || "hello"

```js
function foo() {} || "hello" // Error
(function foo(){}) || "hello" // Pass
```

function foo() {} || "hello" 로 하면 애러가 난다. 
		-> 애러가 났다는건 문법상 잘못되었다는 것.

(function foo(){}) || "hello" 와 같이 확실하게 구분지어야 한다.

#### 객체 || "hello" , 객체 && "hello"

{} && "hello" 도 안됨 문법상 애러.

```js
"hello" && {}

"hello" || {title: 123}
```

dㅘ 같이 순서를 바꾸면 되는데, 이유는 나중에 찾아보고 알려주신다고 함.





## function

function에서 사람들이 제일 많이 햇갈리는게 return값.

**모든 자바스크립트의 함수는 실행 후 결과값을 반환.**

```javascript
function foo() {
	return a + 3;
} // 함수를 만든 것. 선언. (실행 X)

foo(); // 함수 실행 * 소괄호가 들어간다

// 함수 실행문 위치한 자리에는 반환값이 들어간다
var a = foo(1) + foo(2); // var a = 4 + 5와 같다.
```

```javascript
// 함수에는 return문이 없을 수도 있다. (명시하지 않을 수 있다.) 하지만 결과값은 undefined로 반환된다.
function foo(a) {
	console.log(a + 3);
}

var a = foo(1) + foo(2); //a = undefined + undefined;

// a -> NaN
// undefined는 덧셈을 할 수 없는데 덧셈을 하였으므로 NaN이 된다. 
```

아래문도 똑같이 함수 반환값이 바로 결과로 적용된다.

```js
function foo(a) {
  return a * 2;
}

const obj = {
  something : foo(4) // something : 8
}
```

**이 부분은 많이 중요. 가장 기초적임.**



## Control Flow

반복문은 기초적인 틀에 사로잡히지 말아야 한다.

```js
for (let i = 1; i < 3; i++ ) {
	// ToDo
}
// 와 같은 형태를 가장 많이 쓴다.
// 하지만 이러한 형태로 익숙해지지말고 원리를 이해해서 다르게 적용시킬 줄 알아야 한다
```

```js
for (let i = 2; i <= 100; i+=2) {
  // ToDo
}
//와 같이 짝수만 적용 50번 반복된다.

var arr = [1,2,3,4,5]
for (let i = arr.length - 1; i >= 0; i--) {
  // ToDo
}
//와 같이 배열 역순으로 순회.
```



## Object

초보자때는 Object에 대해 햇갈릴 것이 많을 수 있다.

아직 익숙하지 않아서 그런 것.



#### 식별자

변수와 같은데, 선언시 JavaScript 선언 규칙에 맞춰줘야 한다.

```js
var _sfsd = 1;
var $dsfsfs = 2;
var ewefwef = 3;
var 12312afefw = 4; // Error 문법적으로 안됨.
var sfsdf123 = 5;
var asdfs123sdfsadf = 6;
var a ffd = 7; //공백 안됨 Error
```

이 규칙은 객체의 Key값에도 적용된다.

```js
var obj = {
  _obj: 1,
  $asd: 2,
  sdf: 3,
  123fff: 4, // Error 문법 애러,
  3 abc 1: 5, // Error
  
  '3abc': 6, //string타입으로 key를 주면 가능
}

obj.3abc // Error
obj['3abc'] // 대괄호를 이용해서 가져올 수 있다.
```

```js
var obj = {
  a: 1,
  b: 2,
  c: 3
};

for (let prop in obj) {
  console.log(prop);
} // 반복문을 통해 객체의 key값을 순회 할 수 있다.
// 순서는 선언순서와 같이 나올텐데, 
// * MDN에서 for in 문에 배열에 사용할 때는 특정순서로 작동된다는 보장은 없다고 한다. (arbitrary하게 작용)
// * 따라서 for in 문에대해서 key값을 순회할 때 순서가 순차적이지 않고 arbitrary하다는 점 기억!
```



## Q. 객체 리터럴 - 리터럴 (literal)

리터럴 뜻은 문자 그대로의.

객체에서의 리터럴은 객체를 만드는 방법은 여러개가 있는데

```js
var obj = {};
var obj2 = {
  a: 1,
  b: "abc",
  c: function() { console.log("c"); 
}
```

이렇게 직접적으로 만드는 방법이 객체 리터럴 선언 방법

```js
// 객체 리터럴 선언이 아닌 객체 선언 방법
var obj = new Object();
var obj2 = Object.create({});
var obj3 = new 함수명();
```

배열도 리터럴 선언 방식이 있는데,

```js
var arr = [];
var arr2 = [1, 2, 3, 4];
```

```js
// 배열 리터럴이 아닌 것
var arr = new Array();
var arr2 = new Array(20);
```

```js
// 객체 리터럴
{} 
{
  a: 1,
  b: 2
}

// 배열 리터럴
[]
[1, 2, 3, 4]
```

말 그대로 선언할 때 객체나 배열 형태의 값을 
직접적으로 표현하는게 리터럴 즉, 객체 리터럴, 배열 리터럴이고 
이 리터럴 즉, 객체 리터럴, 배열 리터럴로 바로 선언해주면 
객체, 배열을 리터럴로 생성했다고 할 수 있을 것 같습니다.




## Q. 배열에서 요소와 key, value 차이

```js
var arr = [1, 2, 3];
arr.push({"adding": "add"});
arr.length // 4
```

위와 같이 객체 추가시에 길이가 추가 된다.



```js
var arr = [1, 2, 3];
arr.length // 3
arr.adding = "add";
arr // [1, 2, 3, adding: "add"]
arr.length // 3
```

위 방법에서 3째줄과 같이 요소를 추가하면 길이 변화가 없음.

**why?**

위 방법은 arr 배열객체에 key, value(property?)를 넣어준 것

해당 방법은 요소를 넣어 준 것이라서 length에 변화가 없다.

요소로 추가를 해줘야 length에 변화가 있음





## ETC...

> - 난문가 탄생
> - 요즘에는 혹시를 Hoxy라고 한단다.. 나는 몰랐다 ㅠㅠ
>
> - 금요일에는 깜짝 놀랄만한 것이 있다는데 과연?