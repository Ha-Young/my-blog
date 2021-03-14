---
title: '[Javascript] LeetCode - 529: Minesweeper Lv-Medium (DFS&BFS)'
draft: false
date: 2021-03-14 22:30
category: 'algorithm'
tags: ['javascript', 'algorithm', 'leet code', 'DFS&BFS', '오답노트']
---

## 문제 설명

Let's play the minesweeper game ([Wikipedia](https://en.wikipedia.org/wiki/Minesweeper_(video_game)), [online game](http://minesweeperonline.com/))!

You are given a 2D char matrix representing the game board. **'M'** represents an **unrevealed** mine, **'E'** represents an **unrevealed** empty square, **'B'** represents a **revealed** blank square that has no adjacent (above, below, left, right, and all 4 diagonals) mines, **digit** ('1' to '8') represents how many mines are adjacent to this **revealed** square, and finally **'X'** represents a **revealed** mine.

Now given the next click position (row and column indices) among all the **unrevealed** squares ('M' or 'E'), return the board after revealing this position according to the following rules:

1. If a mine ('M') is revealed, then the game is over - change it to **'X'**.
2. If an empty square ('E') with **no adjacent mines** is revealed, then change it to revealed blank ('B') and all of its adjacent **unrevealed** squares should be revealed recursively.
3. If an empty square ('E') with **at least one adjacent mine** is revealed, then change it to a digit ('1' to '8') representing the number of adjacent mines.
4. Return the board when no more squares will be revealed.

 

**Example 1:**

```
Input: 

[['E', 'E', 'E', 'E', 'E'],
 ['E', 'E', 'M', 'E', 'E'],
 ['E', 'E', 'E', 'E', 'E'],
 ['E', 'E', 'E', 'E', 'E']]

Click : [3,0]

Output: 

[['B', '1', 'E', '1', 'B'],
 ['B', '1', 'M', '1', 'B'],
 ['B', '1', '1', '1', 'B'],
 ['B', 'B', 'B', 'B', 'B']]

Explanation:
```

**Example 2:**

```
Input: 

[['B', '1', 'E', '1', 'B'],
 ['B', '1', 'M', '1', 'B'],
 ['B', '1', '1', '1', 'B'],
 ['B', 'B', 'B', 'B', 'B']]

Click : [1,2]

Output: 

[['B', '1', 'E', '1', 'B'],
 ['B', '1', 'X', '1', 'B'],
 ['B', '1', '1', '1', 'B'],
 ['B', 'B', 'B', 'B', 'B']]

Explanation:
```

 

**Note:**

1. The range of the input matrix's height and width is [1,50].
2. The click position will only be an unrevealed square ('M' or 'E'), which also means the input board contains at least one clickable square.
3. The input board won't be a stage when game is over (some mines have been revealed).
4. For simplicity, not mentioned rules should be ignored in this problem. For example, you **don't** need to reveal all the unrevealed mines when the game is over, consider any cases that you will win the game or flag any squares.



## 나의 풀이

### 소스

