---
title: 'Vanilla Coding 부트캠프 지원'
draft: false
date: '2020-11-09 13:06'
path: '/vanillacoding/bootcamp/apply'
category: 'vanilla coding'
tags: ['vanilla coding', 'bootcamp', 'daily']
---

오늘 Prep 6주차 시작일자로 모든 Prep 과제를 완료하고 Vanilla Coding Bootcamp 9기 지원을 완료하였다.

Bootcamp를 지원한 자세한 이유는 아래에 있지만 그동안 Prep 5주차까지 진행을 하면서, Bootcamp에 대한 확신이 들었고 지금 함께하고있는 Prep인원들 또한 열심히 하는 모습이 Bootcamp9기에서도 지속될 것 같았다.

BAT (Bootcamp Addmission Test)가 조금 걱정되긴하지만, 켄님이 Prep과제를 무리없이 완료했다면 통과할 수 있다고해서 바로 신청.

사실, Prep인원들과 비슷하게 Bootcamp를 지원하고 같이 등록하려고 했는데,
미리 등록하고 준비를 하는것이 필요해보였다. (지금 회사 퇴사도 해야되고... 그동안 생활할 자금도 마련해야되고...)

괜히 나때문에 Prep9기 인원들이 무리할까봐 걱정이다. (오지랖)

어쨌거나 저쨌거나, BAT 통과후에 Bootcamp를 등록 땅땅 결정한다음에 마음편하게 준비하고 앞으로를 계획하고 싶다.

아래는 내가 부트캠프 신청을 하면서 세부내용에 대한 질의 응답내용이다.
이러한 질의응답에 대한 내용이 앞으로 필요하지않을까? 해서 기록해놓았다.

## 부트캠프 신청서 세부내용 작성

### Q. 자바스크립트의 프로토타입 기반 상속에 대해 최대한 자세히 설명해주세요.

자바스크립트는 타 객체지향 언어들과 달리 프로토타입의 개념을 기반으로 객체지향프로그래밍을 할 수 있습니다.
프로토타입 개념이란, 객체를 생성하는 생성자 함수를 설계할 때, 해당 인스턴스에만 적용되는 필드, 메서드가 아닌 생성자함수를 통해서 생성되는 모든 인스턴스들에게 공통되는 필드, 메서드를 적용시키고 싶을때 사용합니다. 함수선언과 동시에 생성되는 프로토타입이라는 객체에 공통되는 필드, 메서드를 할당함으로써 생성자 함수를 통해 생성되는 모든 인스턴스들에게 공통 필드, 메서드를 적용 및 사용 할 수 있습니다.

자바스크립트는 이러한 프로토타입의 개념을 기반으로 상속또한 가능합니다. 프로토타입개념에서의 상속은 일반적으로 상속이라는 개념을 적용시키지만, 엄밀히 말하면 확장에 가깝습니다.
자바스크립트에서 상속을 하는 방법은

1. 현재 생성자함수(자식)에서의 생성자 함수 내부에서 인스턴스인 this를 상속 받고자 하는 객체(부모)의 생성자함수에 바인딩시켜 실행함으로써 현재 인스턴스(자식)에 상속받고자하는 객체(부모)의 생성자 함수 내부의 필드와 메서드를 확장시키고,
2. 현재 객체(자식)생성자 함수의 프로토타입에 상속받고자하는 객체(부모) 생성자 함수의 프로토타입을 프로토타입 체인으로 연결시키면 됩니다.

코드로 나타내자면(일반적인 방법)

```js
function BootCamp(location, teacher) {
  this.location = location
  this.teacher = teacher
}

BootCamp.prototype.teach = function() {
  console.log(`${this.teacher} teachs in ${this.location}`)
}

BootCamp.prototype.isGood = function() {
  console.log("i don't know")
}

function VanillaCoding(course, ...rest) {
  // 1. 부모 생성자 함수에 현재 인스턴스 바인딩시켜 확장.
  BootCamp.apply(this, rest)
  this.course = course
}

// 2. 자식 프로토타입에 부모 프로토타입 체이닝
VanillaCoding.prototype = Object.create(BootCamp.prototype)
VanillaCoding.prototype.constructor = VanillaCoding

// 2번 이후로 프로토타입 필드, 메서드 할당
VanillaCoding.prototype.isGood = function() {
  console.log('yes, vanilla coding is good')
}

// 실행
const prep = new VanillaCoding('prep9기', 'Samsungdong Seoul', 'Ken')
prep.teach() // 프로토타입 체인으로 부모의 teach 사용
prep.isGood() // 자식 프로토타입의 isGood 사용
```

다음과 같습니다.

### 본인에 대한 소개

안녕하세요 웹 프론트앤드 개발자를 꿈꾸는 타고난 대기만성 성장러 최하영이라고 합니다.
저는 컴퓨터공학 전공자로써 기초 CS지식을 습득하였으며 앱, 웹, pc, 서버 등 다양한 어플리케이션 개발을 경험해보았습니다.
그 중 금융권 B2B OCR 솔루션 기업에 취직하여 약 3년의 윈도우 환경의 pc 어플리케이션 개발자로의 경력을 쌓았습니다.

