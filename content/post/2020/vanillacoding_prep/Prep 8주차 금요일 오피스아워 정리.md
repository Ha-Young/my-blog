---
title: '바닐라코딩 Prep 8주차 금요일 오피스아워 정리'
draft: false
date: '2020-11-29 21:09'
category: 'vanilla coding'
tags: ['vanilla coding', 'prep']
---

## 이번주 과제 리뷰

### 어떤게 어려웠나요?

- 첫 시작
  - 뭘 어떻게 해야되는거지?
- 디버거 잘 안됨
- 작업 완료순서랑 다르게 tasks 순서대로 results에 저장
- tasks가 뭔지 몰라서 여러파일 왔다갔다하는 것
- finallCallback 호출하는 시점

### parallel 설명 (가장 간단하게 구현할 수 있는 방법)

**병렬적인** 비동기처리를 도와주는 Util함수

10초 걸리는 일을 10번해야된다고 하면 직렬처리를 하면 10 \* 10으로 100초를 소비하는 반면,

병렬로 처리하면 10번의 작업을 동시에 처리를 해서 10초만에 처리 할 수 있다.

- 첫번째 인자 : `tasks` 배열 (함수들이 담긴)
- 두번째 인자 : `finalCallback` 함수

`tasks` 배열에 담긴 함수들이 병렬적으로 실행되도록 해주고 마지막으로 `finalCallback` 함수를 실행하도록 해줘야 한다.

1. `tasks` 배열로 들어온 함수들을 병렬적으로 실행되도록 해줘야 한다.

```js
export default function parallel(tasks, finalCallback) {
  tasks[0]()
  tasks[1]()
  tasks[2]()
  tasks[3]()
}
```

와 같이 나열해보면 아래와 같이 표현할 수 있다.

```js
export default function parallel(tasks, finalCallback) {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i]
    task()
  }
}
```

2. 각 실행시킨 함수의 결과들을 배열에 각 순서대로 넣어줘야 한다.

   -> 각 함수에 매개변수로 받는 `callback`함수 : tasks에 담겨있는 비동기 작업을 하는 함수들의 인자값으로 주어지는데, 이는 비동기 작업을 하는 함수가 인자로 받아서 작업을 완료했을 때 호출하여 작업이 끝났다는 것을 알려주는 함수.

   즉, 이 `callback` 인자를 이용해야 한다.

```js
export default function parallel(tasks, finalCallback) {
  const results = []

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i]
    task(function taskDone(taskResult) {
      result[i] = taskResult
    })
  }
}
```

다음과 같은 함수를 통해 각 함수들이 끝나는 순서대로 `taskDone`이라는 함수가 실행된다. (이 `taskDone` 함수는 반복문이 돌 때마다 새로 생성되는 것 유의!)

3. `finalCallback`함수 사용은 끝나는 시점을 체크해서 사용.

   -> counting

```js
export default function parallel(tasks, finalCallback) {
  let const = 0
  const result = []

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i]
    task(function taskDone(taskResult) {
      count++

      result[i] = taskResult

      if (count === tasks.length) {
        finalCallback()
      }
    })
  }
}
```

4. **var** 로 변수 바꾸기

```js
export default function parallel(tasks, finalCallback) {
  var const = 0
  var result = []

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i]
    task(function taskDone(taskResult) {
      count++

      result[i] = taskResult

      if (count === tasks.length) {
        finalCallback()
      }
    })
  }
}
```

`taskDone`이 실행되는 시점이 비동기적으로 실행되므로, 끝났을 때 `var i` 로 선언된 i는 모든 `taskDone` 함수가 똑같은 i를 바라보게 되는 것.

그래서 `taskDone`함수들의 i값이 for문이 끝났을때인, `tasks.length - 1`로 다 나오는 것.

따라서, `taskDone` 함수가 실행되는 시점이 아닌 선언되는 시점에서의 i값을 보관해야 된다. 이럴 때 사용할 수 있는 것이 클로저 개념.

-> 따로 함수를 만들면 된다. (스코프와 클로저를 새롭게 구성)

```js
export default function parallel(tasks, finalCallback) {
  var const = 0;
  var result = [];

  // 다음과 같이 따로 함수를 만들어서 해결.
  function foo (j) {
    task(function taskDone (taskResult) {
      count++;

      result[j] = taskResult;

      if (count === tasks.length) {
        finalCallback();
      }
    });
  }

  for (var i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    foo(i);
    });
  }
}
```

함수를 만들면 함수 내에서 함수 스코프가 따로 생기고, 이것들이 클로저로 유지되기 때문에 해결되는 것!

> 옛날에 let이 없을 때에는 이처럼 해결하거나, 즉시실행함수와 같은 방법으로 해결을 했다

## 만약 코드보는게 힘들다면?

보기좋게 바꾸는 방법도 한 방법.

리터럴로 선언되어 인자값으로 넘겨지는 것들을 변수로 따로 선언하거나 함수 선언문으로 선언된 걸 따로 두는등의 방법.

```js
parallel(
  [
    function(callback) {
      // A
    },
    function(callback) {
      // B
    },
    function(callback) {
      // C
    },
  ],
  function(callback) {
    // finalCallback
  }
)
```

위 와 같이 실행되는 함수를 아래와 같이.

```js
function funcA(callback) {
  // A
}

function funcB(callback) {
  // B
}

function funcC(callback) {
  // C
}

const arr = [funcA, funcB, funcC]

function finalFunc() {
  // ToDo
}

parallel(arr, finalFunc)
```

물론, 이와 같이 풀어쓰고 **이해를 했다면 다시 원복**해야 한다.

## Q. parallel의 작업 순서대로 결과가 나와야 되는 경우가 어떤게 있나요? (parallel을 응용할 수 있는 것?)

- 이번 과제처럼 퀴즈 데이터를 받아오는 경우
- 쇼핑몰 데이터(도서)를 받아오는 경우
- 등등... 아주 많다.

## ETC

- 강의자료와 오피스아워, 깃랩 저장소 등이 만료기간이 있다.
  - 미리미리 정리하고 백업해두자.
  - 자세한 기간은 다음에 알려준다고 하심.
- 과제는 이제 끝!
- 다음주 Promise는 지금 당장 중요하다라는건 아니지만, Javascript 개발에 있어서 Promise는 필수불가결하므로 미리 봐두고 익혀나가자!
  - 부트캠프 참가자들은 더 잘 이해해야한다!
- Prep에서 좋은점, 개선해야될 점 생각해보자.
