---
title: "Prep 6주차 금요일 오피스아워 정리"
draft: false
date: "2020-11-13 21:52"
path: "/vanillacoding/prep/week6_op3"
category: "vanilla coding"
---



## 이번 과제 (Digital Clock)

이번 과제는 실제로 일 하는 것과 비슷하다.

ToDo List처럼 업무가 주어지고 스스로 학습하고 코드를 수정하고 MergeRequest하고 코드 리뷰를 받고등등...

과제 흐름을 잘 이해해보자!



### 켄님이 예시로 들어준 전반적인 이해 흐름 (ToDo 1번 해결 과정)

1. 첫 시작점 app.js를 보던 중 `const Clock`에 담기는 내용 확인하고자 함

2. `CanolaUI.create()` 메서드 확인

   - Canola의 index.js 파일로
   - index.js내부 export default 구문 발견 후 의미 대충 파악. 모르면 빠르게 기능 찾고 패스.

3. 다시 `CanolaUI.create()` 내부 `validateOptions()` 함수 확인

   - 유효성검사라서 우선순위가 높지않다고 판단하여 대충보고 skip

     > 분석이나 면접중에 자신의 현재 미션, 목표가 무엇인지 왜 이걸 보기시작했는지 계속 확인해야 한다. 
     > 지금 validateOptions()를 자세히 보지 않아도 된다고 판단.

4. `return`되는 `componentFactory()` 함수 확인 (Component.js로)

   - **이 함수의 리턴값이 맨처음 Clock 변수에** 담기는 것 확인.
   - 이 함수 리턴값이 무엇인지 확인. (`Component()` 함수 -> 대문자이므로 생성자 함수가 리턴일 것)
   - 그렇다면, Clock 변수에 `Component()` 생성자 함수가 담기는 것 확인.

5. `Component()` 생성자 함수 내부 대충 확인

   - 이 생성자 함수의 내부 및 프로토타입으로 만들어진 메서드 ( `render()`, `distroy()` ) 확인

6. 그리고 다시 app.js `CanolaUI.create()` 함수를 확인해보니, `template` 속성을 가지는객체를 인자로 전달.

   - 이 `template` 속성의 value인 **함수가 어떻게 작동하는지** 확인하고 싶음.

7. `CanolaUI.create()` 함수 내부로 들어가서 어떻게 작동하는지 확인하기보다는 밑에 `const myClock = new Clock()` 부분과 같이 실제로 쓰여지는 코드를 통해 위에서 넘겨준 `template`이 어떻게 작동하는지 확인하면 될 것 같음.

   - `new Clock()`의 인자로 넘겨주는 `options` 발견.

8. `new Clock()`에서 `Clock()`은  아까 확인했던 canolaUI의 `componentFactory`의 `Component()` 생성자 이므로 내부를 다시 자세히 확인.

   - 인자값으로 받는 `options` validation 하는 것 확인.

   - extend를 통해 options` 객체의 프로퍼티를 지금 인스턴스(this)의 프로퍼티로 확장시키는 것 확인.
   - 아래 코드들에서 인스턴스 (this)에 할당되는 프로퍼티들 확인.

9. 그렇게 `new Clock()` 즉, `Component()` 생성자 함수로 생성된 객체 확인.

   - 즉, 객체 인스턴스가 어떤 프로퍼티를 가지게 되는지, 넘겨주는 `options`객체가 어떻게 작용되는지 확인.

10. 다시 app.js에서 이 생성된 객체로 프로토타입의 `render()` 메서드를 쓰는 것 확인.

11. `render()` 메서드 내용 확인

    - 이 함수에서 아까 받았던 `template`가 사용된다는 것 확인
    - `template`을 통해서 html 코드를 만들고, DOM에 추가시키는 것 확인

12. 근데, 여기서 `const html = generateTemplate().trim()` 부분이 이상하다는 것을 확인

    - `template`으로 받았던 함수에 this에 값이 제대로 들어가지 않음. (일반함수로 실행되어 글로벌객체가 this)

13. **generateTemplate.call(this).trim() 으로 수정**



### 여기에서 꼭 알고 넘어갔으면 하는 것.

- 소스 파악 해보는 것
  - 어떻게 만들어졌는지.
  - 근데 너무 오래걸리면 안됨.
- 실제 코드에서 this 이해
  - 현업에서 코드가 많아지면 함수 호출문들이 여러가지가 엮인다.
    과제에서처럼 template로 들어온 함수에 쓰인 this문이 쓰이는 것을 확인해야 되는데, 이게 어디서 쓰이는지 쉽지않을 것.



### Advance를 해보라는 이유 (시도해보는 것도 중요)

- CanolaUI 내부를 더 이해해야됨.
- 단순히 시계만 만들면 되는데, 왜 CanolaUI를, CanolaUI 처럼 만들었는지?
  - 프레임워크 (React), 라이브러리 경험해보기
  - 확장성 고려, 유지보수성 고려 등등
- 내가 왜 이걸하는지, 내가 왜 이걸 이렇게 해야되는지, 이런방법이 좋을까 저런방법이 좋을까 등등 로직 설계 해보기



**단지 기능을 완료하는 것이 아니라 왜 내가 코드를 이렇게 짜고 어떻게 짜야 좋은지 생각해보는것이 중요!**



## Q. Underdash 과제 할 때 시간 재면서 해보는게 BAT(Bootcamp Admission Test)에 좋을까?

과제는 이해를 하고 능력을 발전시키는 것이기 때문에 시간에 집중하지 말자!

BAT는 시간 제한이 있다는걸 충분히 감안해서 평가한다.



## ETC

- 사무실 이사 할 것 같은 곳? 이 생겼다.
  - 역삼역 도보 1분? 정도
  - 결정은 아님
- 다음주 과제 양이 많다.
  - 미리미리 시작해보는걸 권장.
  - 거기에 나와있는 Tip은 꼭 해야되는 것이 아니라 말 그대로 tip이므로 꼭 그렇게 해야되는건 아님!