하지만 특정 기업만 사용하는 B2B 시장과 사용자의 풀이 좁은 윈도우 pc 어플리케이션 개발은 저에게 있어 크게 보람있는일이 아니었고,
많은 사용자에게 다양한 서비스를 제공해줄 수 있고 빠른속도로 발전해가는 웹 개발이 저의 눈길을 끌었습니다.
독학으로 웹 개발 공부 중 웹 개발 문화와 환경을 접하면서 더더욱 웹 개발자로의 꿈을 꾸게 되었고,
그 중 사용자와 밀접하게 맞닿아 있고, 서비스 결과물을 외적으로 보여 줄 수 있는 프론트엔드에 이전부터 깊은 관심을 가지고 계속 공부를 해왔습니다.

사용자가 좋은 사용자 경험을 느끼는 프로그램을 만들기를 기원하며 프론트엔드 더 나아가 백엔드를 아우르는 웹 풀스택 개발자를 목표로 하고 있습니다. 학부시절의 창업 경험과 취직 후 여러 금융권 프로젝트, 솔루션 엔진 유지보수, R&D 프로젝트의 경험을 기반으로 성공적인 웹 프론트앤드 개발자로 전환, 도약하고 싶습니다.

부트캠프를 임하는 저의 각오로는 저는 대충하지않는 성격입니다. 거기에 더해서 저는 목표설정이 명확하기때문에 이제 뒤가 없습니다. 부트캠프동안 대충하지않고 성실히 임하여서 완벽하진 않더라도 완벽에 가깝게 부트캠프 커리큘럼을 모두 학습하겠습니다.

### 현재까지 프로그래밍을 공부했던 방법이나 수강했던 수업

제가 프로그래밍을 공부했던 방법은 강의를 통해 이론 습득 후에 과제로 결과물을 만들어보고 수료등의 학습목표가 있는 방법을 선호하는 편입니다.
학부시절부터 항상 CS지식이나 언어 등을 배우고 난 뒤에 과제로 더 깊게 이해하고 공부할 수 있었기 때문에
취업 후에 독학을 할 때에도 항상 인터넷강의에서 배우는 내용 외에 과제나 도전과제, 수료조건 등이 있는 강의를 위주로 들어왔습니다.
본격적으로 웹개발 공부를 시작하기 전까지는 현재 업무능력과 개발자 역량을 상승시킬 수 있는 강의를 듣고
웹개발 공부를 시작한 이후로는 프론트엔드, 백엔드 모두 다양하게 들어왔습니다.

과제, 수료조건이 있었던 강의 수강은 다음과 같습니다.

1. 포큐아카데미
   - Comp 3200 (C++, 언매니지드, OOP)
   - Comp 1000 (소프트웨어 공학용 수학)
2. 노마드코더

   - 코코아 클론 2주 완성반 (HTML, CSS)
   - 바닐라JS 2주 완성반 (JavaScript)
   - 유튜브 클론 2주 완성반 (ES6, NodeJS, Express, Pug, MongoDB)
   - 리액트 JS 2주 완성반 (React)
   - 파이썬 2주 완성반 (Python, bs4, selenium, flask)

3. 패스트캠퍼스
   - 바이트디그리 : Python & Django Essential
   - 바이트디그리 : React Programming

위 수강 강의 모두 수료완료하였습니다.

### 바닐라코딩을 선택한 이유

바닐라 코딩을 선택한 이유는 다음과 같습니다.

1. 웹 개발자 도약 본격 준비
   - 저는 현재 개발 경력(3년)에 맞는 정도는 아니더라도 빠르게 그에 상응하는 정도의 웹개발 실력을 바랍니다.
     이로인해 독학으로써는 무리가 있다고 판단하였고 수준높은 강의와 수준높은 과제가 있는 곳을 원했습니다.
2. 웹 개발 환경 적응
   - 기업문화는 각 기업마다 다 다르겠지만, 부트캠프를 통해 우선적으로 웹개발의 개발 환경, 개발 방식 등에 대해서 빠르게 적응하고 싶었습니다.
3. 선별된 수강생들과 함께 학습
   - 부트캠프의 인원 선별에 있어서 실력외에 Cultural fit을 본다는 점이 좋았습니다.
     부트캠프를 진행하면서 열심히 하고자 하는 좋은사람들과 같이 학습할수있다는 기대감이 있고
     서로 좋은 영향을 주고받아 부트캠프 이후에도 좋은 인연으로 함께 남고싶습니다.
4. 검증된 인재
   - 선별조건, 수료조건이 까다로우면서 현재 기업들의 원하는 니즈에 맞게 수업을 진행하는 바닐라코딩 부트캠프를 거치면 기업 입장에서 볼때 실력적으로나 성격적으로나 어느정도 검증된 인재라는점을 보다 쉽게 증명할 수 있을 것 같았습니다.
     또한 저 자신의 앞으로의 웹개발 경력에 있어서 바닐라코딩 수료라는 프라이드를 계속해서 가져가고 싶습니다.
5. 웹개발 네트워크
   - 개발자 생활을 하면서 개발자 네트워크가 무시하지못할 상당히 중요한 부분이라는 것을 깨달았습니다.
     웹개발에 대한 인적 네트워크가 전무한 저의 입장에서 바닐라코딩 수료후의 네트워크는 앞으로 웹개발자로의 행보에 있어 크게 도움이 될 것 같습니다.
     일반적인 네트워크가 아닌 소수 정예로 운영된다는 점과 부트캠프라는 공동체 의식이 있기 때문에 더 단단한 네트워크일 것 같으며 수료 후에도 네트워크에 도움이되고 자주 커뮤니케이션 하는 훌륭한 구성원이 되고 싶습니다.
