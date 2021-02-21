---
title: '[JS] 프로그래머스 - 위장 Lv2 (해시)'
draft: false
date: 2021-01-28 14:33
category: 'algorithm'
tags: ['javascript', 'algorithm']
---

## 문제 설명

스파이들은 매일 다른 옷을 조합하여 입어 자신을 위장합니다.

예를 들어 스파이가 가진 옷이 아래와 같고 오늘 스파이가 동그란 안경, 긴 코트, 파란색 티셔츠를 입었다면 다음날은 청바지를 추가로 입거나 동그란 안경 대신 검정 선글라스를 착용하거나 해야 합니다.

| 종류 | 이름                       |
| ---- | -------------------------- |
| 얼굴 | 동그란 안경, 검정 선글라스 |
| 상의 | 파란색 티셔츠              |
| 하의 | 청바지                     |
| 겉옷 | 긴 코트                    |

스파이가 가진 의상들이 담긴 2차원 배열 clothes가 주어질 때 서로 다른 옷의 조합의 수를 return 하도록 solution 함수를 작성해주세요.

### 제한사항

- clothes의 각 행은 [의상의 이름, 의상의 종류]로 이루어져 있습니다.
- 스파이가 가진 의상의 수는 1개 이상 30개 이하입니다.
- 같은 이름을 가진 의상은 존재하지 않습니다.
- clothes의 모든 원소는 문자열로 이루어져 있습니다.
- 모든 문자열의 길이는 1 이상 20 이하인 자연수이고 알파벳 소문자 또는 '\_' 로만 이루어져 있습니다.
- 스파이는 하루에 최소 한 개의 의상은 입습니다.

### 입출력 예

| clothes                                                                        | return |
| ------------------------------------------------------------------------------ | ------ |
| [[yellow_hat, headgear], [blue_sunglasses, eyewear], [green_turban, headgear]] | 5      |
| [[crow_mask, face], [blue_sunglasses, face], [smoky_makeup, face]]             | 3      |

### 입출력 예 설명

예제 #1
headgear에 해당하는 의상이 yellow_hat, green_turban이고 eyewear에 해당하는 의상이 blue_sunglasses이므로 아래와 같이 5개의 조합이 가능합니다.

```
1. yellow_hat
2. blue_sunglasses
3. green_turban
4. yellow_hat + blue_sunglasses
5. green_turban + blue_sunglasses
```

예제 #2
face에 해당하는 의상이 crow_mask, blue_sunglasses, smoky_makeup이므로 아래와 같이 3개의 조합이 가능합니다.

```
1. crow_mask
2. blue_sunglasses
3. smoky_makeup
```

[출처](http://2013.bapc.eu/)

## 나의 풀이

### 소스

```js
function getCombinations(arr, m) {
  const combinations = []
  const picked = []
  const used = []
  for (item of arr) used.push(0)
  function find(picked) {
    if (picked.length === m) {
      const rst = []
      for (let i of picked) {
        rst.push(arr[i])
      }
      combinations.push(rst)
      return
    } else {
      let start = picked.length ? picked[picked.length - 1] + 1 : 0
      for (let i = start; i < arr.length; i++) {
        if (i === 0 || arr[i] !== arr[i - 1] || used[i - 1]) {
          picked.push(i)
          used[i] = 1
          find(picked)
          picked.pop()
          used[i] = 0
        }
      }
    }
  }
  find(picked)
  return combinations
}
function solution(clothes) {
  let answer = 0
  const kindsHash = {}

  for (const [name, kinds] of clothes) {
    if (kindsHash[kinds]) {
      kindsHash[kinds] += 1
    } else {
      kindsHash[kinds] = 1
    }
  }

  const kinds = Object.keys(kindsHash)

  for (let i = 1; i <= kinds.length; i++) {
    const combination = getCombinations(kinds, i)
    for (let j = 0; j < combination.length; j++) {
      const combItem = combination[j]
      let combNum = 1
      for (let k = 0; k < combItem.length; k++) {
        const kind = combItem[k]
        combNum *= kindsHash[kind]
      }
      answer += combNum
    }
  }
  return answer
}
```

### 설명

맨 처음 해쉬키를 이용해 각 옷의 종류별로 개수를 구하고 조합을 이용해서 경우의 수를 추리는 방법을 택했다.

### 결과

하지만, 조합을 막아놓은건지 테스트 1에서 자꾸 실패가 떠서 통과 하지 못하였음.

## 다른사람의 풀이

```js
function solution(clothes) {
  let answer = 0
  const clothesCountArr = []
  const species = []
  clothes.map(elem => {
    if (!species.includes(elem[1])) {
      species.push(elem[1])
    }
    const index = species.indexOf(elem[1])
    clothesCountArr[index] = clothesCountArr[index]
      ? clothesCountArr[index] + 1
      : 1
  })
  answer = clothesCountArr.reduce((acc, val) => acc * (val + 1), 1) - 1
  return answer
}
```

해시 맵에 종류 : 갯수의 형태로 저장을 하여서 마지막에 경우의 수를 계산했는데,
첫번째 예제를 예로 들자면, headgear : 2, eyewear : 1 이렇게 해시 맵에 저장.

_그럼 경우의 수는 어떻게 계산해야 할까요?_

제가 푼 방법은 다음과 같습니다.
\1. (headgear의 수 + 1) 1을 더 해주는 이유는 headgear를 착용하지 않을 수도 있기 때문입니다.
\2. (eyewear의 수 + 1 ) 1을 더 해주는 이유는 eyewear를 착용하지 않을 수도 있기 때문입니다.
\3. 두 수는 각각 독립적이기 때문에 1번 2번의 수를 곱하고 - 1 (모두 안입는 경우는 존재하지 않으므로)

[출처](<[https://velog.io/@giraffelim/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EC%9C%84%EC%9E%A5](https://velog.io/@giraffelim/프로그래머스-위장)>)

