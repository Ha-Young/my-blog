# Prep 4주차 금요일 오피스아워 정리

## Q. 콜백함수에서의 this는 일반함수로 실행되는거?

함수마다 다르다.



setTimeout 혹은 addEventListener로 넘어가는 this는 작동이 다른데,



- setTimeout의 callbackFunction는 일반함수와 같이 실행 그래서 일반함수와 똑같이 this 적용
- addEventListener는 currentTarget.
  - addEventListener에 this는 쓰지 말자.  eventListener 함수에서 this는 잘 쓰지 않는다.



## Stack overflow에서 글을 읽을 때

Stack overflow에서 질문내용, 답변내용을 꼼꼼히 읽어서, 나의 상황과 유사한지 확인해보자.

답변을 맹신하거나 무작정 따라하지말고 mdn과 비교하는 등의 검증절차를 거치자.

이러한 습관을 잘 들여놓자.



## Q. 변수에 setInterval?

```js
const timer = setInterval(someFunc, 1000);

console.log(timer) // 결과 1?
```

이 부분은 MDN setInterval 공식문서를 확인해보자.

setTimeout, setInterval의 리턴값을 알아두자!



## Q. 전역으로 선언한 모든 변수는 전역객체의 key값?

모든 변수가 그렇지는 않다.

let, const 는 전역객체의 key값(속성)으로 들어가지 않는다.

**var로 선언한 변수만 해당**



## Q. 그럼 const, let은 전역변수로 선언 불가능?

가능하다. const, let은 전역변수 (global)로 선언가능하지만, 전역객체의 키값(속성)으로 들어가지는 않는 것.



## Q. 6주차 과제 수정가능한 부분?

ReadME.md에 명시되어있는 부분만 수정가능!

advanced의 event처리는 Canola 내부를 조금 만져야 된다.

- 요구사항 1 - 명시되어 있음
- 요구사항 2 - CanolaUI 컴포넌트 수정 X
- Advanced - 정답은 없다. CanolaUI 내부 수정 가능



## Q. 디버거가 제대로 작동안할때?

스크린 녹화해서 켄님에게 Slack DM하기!



## Break 기간에는?

Break 기간의 목적은 이전 학습에 대한 Review 목적!

- **본인 페이스에 맞추는것이 제일 좋다!**
  - 이해 안되는 내용 다시 확인
  - 다른 사람들의 과제페이스에 신경쓰지말자!!!
- 부트캠프 어드미션 테스트는 가능하면 빨리보면 좋기는 좋다.
- 테스트는 걱정하지말자. 마지막 과제까지 큰 문제없이 이해없이 했다면!
- 단기적인 목표로 계획을 잘 세우자!
  - 멀리보지말자!
  - 요일별로 무엇을 할 것인지.



## Q. 함수 선언식의 함수 이름과 변수이름이 중복되도 괜찮을까?

```js
function vanillaCoding() {
    // ToDo
}

var vanillaCoding = null;
```

식별자가 override하는 경우가 있을수도 있기 때문에 **하지말아야 한다**!

함수 선언식에서의 함수명도 변수 쓰듯이 쓸 수 있기 때문!



## Q. 콘솔창에 생성자 함수로 인스턴스 만들었을 때?

생성자 함수명 {} 라고 뜨는데, 이는 특별한 의미는 없고 만든사람이 친절하게 알려주려고 만든 목적이다.



## Q. 객체의 key값으로 [] index 가능?

```js
var age = 30;

const person1 = {
    age: 20,
    logAge: function () {
        console.log(this.age);
    }
};

const people = [ person1 ];

const employees = {
    list: people
};

employees.list[0].logAge();
```

객체의 key값으로 가져오는 value가 배열이라면 가능하다.

`employees.list` 의 value가 `people`인 배열이므로 가능.



## Q. 지금 배우는 것 이상의 심화된 원리는 이해가 안되는데?

지금 이해가 안된다면, 나중에 다시 찾아봐도 된다. 다시 찾아보면 이해가 될 수도 있다.

지금의 아는 것 보다 나중에 아는 것이 많아지면서 이해나 습득이 잘되고 빨라진다.

**가장 좋은건 반복이다. 반복 하자!**

남의 코드를 복붙하지말고 스스로 인내심을 가지고 개발하는 것이 중요.





## ETC

- 다음주 **break주에서는 오피스아워가 없습니다.**

  - 질문은 가능합니다.
  - 다음 강의 영상 올라옵니다. (Closure & Recursion)

- 사무실이 이사갈수도 있다!  삼성, 선릉, 역삼 근처!

  - 공유오피스는 아닙니다!

  





