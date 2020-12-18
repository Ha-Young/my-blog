---
title: '하옹의 자바스크립트 식사 - Closure'
draft: false
date: '2020-12-16'
category: 'javascript'
tags: ['javascript', 'closure']
---\* 이 글은 [MDN](https://developer.mozilla.org/es/), [Vanilla Coding Prep 강의자료](https://www.vanillacoding.co/), [PoiemaWeb](https://poiemaweb.com/)등 공신력있는 곳들을 참조한 글입니다.

## Closure?

클로저(closure)는 내가 Javascript 주요 개념중에서 가장 이해하기 어려웠던 내용 일 것 같다.

간단한 예제는 이해하기 쉬웠지만, Curying과 Memoization 등 다양한 기법들이 첨가되면서 점점 더 복잡해지고 이해하기 어려웠다.

비록 정확한 내용은 아닐지도 모르나 내가 알고있는 지식과 공부한 지식을 나누어 함께 클로저라는 산을 넘어보자.

클로저는 MDN을 참조하자면

> 클로저는 함수와 그 함수가 선언됐을 때의 렉시컬 환경(Lexical environment)과의 조합이다.

라고 시작부터 적혀있다.

알고 보면 맞는말이고 이해가 가지만, 처음 들어서는 잘 모르겠다.

이해를 하고자 하니 함수가 선언되었을 때라고 했으므로 함수가 중요하다는 것과, 렉시컬 환경(Lexical environment)를 알아야 조금이나마 이해가 될 것같다는 느낌이 온다.

이처럼 클로저를 완전히 이해하기위해서는 사전지식이 몇가지가 필요한데,
이 사전지식들은 Javascript Execution Context를 이해하기 위한 발걸음이기도 하다.

> Javascript Excution Context를 알면 Closure 이해가 쉬운데 그만큼 연관되어있는 개념들이다.

## Closure를 이해하기위한 사전 지식

### 1. First class citizen (First class Obejct, Function)

### 2. Lexical Scoping (Environment)

Lexical Environment는 **Lexical Scope**에 따라 정해지는 **Context**를 의미한다.

### 3. 스코프 체인(유효범위체인)

### 4. Garbage Collector(가비지 콜렉터)

###
