---
title: "Prep 8주차 수요일 오피스아워 정리"
draft: false
date: "2020-11-25 21:09"
path: "/vanillacoding/prep/week8_op2"
category: "vanilla coding"
---



## 비동기

어렵다.

반복적으로 비동기를 다루면서 적응하면 된다!

Javascript를 쓰면 비동기에 대해 자주 접하게 될것이다.

**Javascript를 쓰려면 비동기에 대한 이해는 필수!**



### 동기

Synchronous. 비동기가 아닌 것.

작업을 순서대로 실시 (완료하면 다음 작업)

이때까지 우리가 봐온 것들의 대부분의 코드가 동기적으로 작동하는 코드

### 비동기

Asynchronous. 동기가 아닌 것.

작업을 동시에 실시 (다음작업이 들어오면 함께  실시)

비동기 구현을 하려면 비동기적으로 작동하는 함수를 사용하면 된다.

setTimeout이 대표적.

```js
console.log("start");

setTimeout(() => {
    console.log("async");
}, 1000);

console.log("end");
```



비동기적으로 작동하는 함수들

- setTimeout
- setInterval
- fetch
- XMLHttpRequest
- ...



fetch와 같은 다른 곳에 값을 받아오는 비동기 작업은 완료가 언제 될지 모른다.

```js
console.log('start');

for (let id = 100; id <= 120; id++) {
    fetch(`https://vanillacoding.surge.sh/quiz/${id}.json`).then((res) => {
        console.log(`${id} 완료!`);
    });
}

console.log("end");
```

위 코드를 보면 우리가 fetch 요청을 보낸 것은 id 100에서 120까지 순서대로 요청을 하였지만, 작업완료시에 동작 `then`은 어떤 id의 순서로 작동될지는 모른다.



## Event Loop

강의자료의 `Event Loop`은 간략하게만 나와있다. 궁금하면 더 찾아보자. 양이 방대할 것.

지금 자세히 알 필요는 없고 나중에 비동기 작업을 계속 하다보면 `Event Loop`에 대해 조사해야될 때가 있다. 그 때 봐도 괜찮다.

하지만, 지금 `Event Loop`은 아래 코드가 어떻게 작동하는지 정도는 알아야 한다.

```js
console.log("start");

setTimeout(function foo () {
    console.log("after 0 sec");
}, 0);

console.log("end");

//start
//end
//after 0 sec
```

`foo` 함수가 0초뒤에 실행되서 

start
after 0 sec
end

의 순서로 출력된다고 많이 생각하지만 아님.

start
end
after 0 sec

의 순서로 실행된다. 

#### 왜?

`Event Loop` 때문.

`setTimeout`의 작업은 `callback queue`에 들어가고,

이 `callback queue`에 들어간 작업은 `call stack`이 비워져야만  `callback queue`에서 꺼내져 사용되기 때문.

`Event Loop`의 시각자료는 **바닐라코딩 강의자료에 있는 [Event Loop Visualizer](http://latentflip.com/loupe/) 에서 꼭 확인해보자. (강추)**

영상도 꼭 보자.



## Q. 싱글스레드 자바스크립트 비동기 가능 이유?

**싱글스레드 언어인 자바스크립트에서 비동기 구현이 가능한 이유**는 비동기 함수가 자바스크립트가 아니기 때문?

-> 맞다. 비동기 함수는 자바스크립트가 아니라, **WEB API** 
또, callback queue 등의 존재들(`Event Loop 형성`) 때문에 비동기 구현이 가능한 것.





## ETC

- 마지막 주 강의 영상 올라왔습니다.
  - 마지막 주 강의 영상은 숨돌리는? 영상
  - Promise는 비동기에 대한 이해를 전제로 하는거라 당장 이해 못해도 상관없다. **하지만 매우중요!**
- 금요일에 이번주 과제 Parallel함수 설명 예정