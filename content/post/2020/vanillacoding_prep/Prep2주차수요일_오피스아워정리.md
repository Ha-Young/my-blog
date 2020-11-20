---
title: "Prep 2주차 월요일 오피스아워 정리"
draft: false
date: "2020-10-12 21:05:00"
path: "/vanillacoding/prep/week2_op1"
category: "vanilla coding"
---

## 코드리뷰 요청시

과제 하고 난 후에 꼭 merge request 해주세요. (매주 금 저녁 7시까지)

prep가이드 > 과제제출방법 참조.

> 금 저녁 7시이후에 merge request시에는 코드리뷰를 못 받을수도 있음.



Merge request는 켄님이 알아서 닫음.

닫힌 것도 볼 수 있다. Closed 탭.



## 코드리뷰 질문

- merge request시에 질문 작성
- 질문 부분에 주석으로 질문 작성



## 벡틱?

` 기호를 가리키는 말.
`` 으로 만든 문자열은 string template라고 안에 변수를 넣을 수 있다.

```js
var a = `hellow ${something} world`
```



## substr()

String.substr()은 이제 지원 X. 사용하면 안된다.

substring() 또는 slice()를 사용해야 한다.



## 이번주 과제

#### Tick Tack Toe 게임 구현하기

Prep 가이드 > 과제 관련 안내 란에 오픈.

Git lab으로 오픈 될 예정.



README.md를 읽으면서 과제를 파악하자.

앞으로 모든 과제는 README.md에 상세히 적혀있음.

> npm install 등등의 과제 진행 순서도 포함.



구현해야 될 기능은 README.md의 ToDo를 참조.



<u>구글에서 [Tick Tack Toe(틱택토)]("[https://www.google.com/search?newwindow=1&hl=ko&source=hp&ei=TjGEX-jMJ56Fr7wPzfWX4AE&q=%ED%8B%B1%ED%83%9D%ED%86%A0&oq=%ED%8B%B1%ED%83%9D%ED%86%A0&gs_lcp=CgZwc3ktYWIQAzICCAAyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADICCAA6CAgAELEDEIMBOgQIABADOgUIABCxA1DAh2BYq5RgYM2VYGgBcAB4AYAB0gGIAbUJkgEFMC44LjGYAQCgAQGqAQdnd3Mtd2l6sAEA&sclient=psy-ab&ved=0ahUKEwjoq_nK7a7sAhWewosBHc36BRwQ4dUDCAc&uact=5](https://www.google.com/search?newwindow=1&hl=ko&source=hp&ei=TjGEX-jMJ56Fr7wPzfWX4AE&q=틱택토&oq=틱택토&gs_lcp=CgZwc3ktYWIQAzICCAAyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADICCAA6CAgAELEDEIMBOgQIABADOgUIABCxA1DAh2BYq5RgYM2VYGgBcAB4AYAB0gGIAbUJkgEFMC44LjGYAQCgAQGqAQdnd3Mtd2l6sAEA&sclient=psy-ab&ved=0ahUKEwjoq_nK7a7sAhWewosBHc36BRwQ4dUDCAc&uact=5)") 검색하시면 브라우저에서 간단히 해보실 수 있습니다.</u>



1. git clone
2. cd tick-tack-toe
3. npm install
4. code . 혹은 vscode로 오픈
5. git checkout -b '이름'
   - 모든 과제마다 브랜치를 따야된다.
6. npm start
7. http://localhost:port 로 확인 가능
8. 개발...
9. 종료시 ctrl + c 



index.html, index.js를 이용해 작업해보자.



**과제 할 때 기능 추가나 수정사항이 있을 때 바로바로 commit 하고 메세지를 잘 남기자.**  
 -> 작업 이력관리에 도움이 되고 리뷰받을 때 리뷰어 분이 나의 작업 프로세스를 확인 할 수 있기때문에 리뷰를 더 잘 받을 수 있다.



## Q. MR 여는건 언제?

과제 처음부터 MR(merge request)를 열기보다는, 나중에 열자. 하지만, **금요일 저녁 7시 전에 작업이 완료되지 않았더라도 금요일 저녁 7시 전에는 꼭 열어두자.**



## Q. 브랜치 이름 중복?

이전 과제와는 상관 없다.

하지만, 다른사람들과 중복되지 않게 이름으로 하는 것이 좋다.



## 이번주 과제 핵심 주제 (주의깊게 봐야 될)

이번주 내용이 많을 수 있으므로 미리미리 강의 시청을 해두자.



DOM 보다는 Scope & Hoisting이 더 우선순위!



DOM에서는 요소 선택하는 방법들 이벤트들 슥 훑어보는 느낌으로.



Scope & Hoisting은 꼼꼼히 보고 이해하자. 
이해가 부족하면 인터넷 꼭 찾아보자.



## Q. 0 == null, 0 == undefined 가 false?

```js
true 
1 == "1"; // true 
0 == false; // true 
0 == null; // false 
0 == undefined; // false 
0 == !!null; // true, look at Logical NOT operator 
0 == !!undefined; // true, look at Logical NOT operator 
null == undefined; // true
```

0 == false는 결과가 true인데,

0 == null,
0 == undefined
는 false이다. 왜 그런걸까?



저 상황에서는 == 연산자로 **type coercion**이 발생했기 때문인데,
왜 type coercion이 발생하는지에 대해서는 알 필요가 없다.

그리고 **== 비교는 쓰지 않는것이 좋다.** - 일반적인 js convention이 아니다.

**javascript에서 비교는 무조건 === 3개로!**



## Q. !!의 의미?

!는 not 연산자. not은 반대 Boolean으로 바꾼다.

그리고 모든 값에 대하여 Boolean 형으로 바꾸는데,

```js
var value = "hello world";
var bolVal = !value // false
var bolVal2 = !!value // true
```

이러한 특성 때문에,

!!연산자로 해당 변수값을 boolean형으로 바꾸는데 쓰기도 한다.
-> 사실 이상황 아니면 잘 쓰지 않는다.



현업에서는 Boolean(피연산자) 와 !! 비슷하게 쓰이는 것 같고, 회사 convention에 따르면 된다. 없으면 본인이 편한대로.



## Q. currenttarget <-> target

수요일 오피스아워에서 얘기 할 것.

강의 들을 때, 공부할 때 자세히 살펴보자.



## Q. 파일 마지막에 \n 개행문자?

스스로 올린 과제가 잘 올라갔는지 확인하자.

깃 저장소(깃랩)에 보면 No newline at end of file이라는 메세지가 있을 수 있는데,

이 부분은 Git에서 알려주는 메세지.

**Git은 모든 파일에 마지막에 빈 줄이 필요**하다.
Git이 파일 구분할 때 필요하다고 함.

개행문자라기보다 그냥 enter로 빈 줄 하나 만들어주면 된다.

더 자세한 내용은 구글링해보자.



## Q. 객체 property? key?

부르기에 차이. 부르는 사람 마음.

property, 속성, key .. 상관없음.



## ETC

> - 캔님 애플 16인치 쓰신다고하네요. (부럽...)
> - 캔님 수염은 가끔씩 민다고하시네요.
> - 블로그 리뷰는 Slack 9기방에 적어두면 한번 봐주신다고 합니다.
> - 부트캠프 테스트는 12월 둘째주에 봐도 되지만,
>   신청은 그전에 미리미리 해둬야 된다고 하네요.