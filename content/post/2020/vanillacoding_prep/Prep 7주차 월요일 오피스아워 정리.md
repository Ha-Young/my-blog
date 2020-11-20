---
title: "Prep 7주차 월요일 오피스아워 정리"
draft: false
date: "2020-11-16 21:20"
path: "/vanillacoding/prep/week7_op1"
category: "vanilla coding"
---



## 지난주 과제 리뷰

### Q. Component.prototype.render() 에서 return this 하는 이유?

render() 메서드에서 `return this` 부분 주석해도 잘 돌아가는데? 왜 있는 것일까? 불필요한 부분이 아닌가?

Array.prototype.push()는 변경된 배열의 길이를 리턴.

이 처럼 Array.prototype.push()에는 굳이 return 값이 필요없음에도, 사용자 편의성을 위해서 만들어 진 것.

쓸 사람이 있으면 쓰고 아니면 안쓰면 된다.



### Q. Component 생성자 함수에서 delete this.root?

그 바로 윗라인이 extend(this, options) 인데, 이는 현재 인스턴스에 options 프로퍼티들을 확장시키는 것.

근데, 여기서 root는 현재 인스턴스에 필요가 없다고 판단하여 없앤 것.



### 학습포인트

이번 과제의 학습포인트는 **this, prototype**를 코드에서 판별하는 경험.

그외 부분인 이벤트, Component 등 과 같은 부분들은 차차 배워가면 되는 부분이므로, 지금 걱정하지 말자. 매 순간 최선을 다하면서 배워가면 된다.



### 커밋메세지

커밋메세지에는 **지금 무엇을 했다** 만 적으면 된다.

(지금 뭘 못했다, 앞으로 뭘 할거다 내용은 적지 않아도 됨)

커밋 메세지의 목적은 현재 무엇을 작업했는지가 적혀야 됨.



커밋 메세지는 정답은 없다.

하지만, 앞서 설명했듯이, 지금 어떤 작업을 했는지가 명확하게 드러나면 좋다.

> 원격 저장소를 보는 사람이 코드를 보지 않더라도 커밋만 보고 어떤 작업을 했는지 알 수 있게.



영어로 커밋 메세지를 쓰려고 해보자. 중요하진 않지만 추세가 그렇기 때문.



동사(원형)로 시작해서 문장을 만들어주는것이  일반적인 컨벤션.



### 고민 해볼만한 사항

만약에, 시계가 엄청 많이 생긴다면 내가 만든 코드는 어떻게 되지?
(생성자 함수를 통해 시계 인스턴스가 50개, 100개 생성된다면?)



자신의 코드에 대해서 작업이 끝났다고 넘어가기보다는 다양한 상황에 대한 가능성에 대해 고민해보자.

이러한 고민들은 고민에 대한 솔루션이 나오지는 않더라도, 앞으로 이러한 습관을 들여야 한다.



### Q. this.$target === event.target ?

```js
const handleClickEvent = function (event) {
  for (let key in generateEvent) {
    this.$target = event.currentTarget.querySelector(key); // event.currentTarget은 this.$el
    if (this.$target === event.target) {
      generateEvent[key]();
    }
  }
}
```

이 코드는 Component 최상단에 Click 이벤트를 걸어서 하위 tag에도 click 이벤트를 감지할 수 있도록 하기 위함인데,

여기에서 `this.$target === event.target` 은 우리가 앞서 template과 함께 전달한 event 선택자값만 실행되도록 필터링 하기위한 것.



## Closure, Recursion

둘 다 초보자 입장에서 절대 쉬운것이 아니다.

1주일이라는 시간내에 익힐 수 있는 것이 아님.

그래서 이번 주에 개념적인 내용을 보겠지만, 욕심은 내려놓자.

재귀는 개발자도구의 **Call Stack**과 Scope를 꼭 직접 확인 해보자(디테일하게 보기 위해 debugger 이용) 



## console.log VS debugger

둘 중 어느것도 정답은 없다.
무엇을 써야 잘하는 기준도 없음.

각 상황에 맞게 쓰면 된다.

- 간단하게 확인하고 싶을 때 : console.log

- 코드 실행에 디테일하게 확인하고 싶을 때 : debugger



## 개발자도구

모든 브라우저의 개발자도구는 다 비슷비슷하다. 한 브라우저에서의 개발자 도구를 쓰면 모든 브라우저의 개발자도구가 사용가능하니 브라우저로 걱정하지말자. (아무거나 써도 된다)



## 재귀 2번 Quiz TIP

재귀를 사용해야된다는 부담을 느끼지말고 반복되는 내용을 코드로 한번 나열해보고 반복의 두, 세번 정도 적고 눈으로 한번 보자. 

그럼 이 중복되는 내용을 함수로 만들면 된다.

> 금요일 오피스아워에서 풀이 보여줄 예정.



## 이번주 과제

시간이 오래걸리니 혹시 시작안했다면 빨리 시작하자.





## ETC

- 부트캠프 등록자

  - 등록(결제)이후 가이드가 나온다. (부트캠프 준비)
  - 오프라인 모임 예정 (1월 달)
    - 현피?

  