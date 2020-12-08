---
title: "바닐라코딩 Prep 9주차 월요일 오피스아워 정리"
draft: false
date: "2020-11-30 21:09"
category: "vanilla coding"
tags: ['vanilla coding', 'prep']
---





## 과제 리뷰 코멘트

### early return

```js
if (isTrue) {
    // A..
    // B..
    // C..
    // D..
} else {
    return "early return";
}
```

다음과 같은 분기중에서 한쪽은 길고 한쪽은 짧을 때 혹은 if else문을 통한 예외처리를  `early return` 처리하면 좋다.



```js
if (errorCheck()) {
    return "fail fest";
}

if (!isTrue) {
    return "early return";
}

// A..
// B..
// C..
// D..
```

이렇게 할 경우, 가독성이 좋아지고 효율이 좋아진다.

또 

- 가독성이 좋아진다.
  - indentation이 줄고,
  - if else문을 다 안봐도 된다.
- if, else 문에 대해 다 보지 않기 때문에 효율성이 있다.
- 예외처리를 `early return`처리하면 **`fail fest`**한 코드가 되어서 빠른 예외처리로 불필요한 로직수행이 없어진다.



### callback 함수에 bind

```js
for (var i = 0; i < tasks.length; i++) {
    tasks[i](callback.bind({idx : i}));
}
```

이렇게 할 경우 작동도 되고 좋은 방법이지만, 최선의 방식은 아닌 것 같다.

이렇게 this값을 고의로 설정하는 방법은 외부와 충돌이 일어날 수 있다.

> 만약, callback 내부에서 this를 사용한다면?



**하지만, bind를 통해 this를 넘기려고 한 생각은 좋았다.**



### 코드 스타일이나 디테일한 부분

아직 많은사람들이 보완해야 된다.

코드스타일, 변수 네이밍, 세미콜론, 들여쓰기, 커밋 메세지 등등

> 부트캠프에 들어오시는 분들은 이제 이런 소소한부분들에 대해 잔소리가 있을 예정.



### Prep에서의 내용

굉장이 중요한 자바스크립트 개념의 기초중의 기초!

알기만 하는것보다 코드에 응용할 수 있어야 한다.

안쓰게되면 까먹게될 수 있는데, 까먹지말고 주기적으로 계속 상기시키자!

#### gitlab을 통해 MR하는 과정

flow에 대해 잘 이해하자.

거의 모든 회사에서 이렇게 한다.



## Promise

부트캠프 하는사람들은 굉장히 중요하니 자세히 알고 오자!

간단하다고 생각할 수 있지만, 복잡하고 응용하기 까다롭다. 

실제 사용하는건 간단하게 끝날 수 있지만, 동작하는 세부 원리, 개념을 따져보면 어렵다.(`event loop`와 연관)



Promise의 사용방법? 장점? 단점? 어떻게 동작하는지? 에 대해 조금이라도 익힐려고 노력하자. 





