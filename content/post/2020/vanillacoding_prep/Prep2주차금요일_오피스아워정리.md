---
title: "Prep 2주차 금요일 오피스아워 정리"
draft: false
date: "2020-10-16 21:14:00"
path: "/vanillacoding/prep/week2_op3"
category: "vanilla coding"
---

## Q. DOM 실습 좀더 하고싶을땐?

Prep 과제로 충분하지만 더 하고싶다면,

인터넷에 javascript mini project 검색.

아니면, 스스로 아이디어를 내서 만들어보자.



## querySelector vs getElementById

DOM에있는 요소를 선택하는 여러 방법들 중에서 (querySelector, getElementById, getElementsByClassName...) 어느것이 더 효율적일까?



결론은 본인이 쓰기에 편한걸로.

켄님은 querySelector 추천. (범용적으로 사용가능한 것 같음)

기능적인 차이는 95%가 같으나 5%정도 미세하게 다른데,
아직 이 차이에 대해서 깊은 관심은 없어도 된다.

하지만, 사용에 있어서 일관성이 있으면 좋겠다.
querySelector만 쓰거나...
getElementById와 같은 것들만 쓰거나...



querySelector와 getElementById의 5%가 다른 차이점은 한번 찾아보자.



## 과제 게임 재시작시에 생길 수 있는 버그? restart button?

start Button이나 restart Button 눌렀을 때 작동이 2번, 혹은 그 이상 되는 경우? 

이 부분은 **addEventListener, removeEventListener**와 관련이 있다. 

이벤트 실행구문이나 로직중에서 만약, addEventListener가 있다면 removeEventListener도 같이 이루어져야 된다.

로직에 의해서 addEventListener로 여러번 등록되면 여러번 등록된 만큼 실행이 된다.

```js
function doSomething() {
  startButton.addEventListener("click", function() {
  // ToDo...
	});
}

doSomething(); // 이벤트 한번 등록
doSomething(); // 이벤트 두번 등록
// 따라서 startButton click시에 위 event 함수가 2번 실행된다.
```

그래서 한번만 addEventListener가 이루어지도록 하거나, 로직상에 addEventListener가 반복된다면 removeEventListener도 동시에 이루어져야 된다.

그래서 추후에 이벤트함수가 여러번 실행되는 것 같다면 addEventListener가 여러번 이루어지고 있지는 않은지 확인을 해보자.

```js
function doSomething() {
  function startBtnClickHandler() {
    // ToDo...
  }
  startButton.addEventListener("click", startBtnClickHandler);
  // 이렇게 해도 똑같다.
  // doSomething함수가 실행될때마다 startBtnClickHandler가 함수선언(생성)되고 등록되기 때문. replace되지 않는다.
}

doSomething();
doSomething();
```

하지만, 한 요소의 같은 이벤트에 여러개의 함수를 등록하는 것 보다 하나의 이벤트 함수에 다른 함수들을 사용하도록 하는것이 훨씬 바람직하다.(어쩔 수 없는 상황 제외)

**여러번 등록하게 된다면,  브라우저에 일이 추가가 되는 개념(이벤트 대기, 감지)이라 브라우저 효율이나 성능이 떨어질 수 있다.**



## Tic Tac Toe 개발시 TIP. 네모판(cell) 클릭시 X, O 쓰는법? 중복 기입 회피방법?

3*3 board로 markup 되었다고 가정.

```js
var boardElement = document.querySelector(".board");

boardElement.addEventListener("click", function() {
  // ToDo 
  // 전체 보드(Cell 상위 Element)하나에만 addEventListener해줘도 각 Cell Element에 대해 클릭이벤트가 가능하다.
  // 이전시간에 배웠던 target / currentTarget
});
```



```js
var boardElement = document.querySelector(".board");
var isXPlaying = true; // 차례. true: X, false: O

boardElement.addEventListener("click", function () {
  if (isXPlaying) {
    // 눌러진 cell에 X라고 변경
  } else {
    // 눌러진 cell에 O라고 변경
  }
});
```

현재 눌러진 cell을 어떻게 알 수 있을까?

그것이 바로 저번시간에 배웠던 event.target

```js
var boardElement = document.querySelector(".board");
var isXPlaying = true;

boardElement.addEventListener("click", function (e) {
  // e.target <-> e.currentTarget
  var targetElement = e.target;
  if (isXPlaying) {
    // 눌러진 cell에 X라고 변경
    targetElement.textContent = "X";
  } else {
    // 눌러진 cell에 O라고 변경
    targetElement.textContent = "O";
  }
  isXPlaying = !isXPlaying // 다음과 같이 toggle시켜 플레이어 순서를 바꿔준다.
})
```

일단, X / O 반복해서 기입하는건 완성.

그럼 중복기입 회피는 어떻게 할 수 있을까?

 -> e.target의 값이 비어있는 경우에만 쓰고 값이 있다면 무시하면 된다.

```js
if (targetElement.textContent === ""){
  if (isXPlaying) {
    // 눌러진 cell에 X라고 변경
    targetElement.textContent = "X";
  } else {
    // 눌러진 cell에 O라고 변경
    targetElement.textContent = "O";
  }
}
```

다음과 같이 처리도 가능하겠다.



## Q. 이벤트 추가 말고도 브라우저에 부담을 주는 것들?

브라우저가 해야하는 일이 많아지면 부담이 늘어난다고 보면 된다.

- 이벤트 추가
- DOM 조작
- setTimeout, setInterval 함수
- 등등...



## Q. innerHTML과 textContent 차이?

두가지의 기능이 완전 다르다.

innerHTML은 element의 내부 html을 설정, 변경하는 것!

```js
someElement.innerHTML = "<img src='...' alt=''/>"
```

와 같이 HTML을 수정할 수 있다.

> 이전에 someElement 내부에 들어있던 기존 html 값들은 다 없어진다.



textContent는 element의 text값만 설정, 변경하는 것!



#### innerText VS textContent

innerText보다는 textContent가 더 권장된다.

왜 권장되는지는 찾아보자.



#### innerHTML과 createElement - appendChild 다른점?

innerHTML은 우리가 HTML 파일을 생성(Marup)할때처럼 문자열처럼 값을 넣을 수 있다면,

createElement - appendChild는 각 요소를 프로그래밍적으로 만들어서 넣는다고 보면된다.

상황에 맞게 쓰면 된다. 후자는 요소를 여러개 추가해야되는 상황이면 일일이 만들어서 넣어줘야 된다.

둘 다 상황에 맞게 잘 쓰면 된다.