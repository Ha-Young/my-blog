---
title: '[Javascript] 프로그래머스 - N으로 표현 Lv3 (DP)'
draft: false
date: 2021-02-28 17:40
category: 'algorithm'
tags: ['javascript', 'algorithm', 'dynamic programming', 'dp']
---

## 문제 설명

아래와 같이 5와 사칙연산만으로 12를 표현할 수 있습니다.

12 = 5 + 5 + (5 / 5) + (5 / 5)
12 = 55 / 5 + 5 / 5
12 = (55 + 5) / 5

5를 사용한 횟수는 각각 6,5,4 입니다. 그리고 이중 가장 작은 경우는 4입니다.
이처럼 숫자 N과 number가 주어질 때, N과 사칙연산만 사용해서 표현 할 수 있는 방법 중 N 사용횟수의 최솟값을 return 하도록 solution 함수를 작성하세요.

### 제한사항

- N은 1 이상 9 이하입니다.
- number는 1 이상 32,000 이하입니다.
- 수식에는 괄호와 사칙연산만 가능하며 나누기 연산에서 나머지는 무시합니다.
- 최솟값이 8보다 크면 -1을 return 합니다.

### 입출력 예

| N    | number | return |
| ---- | ------ | ------ |
| 5    | 12     | 4      |
| 2    | 11     | 3      |

### 입출력 예 설명

예제 #1
문제에 나온 예와 같습니다.

예제 #2
`11 = 22 / 2`와 같이 2를 3번만 사용하여 표현할 수 있습니다.

