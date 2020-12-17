---
title: "바닐라코딩 Prep 7주차 수요일 오피스아워 정리"
draft: false
date: "2020-11-18 21:20"
category: "vanilla coding"
---

## 클로저

**함수가 선언될 당시** 주변환경과 함께 갇히는 것

**실행되는 장소나 시점은 관계가 없다**.



### Quiz1.

```js
function say () {
    const a = 1;
    const b = 2;
    
    function log () {
        console.log(a + b);
    }
    
    return log;
}

const func = say();

func();
```

9 라인에서 함수(레퍼런스)가 리턴되고,

11라인에서

```js
function log() {
    console.log(a + b);
}
```

함수가 그냥 실행 될 것 같지만, **함수가 선언된 위치에서** 접근 할 수 있는 변수들이 정해지는 것이므로 상위 scope인 변수 a와 b를 사용할 수 있다. (const 이므로 block scope)

 

### Quiz2.

```js
function carrot () {
    const potatoCount = "jjajang";
    
    function potato () {
        console.log(food);
    }
    
    mushroom(potato);
}

function mushroom (fn) {
    fn();
}

carrot();
```

carrot와 mushroom함수가 선언되고, 맨 마지막줄의 carrot() 함수가 실행된다.

실행 되면서 food 변수와 potato() 함수가 선언 및 할당이 되고, mushroom 함수가 실행이 되면서 potato 함수가 인자로 넘어간다.

mushroom 내부에서 potato 함수가 실행되면서 potato 함수가 실행되는데, 여기서 food는 potato 함수가 선언되어있는 carrot 함수 내부의 변수와 클로저가 형성되어 사용 가능.



### Quiz3.

```js
function carrot () {
  let potatoCount = 0;

  function potato () {
    potatoCount++;
    console.log(potatoCount);
  }

  return potato;
}

const veggie = carrot();

veggie(); // 1
veggie(); // 2
veggie(); // 3
```

이 문제도 위와 마찬가지로 클로저가 형성이 되나, 클로저로 형성된 변수는 지속적으로 모니터링 한다고 보면 된다. 

**라이브 레퍼런스**라고 한다.



### Quiz4.

```js
function addCurry (x) {
    return function add (y) {
        return x + y;
    };
}
// addCurry는 함수를 선언해서(새로 만들어서) 리턴!

const addFive = addCurry(5);
const addTen = addCurry(10);
// addFive와 addTen은 다른 함수!
// 따라서 addFive와 addTen의 클로저는 다르다.
```

addFive와 addTen은 다른 메모리에 다른 참조값.



## Q. 화살표 함수의 this

화살표 함수의 this가 스코프체인상 가장 가까운 this에 접근하게 되는 것도 클로저랑 비슷한건가?

-> 맞다. 화살표함수는 내부에 this가 없기 때문에 클로저로 형성된 this가 사용되는 것.



## Q. 클로저 퀴즈 for문 i에 각각 다른함수가 담기나요?

맞다, 아래 표현과 같이 timer() 함수를 계속해서 새로 선언하고 setTimeout 함수로 실행시키는 것.

```js
for (var i =1; i < 6; i++) {
    setTimeout(function timer () {
        console.log(i);
    }, i * 1000);
}
//는 아래와 같다.
for (var i = 1; i < 6; i++) {
    function timer () {
        console.log(i);
    }
    setTimeout(timer, i * 1000);
}
```



퀴즈에 대해서 더 설명하자면,



var i는 현재 함수(global)스코프에 하나가 있다.

timer라는 함수가 다음과 같이 5개 생긴다. (실행은 아님)

timer1 (1초뒤 실행) 생성 - 클로저 형성(var i)
timer2 (2초뒤 실행) 생성 - 클로저 형성(var i) 
timer3 (3초뒤 실행) 생성 - 클로저 형성(var i)
timer4 (4초뒤 실행) 생성 - 클로저 형성(var i)
timer5 (5초뒤 실행) 생성 - 클로저 형성(var i)

> var i 이기 때문에 모두 같은 i를 바라봄.



이후, for문이 끝난다음에서야 setTimeout에 의해 timer 함수들이 실행된다.

그리고 timer 함수들이 실행되는 시점에서는 클로저로 형성된 var i 값이 6이되기 때문에(for문은 timer 함수들이 실행되기전에 완료되었기 때문)  모두 6이 찍힌다. 

> timer함수는 모두 같은 i를 바라보고 있기때문에.



## 재귀 함수

재귀 함수를 구현할때에는 반드시 Termination Case가 있어야 한다.

Termination Case가 없으면 재귀호출이 끊임없이 호출된다.

```js
function rabbits (n) {
    return rabbits(n - 1) + rabbits(n - 2);
}
// 끝이나지 않는다.
```

반드시 재귀함수가 끝나는 부분이 함수 내부에 있어야 한다.



### 실수하기 쉬운 부분

```js
function rabbits (n) {
    if (n === 0) {
        return 0;
    }
    
    if (n === 1) {
        return 1;
    }
    
    return rabbits(n + 1) + rabbits(n + 2);
}

rabbits(2);
```

와 같이 실행해보면, Termination Case에 걸리지 않는 경우



## Q. Life of Rabbit 예시가 Recursion의 대부분?

Life of Rabbit은 대부분의 Recursion에 적용시킬 수 있는것인가?

-> Life of Rabbit은 Fibonacci를 Recursion 표현이다. 다른 방식으로 된 Recursion이 많음.

또한 Fibonacci도 Recursion이 아닌 다른방법으로도 풀 수 있다.



## getElementsByClassName Recursion

```js
function getElementsByClassName (el, className) {
    const result = [];
    
    return result;
}
```

1. 우선, 깊은 생각 없이 로직을 쭉 나열해본다.

```js
function getElementsByClassName (el, className) {
    const result = [];
 	
    if (el.classList.contains(className)) {
        result.push(el);
    }
    
    for (let i = 0; i < el.children.length; i++) {
        const child = el.children[i];
        
        if (child.classList.contains(className)) {
            result.push(child);
        }
        
        for (let j = 0; j < child.children.length; j++) {
            const grandChild = child.children[j];
            
            if (grandChild.classList.contains(className)) {
                result.push(grandChild);
            }
            
            // 반복...
        }
    }
  
    return result;
}
```

2. 반복되는 내용이 보이면, 함수로 만든다.

3. 반복되면서 바뀌는 값은 매개변수로 받게 한다.



## Q. 재귀함수 반복되는 인자 네이밍 팁?

팁은 딱히 없고,  상황마다 다르기때문에 그때그때 코드리뷰 받으면서 익혀가보자.


## ETC

- 사무실 이사갑니다.
  - 역삼역 3번출구 위워크건물 뒤쪽
    - 스퀘어 736타워
- 켄님 홈페이지 고쳐주세요~!

