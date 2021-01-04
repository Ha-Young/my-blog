---
title: '바닐라코딩 Prep 7주차 금요일 오피스아워 정리'
draft: false
date: '2020-11-20 21:20'
category: 'vanilla coding'
tags: ['vanilla coding', 'prep']
---

## Underdash

매개변수가 어떤 것인지 꼼꼼하게 파악을 해야된다.

### filter

첫번째 인자 : collection
두번째 인자 : 함수

collection의 인자들을 두번째 함수로 실행했을 때 true가 나오는 것들만 새로운 배열로 리턴.

(collection을 직접적으로 수정하는 것은 아니다.)

일단 무식하더라도 차근차근 하나하나 풀어서 적어보자.

일단, test 케이스를 최우선 목표로 풀이를 진행하고, 풀고 난 다음에 너무 test 케이스에 맞춘 코드가 아닌지 확인해보자.

**단계를 밟는게 중요하다**

> 인자가 어떤 것들인지, 지금 뭐하는 함수인지, 결과는 어떻게 나와야되는지 천천히 파악해보자.

### reject

filter() 함수를 이용할 수 있으면 해보라고 적혀있는데, 고민을 해보면 좋다.

filter의 성격과 reject의 성격을 잘 파악하면 쉽고 간단하다.

filter와 반대로 collection의 인자들을 두번째인자인 함수로 실행했을 때 false인 것만 새로운 배열로 리턴.

### every

첫번째 인자 : collection

두번째 인자 : iterator

iterator은 함수인데, collection 요소 하나하나를 인자로 실행시키는 함수라고 생각하면 편하다. 다른 underdash 함수들도 마찬가지

### extend, defaults

객체를 다루는 이 함수들에서는 **꼭 써야 될게 있다**.

`object.hasOwnProperty()`

예시)

```js
const person = {
  key: 172,
  age: 37,
}

Object.prototype.pigeon = 9999999

// 객체에는 순서가 없기 때문에 for in문 써도 된다. (순서가 보장되야되면 for in 문쓰면 안됨)
for (const prop in person) {
  // prop는 문자열!
  console.log(prop) // 위의 prototype 까지 출력된다.
}
```

위와 같이 쓸 경우에 Object.prototype 까지 값을 가져와버리므로 저렇게 쓰면 안된다.

```js
for (const prop in person) {
  if (person.hasOwnProperty(prop)) {
    console.log(prop)
  }
}
```

다음과 같이 hasOwnProperty()를 통해 체크할 수 있다.

## ETC

- memoize() 풀이는 다음주 월요일에?
  - 상엽님의 허락이 필요합니다.
- 8기분들 스텐드업 발표는?
  - 코로나 2단계가 아니라면 대여한 장소가 있는데 여기서!
  - 2단계 이상 격상이면 영상으로!
- 이번에 이사간다면 운동기구와 접이식 침대를 둘 계획이 있다.
- 바코 최종 목적지는 제주도?