[출처](https://www.oi.edu.pl/old/php/show.php?ac=e181413&module=show&file=zadania/oi6/monocyfr)



## 나의 풀이

### 소스

```js
const calculateFuncs = [(a, b) => a + b, (a, b) => a * b, (a, b) => a - b, (a, b) => Math.floor(a / b)];

function getCalculationResults(nth, dp, N) {
    let nthResults = new Set();
    nthResults.add(Number(String(N).repeat(nth)));
    
    for (let i = 1; i < nth; i++) {
        for (const calculateFunc of calculateFuncs) {
            for (const item1 of dp[i].values()) {
                for (const item2 of dp[nth - i].values()) {
                    const result = calculateFunc(item1, item2);
                    nthResults.add(result);    
                }
            }
        }
    }
    
    return nthResults;
}

function solution(N, number) {
    if (N === number) {
        return 1;
    }
    
    const dp = [];
    dp[1] = new Set([N]);
    
    for (let i = 2; i <= 8; i++) {
        dp[i] = getCalculationResults(i, dp, N);
                
        if (dp[i].has(number)) {
            return i;
        }
    }
    
    return -1;
}
```

### 설명

dp는 메모이제이션을 사용하는 것.

그럼 어떤 것을 메모할 것이냐 가 중요할 것 같은데, 나는 N의 숫자를 몇번 사용해서 연산한 결과값들을 set으로 넣도록 설계하였다.

```js
if (N === number) {
  return 1;
}

const dp = [];
dp[1] = new Set([N]);

for (let i = 2; i <= 8; i++) {
  dp[i] = getCalculationResults();
  
  if (dp[i].has(number)) { // 현재 number값을 구했는지 체크 set을 통해 중복값을 제거 하면서 값 체크도 O(1)로 처리 할 수 있다.
    return i;
  }
}

return -1;
```

8번 이후의 결과는 -1로 리턴하라고 했으므로 위와같이 처리하면 되겠다.



이제 `getCalculationResults` 함수를 만들어야 되는데 우선 **핵심 아이디어**부터 살펴보자.

dp[2]의 결과는 N의 숫자를 2번 사용할 결과 set이므로,

dp[1] 과 dp[1]의 사칙연산 결과 +, -, *, / 를 넣어주면 된다.

```js
const dp[2] = new Set();

for (const number1 of dp[1].values()) {
  for (const number2 of dp[1].values()) {
    dp[2].add(number1 + number2);
    dp[2].add(number1 * number2);
    dp[2].add(number1 - number2);
    dp[2].add(number1 / number2);
  }
}
```

위와 같이 구할 수 있을 것이다.

그럼 dp[3]의 결과는?

```js
const dp[3] = new Set();

for (const number1 of dp[1].values()) {
  for (const number2 of dp[2].values()) {
    dp[3].add(number1 + number2);
    dp[3].add(number1 * number2);
    dp[3].add(number1 - number2);
    dp[3].add(number1 / number2);
  }
}

for (const number1 of dp[2].values()) {
  for (const number2 of dp[1].values()) {
    dp[3].add(number1 + number2);
    dp[3].add(number1 * number2);
    dp[3].add(number1 - number2);
    dp[3].add(number1 / number2);
  }
}
```

위와 같이 dp[3]의 결과는 dp[1]의 결과와 dp[2]의 결과에 대해 사칙연산 한 결과가 들어가고,

사칙연산의 -, /의 특성은 순서가 바뀌면 결과도 달라지기 때문에 반대의경우인 dp[2]와 dp[1]의 경우에 대해서도 구하였다.

이와 마찬가지로 계속해서 dp의 결과를 따져보면 다음과 같다.

> 사칙연산의 연산을 ⚙︎로 나타내도록 하겠다.
>
> ⚙︎ = +, *, -, /

- dp[1] = [N]
- dp[2] = dp[1] ⚙︎ dp[1]
- dp[3] = dp[1] ⚙︎ dp[2], dp[2] ⚙︎ dp[1]
- dp[4] = dp[1] ⚙︎ dp[3], dp[2] ⚙︎ dp[2], dp[3] ⚙︎ dp[1]
- dp[5] = dp[1] ⚙︎ dp[4], dp[2] ⚙︎ dp[3], dp[3] ⚙︎ dp[2], dp[4] ⚙︎ dp[1]
- dp[6] = dp[1] ⚙︎ dp[5], dp[2] ⚙︎ dp[4], dp[3] ⚙︎ dp[3], dp[4] ⚙︎ dp[2], dp[5] ⚙︎ do[1]
- dp[7] = dp[1] ⚙︎ dp[6], dp[2] ⚙︎ dp[5], dp[3] ⚙︎ dp[4], dp[4] ⚙︎ dp[3], dp[5] ⚙︎ do[2], dp[6] ⚙︎ do[1]
- dp[8] = dp[1] ⚙︎ dp[7], dp[2] ⚙︎ dp[6], dp[3] ⚙︎ dp[5], dp[4] ⚙︎ dp[5], dp[5] ⚙︎ do[3], dp[6] ⚙︎ do[2], dp[7] ⚙︎ do[1]



그리고 각각의 결과를 set에 넣어서 중복수를 제거하면 되는 것.

그리고 여기서 중요한 부분이 N의 숫자의 반복인 부분인데,

dp[2]에는 NN, dp[3]에는 NNN, dp[4]에는 NNNN과 같이 반복되는 수가 들어가줘야 한다.

이는 코드로

```js
const nthRepeatNumber = Number(String(N).repeat(nth));
dp[nth].add(nthRepeatNumber);

// dp[nth].add(Number(String(N).repeat(nth)));
```

로 표현 할 수 있고 이 `nthRepeatNumber`수를 dp[nth] set에 추가시켜 주면 된다.



그리고 위에서 나타낸 nth번째의 dp를 구하는 걸로 코드로 나타내면

```js
dp[nth] = new Set();

for (let i = 1; i < nth; i++) {
  dp[nth].add(dp[i] ⚙︎ dp[nth - i]);
}
```

로 간단하게 표현 할 수 있다.



그럼 이제 사칙연산에 대한 ⚙︎를 코드로 표현하자.

나는 4칙 연산에 대해 하나하나 코드로 표현하기 싫어서 다음과 같이 함수배열을 만들었다.

```js
const calculateFuncs = [(a, b) => a + b, (a, b) => a * b, (a, b) => a - b, (a, b) => a / b];
```

그럼 이제 이 `calculateFuncs`에 대해  순회하면 4칙연산 결과들을 구할 수 있다.



이 결과를 하나로 표현해보자면,

```js
dp[nth] = new Set();
dp[nth].add(Number(String(N).repeat(nth)));

for (let i = 1; i < nth; i++) {
  for (const calculateFunc of calculateFuncs) {
    for (const item1 of dp[i].values()) {
      for (const item2 of dp[nth - i].values()) {
        const result = calculateFunc(item1, item2);
        dp[nth].add(result);    
      }
    }
  }
}
```

for문이 엄청 중첩되었는데, 위의 과정을 여러개의 함수들로 잘게 나누어 표현하고 싶다면 더 간단해질수도 있겠다.

하지만 나는 이대로 쓰기로 결정.

이에 대한 코드를 하나의 함수 `getCalculationResults` 로 나타내면 맨 처음의 전체 코드와 같이 나오게 된다.

## 다른사람의 풀이

```js
function solution(N, number) {
    const cache = new Array(9).fill(0).map(el => new Set());
    for(let i=1; i<9; i++){
        cache[i].add('1'.repeat(i) * N);
        for (let j=1; j < i; j++) {
            for(const arg1 of cache[j]){
                for(const arg2 of cache[i-j]){
                    cache[i].add(arg1+arg2);
                    cache[i].add(arg1-arg2);
                    cache[i].add(arg1*arg2);
                    cache[i].add(arg1/arg2>>0);
                }
            }
        }
        if(cache[i].has(number)) return i; 
    }
    return -1;
}
```

로직 자체는 나의 똑같지만 사칙연산을 각각 표현했다는 점만 다르다.

