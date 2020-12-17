---
title: "바닐라코딩 Prep 4주차 월요일 오피스아워 정리"
draft: false
date: "2020-10-26 21:20"
category: "vanilla coding"
tags: ['vanilla coding', 'prep']
---

## ToDo 리스트 활용

ToDo 리스트 (요구사항) 에 현혹되지 말자!

ToDo 리스트에 있는 기능이나 요구사항보다 개발할 때에는 더 잘게 쪼개서 작업을 해야 된다.



#### ex)

시작 버튼을 눌렀을 경우, quiz.json의 첫 문제부터 카드형식으로 보여주어야 한다.

0. html, css 작업
1. 시작버튼에 클릭 이벤트 추가
2. quiz.json 가져오기
3. quiz.json 첫 문제 가져오기
4. 첫 문제 제목 보여주기
5. 답안지 보여주기
6. 답안지 클릭 이벤트
7. 다음버튼 클릭 이벤트



다음과 같이 매우 잘게 쪼게서 진행하자.

> 개발 할 때 여러가지를 생각하면서 하지 말고 일단 하나의 기능만 생각하고 개발하고 하는 식으로 진행하자.
>
> **다른 기능과의 연관성과 리팩토링은 나중에!**
>
> **divide and conquer!**



## 코드 작성시 띄워쓰기

코드 작성시 줄나눔(뉴라인)은 의미나 문맥이 바뀔때 해주면 좋다.

그렇다고 두번, 세번 연속으로 하면 안된다.

글을 적을 때처럼 문맥이 바뀔 때 글을 띄워서 문단을 나누듯이 코드또한 작성중에 맥락이 바뀐다면 줄 구분을 해주어서 가독성을 높이자!

> 코드를 작성할 때 책을 쓰듯이 잘 읽힐 수 있게 적어서 다른사람들이 내 코드를 봤을 때 책 읽는 것 처럼 잘 읽힐 수 있게 만들어야 된다.

### 배려의 마음가짐!

> 내가 만든 코드를 나중에 읽어보자.

## DOM 변수 네이밍

```
// 뒤에 Element 붙이기
const someButtonElement = document.querySelector(".myClassName");

// 앞에 $ 붙이기
const $someButton = document.querySelector(".myClassName");
```

DOM 변수를 명확하게 알아볼 수 있게 해야된다.

## 함수 네이밍

이 함수가 쓰이는 곳 보다 무슨기능을 하는 것인지에 대해서 서술하는 것이 좋다.

함수명을 작성할 때 동사로 시작!

그리고 만약, 함수의 이름이 길어지거나 복잡하다면 함수 내부에 있는 기능을 나눠보자!

함수 명은 무조건 명확하고 간단하면 좋다!

## setInterval, setTimeout 앞에 window?

setInterval, setTimeout과 같은 전역객체의 메서드는 써도 되고 안써도 되는데, 명확하게 나타내고 싶으면 window를 쓰면 된다.

이 부분은 주관적이고 회사마다 다른 부분이므로 **정답은 없다**

## git comment에 코드

\`\`\`

머시기 머시기

\`\`\`

벡틱 3개로 묶어주자


다음과 같이 첫  \`\`\` 뒤에 js를 붙이면 js syntax에 맞게 하이라이팅 된다.

slack에서도 마찬가지. (slack에서는 js와 같이 언어 하이라이팅은 안된다.)

## 문제

```
var vanillacoding = {
  ceo: "ken"
};

function destroy (something) {
  something = null;
}

destroy(vanillacoding);