```js
/**
 * @param {character[][]} board
 * @param {number[]} click
 * @return {character[][]}
 */
var updateBoard = function (board, click) {
  const stack = [click];
  const ADD_CHECK_POSITIONS = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ];
  const newBoard = [...board];
  const checkedBoard = Array.from(Array(board.length), () =>
    Array(board[0].length).fill(false)
  );

  const [clickedRowPos, clickedColPos] = click;

  if (newBoard[clickedRowPos][clickedColPos] === "M") {
    newBoard[clickedRowPos][clickedColPos] = "X";
    return newBoard;
  }

  while (stack.length !== 0) {
    const checkArea = stack.pop();
    const adjacentEmptyPositions = [];
    const [rowPos, colPos] = checkArea;

    let findedMine = 0;

    // 1. 상하좌우,대각선 지뢰 체크 (대각선은 스택 쌓지 않음.)
    for (const addCheckPos of ADD_CHECK_POSITIONS) {
      const [addedRowPos, addedCol] = addCheckPos;

      const checkRowPos = rowPos + addedRowPos;
      const checkColPos = colPos + addedCol;

      if (
        checkRowPos > -1 &&
        checkColPos > -1 &&
        checkRowPos < newBoard.length &&
        checkColPos < newBoard[0].length
      ) {
        switch (newBoard[checkRowPos][checkColPos]) {
          case "E":
            if (!checkedBoard[checkRowPos][checkColPos]) {
              adjacentEmptyPositions.push([checkRowPos, checkColPos]);
            }
            break;
          case "M":
            findedMine += 1;
            break;
        }
      }
    }

    if (findedMine > 0) {
      newBoard[rowPos][colPos] = String(findedMine);
    } else {
      newBoard[rowPos][colPos] = "B";
      stack.push(...adjacentEmptyPositions);
      for (const adjacentEmptyPos of adjacentEmptyPositions) {
        const [checkRowPos, checkColPos] = adjacentEmptyPos;
        checkedBoard[checkRowPos][checkColPos] = true;
      }
    }
  }

  return newBoard;
};
```

### 설명

풀긴 풀었는데 시간이 너무 오래걸렸다...ㅠㅠ 그래서 오답노트로 등록.



핵심아이디어는 DFS를 이용한 stack에 있다.

1. stack에 들어있는 좌표 pop

2. 인접한 좌표중에서 지뢰가 있는지 체크 (카운팅)

   1. 지뢰가 없는 `E` 라면 기억해두기.

3. 인접한 좌표 모두 체크 했다면, 

   1. 인접한 좌표 중에서 지뢰 개수만큼 표시. 
   2. 인접한 좌표에서 지뢰가 없으면 `B` 로 표시 및 인접좌표 중 `E` 인 좌표 스택에 추가

   

핵심은 현재 인접노드에서 지뢰를 발견했다면, 그 숫자만큼 표시하고 스택에는 인접노드가 아무리 `E`더라도 스택에 추가해서는 안된다.

> 지뢰 발견이라면 거기서 멈춰야 됨. 추가탐색이 금지되기 때문.



여기서 방문체크는 불필요한 체킹을 방지하기 위함이고,

newBoard로 새로 만드는 것은 기존 인자값의 불변성을 지키기 위함이다.



## 다른사람의 풀이

```js
var updateBoard = function(board, click) {
  const rows = board.length;
  const cols = board[0].length;
  dfs(click[0], click[1]);
  return board;

  function dfs(i, j) {
    if (!board[i][j]) return;
    if (board[i][j] === 'M') {
      board[i][j] = 'X';
      return;
    }
    if (board[i][j] !== 'E') return;

    const mines = checkForMine(i, j); // Check for mines
	
    if (mines) {
      board[i][j] = mines.toString();
      return;
    } else {
      // If we haven't got mines, check another cells
      board[i][j] = 'B';
      for (let x = Math.max(i - 1, 0); x < Math.min(i + 2, rows); x++) {
        for (let y = Math.max(j - 1, 0); y < Math.min(j + 2, cols); y++) {
          dfs(x, y);
        }
      }
    }
  }

  function checkForMine(x, y) {
    let mines = 0;
    for (let i = Math.max(x - 1, 0); i < Math.min(x + 2, rows); i++) {
      for (let j = Math.max(y - 1, 0); j < Math.min(y + 2, cols); j++) {
        if (board[i][j] === 'M') mines++;
      }
    }
    return mines;
  }
}
```

인자로 받은 board를 그대로 수정을 하면서 속도 최적화를 시켰고,

> 음.. 나는 이렇게 인자값을 변화시키는 것을 선호하지 않는다.
>
> 새로운 값으로 내주는 것이 보다 functional하다고 생각.

핵심 아이디어 로직은 

1. 인접노드중에서 지뢰가 있는지 체크
2. 지뢰가 없다면 인접 노드 중 빈 셀로 재귀 dfs