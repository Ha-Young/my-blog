---
title: '[JS] 프로그래머스 - 다리를 지나는 트럭 Lv2 (스택/큐)'
draft: false
date: 2021-01-24 13:15
category: 'algorithm'
tags: ['javascript', 'algorithm']
---

## 문제 설명

트럭 여러 대가 강을 가로지르는 일 차선 다리를 정해진 순으로 건너려 합니다. 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 알아내야 합니다. 트럭은 1초에 1만큼 움직이며, 다리 길이는 bridge_length이고 다리는 무게 weight까지 견딥니다.
※ 트럭이 다리에 완전히 오르지 않은 경우, 이 트럭의 무게는 고려하지 않습니다.

예를 들어, 길이가 2이고 10kg 무게를 견디는 다리가 있습니다. 무게가 [7, 4, 5, 6]kg인 트럭이 순서대로 최단 시간 안에 다리를 건너려면 다음과 같이 건너야 합니다.

| 경과 시간 | 다리를 지난 트럭 | 다리를 건너는 트럭 | 대기 트럭 |
| --------- | ---------------- | ------------------ | --------- |
| 0         | []               | []                 | [7,4,5,6] |
| 1~2       | []               | [7]                | [4,5,6]   |
| 3         | [7]              | [4]                | [5,6]     |
| 4         | [7]              | [4,5]              | [6]       |
| 5         | [7,4]            | [5]                | [6]       |
| 6~7       | [7,4,5]          | [6]                | []        |
| 8         | [7,4,5,6]        | []                 | []        |

따라서, 모든 트럭이 다리를 지나려면 최소 8초가 걸립니다.

solution 함수의 매개변수로 다리 길이 bridge_length, 다리가 견딜 수 있는 무게 weight, 트럭별 무게 truck_weights가 주어집니다. 이때 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지 return 하도록 solution 함수를 완성하세요.

### 제한 조건

- bridge_length는 1 이상 10,000 이하입니다.
- weight는 1 이상 10,000 이하입니다.
- truck_weights의 길이는 1 이상 10,000 이하입니다.
- 모든 트럭의 무게는 1 이상 weight 이하입니다.

### 입출력 예

| bridge_length | weight | truck_weights                   | return |
| ------------- | ------ | ------------------------------- | ------ |
| 2             | 10     | [7,4,5,6]                       | 8      |
| 100           | 100    | [10]                            | 101    |
| 100           | 100    | [10,10,10,10,10,10,10,10,10,10] | 110    |

[출처](http://icpckorea.org/2016/ONLINE/problem.pdf)



## 나의 풀이

### 소스

```js
function do_cross_trucks (waiting_trucks, crossing_trucks, available_weight) {
    let on_bridge_truck_weight = 0;
    const last = waiting_trucks.length - 1;
    
    if (waiting_trucks[last] <= available_weight) {
        const truck_weight = waiting_trucks.pop();
        crossing_trucks.push({weight: truck_weight, distance: 0})
    }
    
    for (const truck of crossing_trucks) {
        on_bridge_truck_weight += truck['weight'];
        truck['distance'] += 1;
    }
    
    return on_bridge_truck_weight;
}

function solution(bridge_length, weight, truck_weights) {
    let day = 0;
    
    const truck_num = truck_weights.length;
    const crossing_trucks = [];
    const success_trucks = [];
    let current_weight = 0;
    
    const waiting_trucks = [...truck_weights].reverse();
    
    while (success_trucks.length < truck_num) {
        day++;

        const available_weight = weight - current_weight;
        current_weight = do_cross_trucks(waiting_trucks, crossing_trucks, available_weight);
        
        if (crossing_trucks.length > 0 && crossing_trucks[0]['distance'] >= bridge_length) {
            const truck = crossing_trucks.shift();
            success_trucks.push(truck);
            current_weight -= truck['weight'];
        }
    }
    
    return day + 1;
}
```

### 설명

그냥 각각 [다리 건너기전 트럭], [다리 건너는 트럭], [다리를 다 건넌 트럭] 큐 3개를 이용해 풀었다.

특이점이라고는 다리를 건너기전 트럭을 큐 처럼 사용하기 위해 reverse시키고 pop()을 시켜서 O(1)로 dequeue할 수 있게 하였고 나머지는 그렇게 많이 들어갈 것 같지않아 따로 reverse시키지는 않았다.

또, 다리를 건너는 중인 트럭 큐에서는 객체형태

```js
truck = {
  weight: weight,
  distance: distance
}
```

로 처리하게 해서

```js
다리를 건너는 중인 트럭 = [
  {
    weight: weight,
    distance: distance
  },
  {
    weight: weight,
    distance: distance
  },{
    weight: weight,
    distance: distance
  },
]
```

처럼 되도록 하였다.

이렇게 해서 각각 건너는 중인 트럭의 개별로 거리를 계산 할 수 있었다.

### 결과

통과



## 다른 사람의 풀이

```js
function solution(bridge_length, weight, truck_weights) {
  // '다리'를 모방한 큐에 간단한 배열로 정리 : [트럭무게, 얘가 나갈 시간].
  let time = 0, qu = [[0, 0]], weightOnBridge = 0;

  // 대기 트럭, 다리를 건너는 트럭이 모두 0일 때 까지 다음 루프 반복
  while (qu.length > 0 || truck_weights.length > 0) {
    // 1. 현재 시간이, 큐 맨 앞의 차의 '나갈 시간'과 같다면 내보내주고,
    //    다리 위 트럭 무게 합에서 빼준다.
    if (qu[0][1] === time) weightOnBridge -= qu.shift()[0];

    if (weightOnBridge + truck_weights[0] <= weight) {
      // 2. 다리 위 트럭 무게 합 + 대기중인 트럭의 첫 무게가 감당 무게 이하면 
      //    다리 위 트럭 무게 업데이트, 큐 뒤에 [트럭무게, 이 트럭이 나갈 시간] 추가.
      weightOnBridge += truck_weights[0];
      qu.push([truck_weights.shift(), time + bridge_length]);
    } else {
      // 3. 다음 트럭이 못올라오는 상황이면 얼른 큐의
      //    첫번째 트럭이 빠지도록 그 시간으로 점프한다.
      //    참고: if 밖에서 1 더하기 때문에 -1 해줌
      if (qu[0]) time = qu[0][1] - 1;
    }
    // 시간 업데이트 해준다.
    time++;
  }
  return time;
}
```

나보다 훨씬 간단하게 짜셨다.

우선 리스트를 추가하지 않으셨고, 3번의 트럭의 시간을 점프하는 것으로 훨씬 효율적일 것으로 예상된다.

