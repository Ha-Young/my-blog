---
title: "[3주차 Searching] 카페 - Lv2"
draft: false
date: "2020-09-21 20:06"
path: "/algorithm/programmers/study_week3_2"
category: 'algorithm'

---

## 문제 설명

Leo는 카펫을 사러 갔다가 아래 그림과 같이 중앙에는 빨간색으로 칠해져 있고 가장 끝쪽의 모서리 한 줄은 갈색으로 칠해져 있는 격자 모양 카펫을 봤습니다.

![image.png](https://grepp-programmers.s3.amazonaws.com/files/ybm/7c94563a35/2ff27ac9-97d0-43a9-9cf8-a344b8e7912e.png)

Leo는 집으로 돌아와서 아까 본 카펫의 빨간색과 갈색으로 색칠된 격자의 개수는 기억했지만, 전체 카펫의 크기는 기억하지 못했습니다.

Leo가 본 카펫에서 갈색 격자의 수 brown, 빨간색 격자의 수 red가 매개변수로 주어질 때 카펫의 가로, 세로 크기를 순서대로 배열에 담아 return 하도록 solution 함수를 작성해주세요.

##### 제한사항

- 갈색 격자의 수 brown은 8 이상 5,000 이하인 자연수입니다.
- 빨간색 격자의 수 red는 1 이상 2,000,000 이하인 자연수입니다.
- 카펫의 가로 길이는 세로 길이와 같거나, 세로 길이보다 깁니다.

##### 입출력 예

| brown | red  | return |
| ----- | ---- | ------ |
| 10    | 2    | [4, 3] |
| 8     | 1    | [3, 3] |
| 24    | 24   | [8, 6] |

[출처](http://hsin.hr/coci/archive/2010_2011/contest4_tasks.pdf)



## 나의 풀이

### 첫번째 풀이

#### 소스

```python
# 1. red 해서 전체 개수 구한 다음 약수 2개의 리스트를 만든다. (가로가 긴 or same)
# 2. 이 2개 약수리스트를 돌면서 가능한 것을 찾는다

def get_divisor_pair(n):
    divisor_list = []
    for i in range(n, 0, -1):
        if i >= n / i and n % i == 0:
            divisor_list.append([i, int(n / i)])
    return divisor_list

def solution(brown, red):
    candidates = get_divisor_pair(red)
    
    for candidiate in candidates:
        red_width, red_height = candidiate
        if brown == (red_width + red_height + 2) * 2 :
            return [red_width + 2, red_height + 2]
    
    return []
```

#### 설명

- 좀 searching을 하고 나서 푼 문제라 추후 다시 꼭 풀어봐야 할 문제.
- 문제 이해부터 잘못했었는데 무조건 brown은 red를 한줄로 감싸고 있는 형태이고,
  red는 가로가 긴 직사각형으로 생겨야 되는 문제.
- 그래서 이 문제의 관건은 red의 경우의 수를 모두 구한다음, 입력 받은 brown의 개수와 맞는 red의 생김 경우의 수를 찾으면 된다.

- red의 생김 경우의 수는 가로가 세로보다 길도록 하여 약수를 구하듯이 구하였다. [가로, 세로] 의 리스트
- red의 생김 경우의 수를 순회하면서 입력받은 brown의 개수가 되면 return.

#### 결과

통과

#### 리뷰

> - 안녕하세요. 하영님. :)
>   전체적으로 깔금하게 잘 작성하셨습니다.
> - `int(n / i)` 대신 `n // i`를 사용할 수 있습니다. :)