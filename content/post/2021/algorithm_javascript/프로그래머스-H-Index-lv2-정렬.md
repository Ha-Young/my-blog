---
title: '[JS] 프로그래머스 - H-Index Lv2 (정렬)'
draft: false
date: 2021-02-21 01:37
category: 'algorithm'
tags: ['javascript', 'algorithm']
---



## 나의 풀이

### 소스

```js
function solution(citations) {
    const _citations = [...citations];
    
    _citations.sort((a, b) => {
        return b - a;
    });
        
    if (_citations.length === 0 || _citations[0] === 0) {
        return 0;
    }
    
    if (_citations.length === 1) {
        return 1;
    }
    
    for (let h = 1; h < _citations.length + 1; h++) {
        if (h >= _citations[h]) {
            return h;
        }
    }
    
    return _citations.length;
}
```

### 설명

H-index 구하는 공식은 위키에 있다.

정렬 후 큰 수부터 카운팅을 해가면서 카운팅한 수와 다음 수가 같으면 끝마치면 된다.

다만, 

- [0,0,0] => 0
- [99] => 1
- [5,5,5,5,5] => 5

에 대한 TEST CASE만 충족시키도록 예외처리를 해야 한다.



## 다른사람의 풀이

```js
function solution(citations) {
     citations = citations.sort(sorting);
     var i = 0;
     while(i + 1 <= citations[i]){
         i++;
     }
     return i;


     function sorting(a, b){
         return b - a;
     }
}
```

compare 함수를 익명함수로 했으면 어땠을까 하지만 아주 잘 풀었다.