console.log(vanillacoding);
```

### 코드 작동 순서

### 첫 세줄동안 하는 일

1. vanillacoding 변수를 선언(할당 X)
2. 객체를 생성 (메모리 공간에 할당하고 변수에는 그 참조값(주소값) 할당)

### 4~6 줄에서 하는 일

1. 그냥 단순히 destroy 함수 선언
2. 함수 실행이 아님!

### 8줄에서 하는 일

1. destroy함수 실행! (다시 destroy함수로!)

### destroy함수 (4~6줄)에서 하는 일

1. 매개변수 something 선언
2. 매개변수 something 할당 (vanilla coding 객체를 가리키는 참조값(주소값)) -> 이 부분에서 vanillacoding과 something의 값은 동일한 객체를 가리키는 참조값(주소값)
3. something = null에서 참조값을 가지고있는 변수 something에 null값 대입. (**객체를 null로 초기화시키는 것이 아님! 단순히 참조값을 가지고 있는 변수가 null이 되는 것.**)

### 마지막 console.log(vanillacoding)

1. vanillacoding 변수에 객체를 가리키는 참조값(주소값)은 그대로 있고 그 메모리 주소에 있는 객체는 바뀐게 없으므로 처음과 선언과 같은 객체 출력!

만약 이해가 잘 안되고 그림과 함께 보려면 `Prep 다시보기` 참조!

## string에 있는 \n을 html에 적용시키려면?

<pre> 태그나 <code> 태그 사용.

## Q. this를 다른함수에 매개변수로 넘겨주는건?

매개변수는 매개변수.

this를 함수에 매개변수로 넘겨주면 그냥 그 현재 this객체가 넘어가는 것.

넘겨받는 함수 입장에서는 그냥 매개변수를 받은 것 뿐.

넘겨주는 함수 즉, 함수를 실행시킬 때의 this는 이 this가 실행되었을 때 상황을 봐야됨!

## Q. 구글링 팁?

문장으로 검색하면 원하는게 안나올 때가 있다.

키워드로 검색하는게 효과적.

> 켄님은 찾는 내용의 키워드만 몇개 넣는다고 하심.키워드는 명사나 동사!하지만, 키워드로 검색 했을 때 결과가 너무 General하다면, 디테일한 요소를 추가해준다. (반복)

## Q. 비구조화 할당?

비구조화 할당은 값을 꺼내쓴다. 이렇게 이해하는게 맞다.

배열에 있는 요소를 쉽게 꺼내쓰고,

객체에 있는 요소를 쉽게 꺼내쓴다라고 생각하면 된다.

```
const someList = [1, 2, 3];
// 배열 비구조화 할당
const [some1, some2, some3] = someList;

const sum = some1 + some2 + some3;

// 아래와 같이 되지만 쓰지는 않는다.
const [ , two] = someList;
const two = someList[1]; // 권장.
```

```
const someObject = {
  prop1: 1,
  prop2: 2,
  prop3: 3
}

// 객체 비구조화 할당
const {prop1, prop2, prop3} = someObject;

const sum = prop1 + prop2 + prop3;
```

## Q. return 값 없는 함수?

return 값이 없는 함수에서 return을 적는건 일반적이지 않다.

```
function someFunction() {
  // 만약 반환할 리턴값이 없다면, return문은 적지 않는 것이 좋다.
  // return
}
```

**하지만 return 값이 없어도 return을 하는 경우가 있는데** 아래와 같다.

```
function someFunction2 (someArg) {
  if (someArg) {
    console.log(1);
  } else {
    alert(2);
  }
}
```

위의 상황을 아래와 같이 쓸 수 있다.

```
function someFunction2 (someArg) {
  if (someArg) {
    console.log(1);
    return; // early termination
  } 
  
  alert(2);
}
```

이 것이 **early return(termination)**

**이렇게 코드를 사용하면 가독성이 좋아진다. (들여쓰기 하나 앞당기는 것)**

하지만 그렇다고 한 함수에 너무 많은 early return을 쓰지는 말자. 가독성을 오히려 헤치는 결과가 나올 수 있다.

### return console.log(1)?

이렇게 하면, console.log(1)의 결과값이 return 된다.

## Q. 객체가 매개변수로 전달되면?

객체 자체가 전달되기보다 그 객체가 있는 참조값(주소값)이 전달된다.

## Q. 객체는 항상 함수에 의해서만 생성?

내부적으로는 그렇게 동작한다고 생각하면 된다. (객체 리터럴을 포함)

하지만 디테일하게 기술적으로 따져보면 그렇지는 않다.

## ETC

- 다음과제 (4번째 과제)는 6주차 과제!
  - 먼저 도전해도 되지만 천천히 해도 상관없다!
  - 6주차 과제에 this가 쓰여있다고 한다. 어렵다면 당연한 것! 겁먹지 말고 잘 헤쳐나가보자!
- this를 좋아하시는 켄님. 이유가 좀...
- 수요일에 this관련 질문 받으니 정리해오자.
- 이번주 금요일은 질문 답변과 break주 활용법에 대한 이야기가 있을 예정.