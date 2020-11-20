---
title: "[3주차 Searching] 사탕담기 - Lv2"
draft: false
date: "2020-09-21 20:11"
path: "/algorithm/programmers/study_week3_6"
category: 'algorithm'

---

## 문제 설명

`m` 그램(gram)을 담을 수 있는 가방에 사탕을 가득 채우는 경우의 수를 구하려 합니다. 단, 같은 사탕은 또 넣을 수 없습니다.

가방이 감당할 수 있는 무게 m, 사탕별 무게가 담긴 배열 weights가 매개변수로 주어질 때, 가방을 정확히 m 그램으로 채우는 경우의 수를 return 하는 solution 함수를 작성해주세요.

## 제한 조건

- m은 1,000 이상 100,000 이하인 자연수입니다.
- 모든 사탕의 무게는 10 이상 100,000 이하인 자연수입니다.
- weights의 길이는 3 이상 15 이하입니다.

## 입출력 예

| m    | weights                       | return |
| ---- | ----------------------------- | ------ |
| 3000 | [500, 1500, 2500, 1000, 2000] | 3      |

##### 입출력 예 설명

사탕을 하나씩 선택해 3000 그램으로 만드는 방법은 [500, 1000, 1500], [1000, 2000], [500, 2500] 으로 3가지입니다.



## 나의 풀이

### 첫번째 풀이

#### 소스

```python
from itertools import combinations

def solution(m, weights):
    answer = 0
    all_case = []
    
    for i in range(1, len(weights) + 1):
        all_case.extend(list(combinations(weights, i)))
    
    for case in all_case:
        if sum(case) == m:
            answer += 1
    
    return answer
```

#### 설명

- 1. 각 개수별 조합을 구해서 리스트에 담아둔다.
  2. 해당 조합 리스트를 순회하며 각 조합에 대한 가격을 구해 비교하고 맞으면 정답 개수 추가

#### 결과

통과

#### 리뷰

> - `list comprehension`과 `count`를 이용할 수 있습니다. :)
>
>   ```
>   answer = [sum(case) for case in all_case].count(m)
>   ```