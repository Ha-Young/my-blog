---
title: '[Javascript] LeetCode - 17. Letter Combinations of a Phone Number (DFS&BFS)'
draft: false
date: 2021-03-14 23:30
category: 'algorithm'
tags: ['javascript', 'algorithm', 'leet code', 'DFS&BFS', '순열&조합']
---

## 문제 설명

Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in **any order**.

A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

![img](https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Telephone-keypad2.svg/200px-Telephone-keypad2.svg.png)

 

**Example 1:**

```
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

**Example 2:**

```
Input: digits = ""
Output: []
```

**Example 3:**

```
Input: digits = "2"
Output: ["a","b","c"]
```

 

**Constraints:**

- `0 <= digits.length <= 4`
- `digits[i]` is a digit in the range `['2', '9']`.



## 나의 풀이

### 소스

```js
/**
 * @param {string} digits
 * @return {string[]}
 */
 var letterCombinations = function(digits) {
  const charMap = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
  }

  let result = [];

  for (const digit of digits) {
    const charCases = charMap[digit];

    if (result.length === 0) {
      result = result.concat(charCases);
      continue;
    }

    const newResult = [];
    for (const resultString of result) {
      for (const charCase of charCases) {
        newResult.push(resultString + charCase);
      }
    }

    result = newResult;
  }

  return result;
};
```

### 설명

BFS / DFS 문제인데, 나는 BFS / DFS가 아니라 다른방식으로 풀었다.

문제를 읽고 굳이 BFS / DFS를 써야되는 문제인가 싶었는데,

그 이유는 그냥 나올 수 있는 경우의 수를 모두 구하면 되기 때문이다. (순열)

result 배열에 다음 숫자에 매핑되는 문자들을 더해가면서 나올 수 있는 경우의 수를 계속 축적해나가면 끝.



## 다른사람의 풀이

재귀를 사용한 순열 풀이

```js
var letterCombinations = function(digits) {
    if(!digits.length) return [];
    
    const map = {
        2: ['a', 'b', 'c'],
        3: ['d', 'e', 'f'],
        4: ['g', 'h', 'i'],
        5: ['j', 'k', 'l'],
        6: ['m', 'n', 'o'],
        7: ['p', 'q', 'r', 's'],
        8: ['t', 'u', 'v'],
        9: ['w', 'x', 'y', 'z'],
    }
    
    const result = [];
    
    function permute(str, idx) {
        if(idx === digits.length) {
            result.push(str);
            return;
        }
        
        for(let alpha of map[digits[idx]]) {
            permute(str+alpha, idx+1);
        }
    }
    permute('', 0);
    return result;
};
```



BFS를 사용한 풀이 (별로인 것 같다)

```js
var letterCombinations = function (digits) {
    if (digits.length === 0) return [];
    let table = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
    let stack = [];
    let res = [""];
    digits = digits.split("");
    for (i = 0; i < digits.length; i++) digits[i] = parseInt(digits[i], 10);
    for (num of digits) stack.push(table[num].split(""));
    while (stack.length > 0) {
        let len = res.length;
        for (i = 0; i < len; i++) {
            for (ltr of stack[0]) {
                res.push(res[i] + ltr);
            }
        }
        stack.shift();
    }
    res = res.filter((el) => {
        return el.length === digits.length
    })
    return res;
};
```

