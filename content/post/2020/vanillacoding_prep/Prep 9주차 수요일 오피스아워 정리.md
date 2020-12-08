---
title: "바닐라코딩 Prep 9주차 수요일 오피스아워 정리"
draft: false
date: "2020-12-02 21:21"
category: "vanilla coding"
tags: ['vanilla coding', 'prep']
---



## Promise

사용하는건 그렇게 어렵지 않다.

인자로 함수를 받는 생성자 함수!

```js
var p1 = new Promise(function);
```



그리고 이 함수의 인자는 resolve, reject를 받아야 한다.

```js
var p1 = new Promise(function func (resolve, reject) {
    // Async ToDo...
})
```

- resolve는 작업 완료시 호출
- reject는 애러시 호출



### 순서

```js
console.log(1);

var p1 = new Promise(function func (resolve, reject) {
    console.log(2);
    resolve();
});

console.log(3);

p1.then(function callback() {
    console.log(4);
});

console.log(5);
```

순서는 `1 -> 2 -> 3 -> 5 -> 4`

- 다들 Promise 생성자 함수가 비동기로 작동한다고 생각해서 `1 -> 3 `으로 생각하기 쉬우나, 생성자 함수 자체는 비동기가 아님을 유의하자! 내부에서 비동기작업이 이뤄지고,  완료후에 `resolve`함수가 쓰여야 한다!
- 또 `1 -> 2 -> 3 -> 4`로 생각하기 쉬우나, 사실은 `1 -> 2 -> 3 -> 5 -> 4`순서로 작동한다.
  - Promise의 기본적인 작동 방식이 resolve()로 실행은 되었어도, then의 인자값으로 받은 `callback` 함수가 **콜백 큐**에 들어가진다. 따라서 5가 먼저 출력되는 것.



특징은

- 딱 한번만 사용할 수 있다.
- 비동기 결과값을 then을 통해 받을 수 있다.



### Q. then의 파라미터인 함수를 안받아도 되는가?

안받아도 상관없다. (비동기 실행에 대한 결과값이 필요 없다면)

만약, 비동기 결과값이 필요하다면, resolve()함수에 결과 인자를 넘기고, 이후 then 메소드의 콜백함수 인자값으로 받을 수 있다.

```js
var p1 = new Promise(function func (resolve, reject) {
    resolve(10);
});

p1.then((result) => {
    console.log(result);
});
//10 출력
```

- 그냥 비동기 실행만 -> 인자 넘길 필요 없음
- 비동기 실행하고 결과값도 필요 -> resolve(result) 후 then callback함수 인자로 받기



상황에 맞춰서 사용하자.



### Q. 프로미스의 결과값은?

프로미스 인스턴스.

status로 상태를 확인 할 수 있고, `then()`과 `catch()` 메소드를 사용 할 수 있다.



### Callback Hell

간단히 아래와 같은 예시와 비슷하다고 보면 되는데,

```js
setTimeout(function func1 () {
    console.log(1);
    
    setTimeout(function func2 () {
        console.log(2);
        
        setTimeout(function func3 () {
            console.log(3);
            
            setTimeout(function func4 () {
                console.log(4);
            }, 4000);
        }, 3000);
    }, 2000);
}, 1000);
```

- 1초 뒤 1
- 3초 뒤 2
- 6초 뒤 3
- 10초 뒤 4



다음과 같이 비동기 작업 이후에도 또 다음 비동기 작업 콜백함수를 계속해서 사용하면 callback hell이라고 할 수 있다.

더 정확한 예시는 강의자료 참고.



#### 부작용

- 가독성
- 코드 이해
- **수동적인 자세로 비동기 처리**
  - 다음 콜백함수가 실행되기 까지 기다려야 된다.
  - 로직이 잘못된건지, 비동기 작업이 오래걸리는 건지 알 수 없다.



### Promise 장점

가독성과 코드이해를 향상시킬 뿐만아니라 `new Promise`로 생성된 `promise 인스턴스`를 통해 능동적으로 비동기 처리가 가능하다.

> 사실 Promise는 callback hell을 해결하는건 아니다.

- 작업상태 확인
- 비동기 결과값 받기
- 애러 핸들링
- 확장가능성 (객체지향 프로그래밍으로 만들어진 객체이기 때문에)



#### 비동기 애러 핸들링 처리

예전에는 애러처리 방식이 동기상황일떄와 비동기상황일때가 달랐는데, `Promise`의 `then`과 `catch`를 이용해서 동기상황에서의 애러처리인 `try-catch` 문과 같은 방식으로 애러처리가 가능해졌다. 이는 코드 설계 자체를 바꾸는 큰 일!



## async await ES2017

```js
function asyncFunc() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}

async function func() {
    console.log(1);
    const result = await asyncFunc();
    console.log(2);
}
```

`async await`은 `Promise`를 이해했다면 저절로 이해될 것이다.



비동기 처리의 순서가

1. callback pattern: continuous passing style
2. Promise
3. async/await

다음과 같음.

우리는 **Promise 이해부터!!**



## Promise에 대해 계속 공부하자 (고차원적인 개념)

[You're Missing the Point of Promises](https://blog.domenic.me/youre-missing-the-point-of-promises/)



외의 유명한 사람들의 블로그



## 공부할 때 유명한 블로그들 글을 참조하자

[Kent C Dodds](https://kentcdodds.com/)

[Domenic](https://blog.domenic.me/)

과 같은 사람들 등등...



믿을만한 소스가 아니라면, 검증과정을 거쳐야 한다.

- 추가적으로 조사
- 예제 직접 확인
- 등등...



## ETC

- 스탠드업 데이 외부적으로 하는건 취소
  - 유튜브로 시청가능