---
title: '[Javascript] LeetCode - 101: Symmetric Tree Lv-Easy (DFS&BFS)'
draft: false
date: 2021-03-14 19:20
category: 'algorithm'
tags: ['javascript', 'algorithm', 'leet code', 'DFS&BFS', '오답노트']
---

## 문제 설명

Given the `root` of a binary tree, *check whether it is a mirror of itself* (i.e., symmetric around its center).

 

**Example 1:**

![img](https://assets.leetcode.com/uploads/2021/02/19/symtree1.jpg)

```
Input: root = [1,2,2,3,4,4,3]
Output: true
```

**Example 2:**

![img](https://assets.leetcode.com/uploads/2021/02/19/symtree2.jpg)

```
Input: root = [1,2,2,null,3,null,3]
Output: false
```

 

**Constraints:**

- The number of nodes in the tree is in the range `[1, 1000]`.
- `-100 <= Node.val <= 100`

 

**Follow up:** Could you solve it both recursively and iteratively?



## 나의 풀이

### 소스

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
  const leftSubTree = root.left;
  const rightSubTree = root.right;

  return checkIsMirrorTree(leftSubTree, rightSubTree);

  function checkIsMirrorTree(leftSubTree, rightSubTree) {
    if (!leftSubTree && !rightSubTree) {
      return true;
    }

    if (leftSubTree && !rightSubTree) {
      return false;
    }

    if (rightSubTree && !leftSubTree) {
      return false;
    }

    if (leftSubTree.val !== rightSubTree.val) {
      return false;
    }

    if (!checkIsMirrorTree(leftSubTree.left, rightSubTree.right)){
      return false;
    }

    if (!checkIsMirrorTree(leftSubTree.right, rightSubTree.left)) {
      return false;
    }

    return true;
  }
};
```

### 설명

한번에 다 못풀었다.

맨 처음 풀이 시도는 root 노드 기준으로 left tree와 , right tree로 나누고,

각 tree의 depth에 해당하는 노드들을 가지고 있다가 right노드를 reverse시킨 후 비교해나가는 방식으로,

비교가 완료되면 다음 depth에 해당하는 노드들을 새로 담아야 되었었는데, 너무 번거로워서 아닐거라 생각하고 다른사람의 풀이를 먼저 참고했다.



힌트를 얻어서 완성한 코드가 위와 같은데,

leftSubTree와 rightSubTree 를 각각 받아서 루트부터 재귀적으로 비교해나가는 방식이다.

checkMirror 핵심 아이디어는 

1. 루트의 값을 먼저 비교하고, 
2. 루트의 왼쪽 트리의 왼쪽과 오른쪽 트리의 오른쪽이 같은지 확인
3. 루트의 왼쪽트리의 오른쪽과 오른쪽트리의 왼쪽이 같은지 확인

이다.

Mirroring되어있는 트리는 그 subTree들이 왼쪽, 오른쪽이 바뀌어져있는걸 알아차리는 것이 핵심.



## 다른사람의 풀이

```js
let isSymmetric = function(root) {
    return root == null || isMirror(root.left, root.right);
};

let isMirror = function(leftSub, rightSub) {
    if (leftSub == null && rightSub == null) return true;
    if (leftSub == null || rightSub == null) return false;
    return (leftSub.val == rightSub.val)
        && isMirror(leftSub.right, rightSub.left)
        && isMirror(leftSub.left, rightSub.right);
};
```

방식은 나와 같지만, 코드가 매우 간결하다.

