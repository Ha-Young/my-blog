---
title: '[JS] 프로그래머스 - 베스트앨범 Lv3 (해시)'
draft: false
date: 2021-01-28 14:33
category: 'algorithm'
tags: ['javascript', 'algorithm']
---



## 문제 설명

스트리밍 사이트에서 장르 별로 가장 많이 재생된 노래를 두 개씩 모아 베스트 앨범을 출시하려 합니다. 노래는 고유 번호로 구분하며, 노래를 수록하는 기준은 다음과 같습니다.

1. 속한 노래가 많이 재생된 장르를 먼저 수록합니다.
2. 장르 내에서 많이 재생된 노래를 먼저 수록합니다.
3. 장르 내에서 재생 횟수가 같은 노래 중에서는 고유 번호가 낮은 노래를 먼저 수록합니다.

노래의 장르를 나타내는 문자열 배열 genres와 노래별 재생 횟수를 나타내는 정수 배열 plays가 주어질 때, 베스트 앨범에 들어갈 노래의 고유 번호를 순서대로 return 하도록 solution 함수를 완성하세요.

### 제한사항

- genres[i]는 고유번호가 i인 노래의 장르입니다.
- plays[i]는 고유번호가 i인 노래가 재생된 횟수입니다.
- genres와 plays의 길이는 같으며, 이는 1 이상 10,000 이하입니다.
- 장르 종류는 100개 미만입니다.
- 장르에 속한 곡이 하나라면, 하나의 곡만 선택합니다.
- 모든 장르는 재생된 횟수가 다릅니다.

### 입출력 예

| genres                                | plays                      | return       |
| ------------------------------------- | -------------------------- | ------------ |
| [classic, pop, classic, classic, pop] | [500, 600, 150, 800, 2500] | [4, 1, 3, 0] |

### 입출력 예 설명

classic 장르는 1,450회 재생되었으며, classic 노래는 다음과 같습니다.

- 고유 번호 3: 800회 재생
- 고유 번호 0: 500회 재생
- 고유 번호 2: 150회 재생

pop 장르는 3,100회 재생되었으며, pop 노래는 다음과 같습니다.

- 고유 번호 4: 2,500회 재생
- 고유 번호 1: 600회 재생

따라서 pop 장르의 [4, 1]번 노래를 먼저, classic 장르의 [3, 0]번 노래를 그다음에 수록합니다.

※ 공지 - 2019년 2월 28일 테스트케이스가 추가되었습니다.





## 나의 풀이

### 소스

```js
function solution(genres, plays) {
    const answer = [];
    
    const genresNumHash = {};
    const bestAlbumHash = {};
    for (let i = 0; i < genres.length; i++) {
        const id = i;
        const genre = genres[i];
        const play = plays[i];
        
        genresNumHash[genre] ? (genresNumHash[genre] += play) : (genresNumHash[genre] = play);
        if (!bestAlbumHash[genre]) bestAlbumHash[genre] = [];
        bestAlbumHash[genre].push({id, play});
    }
    
    const sortedGenres = Object.entries(genresNumHash);
    sortedGenres.sort((a, b) => b[1] - a[1]);
    
    for (const [genre] of sortedGenres) {
        bestAlbumHash[genre].sort((a, b) => {
            if (a.play === b.play) {
                return b.id - a.id;
            }
            
            return a.play - b.play;
        });
        
        const getAlbumNum = bestAlbumHash[genre].length >= 2 ? 2 : 1;
        
        for (let i = 0; i < getAlbumNum; i++) {
            answer.push(bestAlbumHash[genre].pop().id);
        }
    }

    return answer;
}
```

### 설명

1. 맨 먼저 해시를 이용해 우선순위의 장르를 구하고 (play모두 합산) 배열변환 후 소팅.
   - 그 와중에 bestAlbumHash에 장르별로 배열 추가
     - bestAlbumHash = { genre1 : [ {id1, play1}, {id2, play2}], genre2: [ {id1, play1}, {id2, play2}...] ...} 의 구조

2. 우선순위의 장르순으로 순회하며 
   1. bestAlbumHash에 장르 배열 조건에 맞게 소팅. play내림차순 (play가 같으면 id 오름차순)
   2. 소팅된 장르 배열에서 pop해서 id만 가져옴 (2개 이상 가져오기 금지)



## 다른사람의 풀이

```js
function solution(genres, plays) {
    var dic = {};
    genres.forEach((t,i)=> {
        dic[t] = dic[t] ? dic[t] + plays[i] : plays[i];        
    });

    var dupDic = {};
    return genres          
          .map((t,i)=> ({genre : t, count:plays[i] , index:i}))
          .sort((a,b)=>{               
               if(a.genre !== b.genre) return dic[b.genre] - dic[a.genre];
               if(a.count !== b.count) return b.count - a.count;
               return a.index - b.index;
           })
           .filter(t=>  {
               if(dupDic[t.genre] >= 2) return false;
               dupDic[t.genre] = dupDic[t.genre] ? dupDic[t.genre]+ 1 : 1;
               return true;
            })
           .map(t=> t.index);    
}
```

나와 비슷한 로직이지만 세부적으로는 차이가 좀 있다.

우선, 나는 합산된 장르를 구할 때 데이터 변환 작업을 하고 이후 장르 순회 때 조건에 맞게 소트, 2개이하로 정답배열에 푸시하는 반면,

이 소스는 바로 장르를 순회하면서 map으로 데이터 변환, 조건에 맞게 소트, 필터링, 정답형식에 맞게 변환 으로 작업을 한다.

뭔가 좀 더 함수형프로그래밍에 맞게끔 풀이를 해주셨다는 생각이 든다.

**특히, 소트의 사용법에 있어서 꼭 인자로 받은 `a`, `b` 로만 소팅하는 것이 아닌 외부 스코프의 변수를 통해서도 작업할 수 있다는 점을 깨닫게 되었다.**

하지만 변수명이 부적절하다는 점과 인자로 받은 genres를 변환시킨다는 점에서는 조금 아쉬운 코드다.

