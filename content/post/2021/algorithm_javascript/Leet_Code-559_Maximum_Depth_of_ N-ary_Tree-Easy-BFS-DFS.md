---
title: '[Javascript] LeetCode - 559: Maximum Depth of N-ary Tree Lv-Easy (DFS&BFS)'
draft: false
date: 2021-03-14 17:20
category: 'algorithm'
tags: ['javascript', 'algorithm', 'leet code', 'DFS&BFS']
---

## 문제 설명

### Maximum Depth of N-ary Tree

Given a n-ary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

*Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples).*

 

**Example 1:**

![img](https://assets.leetcode.com/uploads/2018/10/12/narytreeexample.png)

```
Input: root = [1,null,3,2,4,null,5,6]
Output: 3
```

**Example 2:**

![img](https://assets.leetcode.com/uploads/2019/11/08/sample_4_964.png)

```
Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: 5
```

 

**Constraints:**

- The depth of the n-ary tree is less than or equal to `1000`.
- The total number of nodes is between `[0, 104]`.



## 나의 풀이

### 소스

```js
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (!root || !root.children) {
        return 0;
    }
    
    let currentDepth = 1;
    let _maxDepth = currentDepth; 
        
    for (const child of root.children) {
        const childDepth = maxDepth(child) + currentDepth;
        
        if (_maxDepth < childDepth) {
            _maxDepth = childDepth;
        }
    }
    
    return _maxDepth;
};
```

### 설명

맨 처음에

```js
function Node(val, children) {
  this.val = val;
  this.children = children;
}
```

과 같은 형태로 들어오는 줄 모르고

문제처럼 

```
root = [1,null,3,2,4,null,5,6]
```

과 같은 형태의 배열로 들어오는 줄 알고

이 배열을 트리구조로 변환하는데 시간을 소모하기도 했고 도저히 풀리지가 않았다.



그래서 찾아보니 Javascript는 애초에 인자로 받을 때 부터 위 주석으로 Node생성자 함수를 통해 만들어진

Node가 인자로 들어오는 것을 발견....!



그래서 맨 처음 `console.log` 로 출력을 찍어보면 다음과 같이 나온다.

```
{
  val: 1,
  children: [
    { val: 3, children: [Array] },
    { val: 2, children: [] },
    { val: 4, children: [] }
  ]
}
```

그래서 Javascript에 한해서는 Input값이 위와 같은 형태로 들어오기 때문에 이에 맞춰서 풀어주어야 한다.

> Input 배열을 Tree구조로 변환하는데 힘 뺄 필요는 없다.



그래서 DFS방식인 stack으로 접근하려고 하였으나, maxDepth를 구하는데 closure 변수로 값을 캐치하는 것이 쉽지 않아서

콜 스택을 쌓아가면서 쉽게 구할 수 있는 재귀형태로 바꾸었다.



핵심 아이디어는,

노드가 주어지면 그 노드를 root 노드로 하는 트리의 maxDepth를 구하는 함수를 만들었다.

해당 노드의 서브 트리인 children을 순회하면서 해당 서브트리의 maxDepth를 구하고, 현재 노드로 돌아와서 depth에 1을 더하면

지금 node의 depth가 구해지는 원리를 이용했다.

```js
for (const child of root.children) {
        const childDepth = maxDepth(child) + 1;
        
        if (_maxDepth < childDepth) {
            _maxDepth = childDepth;
        }
    }
```

각 서브트리의 높이 중 가장 큰 높이를 구한 후에 리턴을 하면 호출 한 그 상위 노드에서 받아 1 더하고 다시 상위 노드에서 받아 1더하면서 maxDepth를 찾는 방식.



## 다른사람의 풀이

```js
var maxDepth = function(root) {
    if(root === null)
        return 0;
    if(root.children.length === 0 || root.children === null)
        return 1;
    return (1 + Math.max(...root.children.map((x)=>maxDepth(x))));
};
```

나보다 깔끔하게 잘 푼 방법들이 많았지만 그 중에서 이 풀이만 유독 마음에 들었다.

`map()` 함수로 재귀를 타는 방법이랑 `Math.max()` 함수를 이용했다는 점이 너무 깔끔하고 선언적이라서 배울만 하다고 생각된다.

