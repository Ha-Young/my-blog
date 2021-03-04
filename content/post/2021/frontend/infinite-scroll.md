---
title: "하옹의 프론트앤드 이야기 - Infinite Scroll(무한 스크롤)"
draft: false
date: 2021-02-23
category: 'frontend'
tags: ['frontend', 'react', 'useIntersectionObserver', 'infinite scroll', 'throttle', 'requestAnimationFrame']
---

## 무한 스크롤?

일반적으로 무한스크롤 기능이 필요할 때에는 **정보를 한꺼번에 가져와서 보여주기엔 정보량이 많거나 무거워서 api fetch로 받는 결과가 느릴 때**, 스크롤을 통해 아주 작은 일부분만 가져와 추가로 보여주면서 사용자 경험을 높이는 기술이자 인터페이스라 할 수 있다.

> 즉, Scroll End지점까지 가면 다시 추가정보 fetch를 계속해나가는 방식

정보를 일부분만 가져와서 보여주고 이후 결과는 사용자의 움직임에 Interaction하게 반응해서 추가로 정보를 가져오는 것이 pagenation과 비슷하기 때문에 자주 비교가 된다.



## 무한 스크롤하기

자 그럼 무한 스크롤에 대해서 자세한 설명을 무한스크롤은 하는 방법은 크게 2가지가 있는데,

- scroll event
- IntersectionObserver

가 있다. 두 방법 다 장단점이 있으며, 

**`scroll event`**는 우리가 익히 사용했던  DOM `scroll event`를 이용 하는 것이기 때문에 익숙해서 상대적으로 구현은 쉽지만, 이 `scroll event`에 `throttle` 혹은 `rAF`로 최적화를 해줘야 된다는 점이 있고,

**`IntersectionObserver`**는 익숙하지 않으면 익히는데 시간이 걸리기 때문에 상대적으로 어렵고, 페이지 맨 마지막에 가시성 감지를 위한 target 요소를 만들어야 되는 단점이 있다.



전체적인 Scroll에 반응하는 `Scroll Event` 대신 `IntersectionObserver`를 이용하는 것이 성능상 더 효율적이긴 하겠지만, 상황에 맞게 구현하는 것이 훨씬 중요하다고 생각한다.

> Scroll Event에서 쓰이는 `documentElement.scrollTop` 과 `documentElement.offsetHeight`는 reflow를 일으켜서 성능상 좋지 않다.


## Scroll Event

### 1. Scroll Event를 이용한 useInfiniteScroll Custom Hook 만들기

우선, Scroll Event를 최적화 하기전에, Custom Hook으로 `useInfiniteScroll` 을 만들어 줘야 한다.

설계 방식은 `[isFetching, setIsFetching] = useInfiniteScroll(fetchCallback)` 과 같은 방식으로 만들어서 `custom Hook`을 사용하는 곳에서 `setIsFetching`을 통해서도 접근 할 수 있게 하였다.

```js
import { useState, useEffect } from "react";

export default function useInfiniteScroll(fetchCallback) {
    const [isFetching, setIsFetching] = useState(false);
    
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
            setIsFetching(true);
        }
    }
    
    useEffect(() => {
        window.addEventListener('scroll', handleScrollThrottle);
        
        return () => {
            window.removeEventListener('scroll', handleScrollThrottle);
        };
    }, []);
    
    useEffect(() => {
        if (!isFetching) {
        	return;   
        }
        fetchCallback();
    }, [isFetching]);
    
    return [isFetching, setIsFetching];
}
```

자세한 구현 과정은 [이 곳](https://upmostly.com/tutorials/build-an-infinite-scroll-component-in-react-using-react-hooks)을 참조하자.

> - window.innerHeight는 지금 화면으로 보이는 윈도우의 높이
> - document.documentElement.scrollTop은 현재 화면이 어느 화면의 어느 좌표를 보고있는지를 알려주는 top 좌표 (얼마만큼 스크롤했느냐로 생각하면 된다)
> - document.documentElement.offsetHeight는 스크롤을 포함한 전체 페이지 길이이다.



다음과 같이 구현할 경우 컴포넌트에서 아래와 같이 사용 할 수 있다.

```js
const [isFetching, setIsFetching] = useInfiniteScroll(updateVideos);

function updateVideos() {
  getMostPopularVideos(YOUTUBE_API_ONCE_GET_SIZE, videos.nextPageToken)
    .then(result => {
    setVideos(addNewVideo(videos, result));
  }).catch(error => {
    setError(error.message);
  }).finally(() => {
    setIsFetching(false);
  });
}

useEffect(() => {
  updateVideos();
}, []);
```

### 2. Scroll Event 최적화

위와 같이 무한스크롤을 구현하면, scroll event가 너무 많이 발생하므로 throttle를 이용한 방법으로 최적화를 시키는 것이 가장 일반적인 방법이다.

그리고 더 나아가서 [rAF(requestAnimationFrame)](https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame) 를 이용해 Animation frames를 이용해서도 최적화를 시킬 수 있다.

#### 2-1. throttle 이용

[throttle](https://lodash.com/docs/#throttle)를 이용하면 Scroll Event의 핸들러가 호출되는 정도를 조절 할 수 있다.

> lodash의 throttle 사용.

예를들어서 300ms를 기준으로 설정해놓는다면, scroll을 하고 있는 동안에는 300ms씩 마다 이벤트 핸들러가 호출이되어서 scroll event 핸들러의 호출 빈도를 줄일 수 있다.

> 더 자세히 알고싶다면 [throttle vs debounce](https://css-tricks.com/the-difference-between-throttling-and-debouncing/) 를 확인하자.

```js{2,9-14}
import { useState, useEffect } from "react";
import { throttle } from "lodash";

const THROTTLE_WAIT = 300;

export default function useInfiniteScroll(fetchCallback) {
  const [isFetching, setIsFetching] = useState(false);

  const handleScrollThrottle = throttle(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
      setIsFetching(true);
    }
  }, THROTTLE_WAIT);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollThrottle);
    return () => {
      window.removeEventListener('scroll', handleScrollThrottle);
    };
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchCallback();
  }, [isFetching]);

  return [isFetching, setIsFetching];
}
```

#### 2-2. rAF 사용

참조 : [jbee님의 Scroll Event 최적화](https://jbee.io/web/optimize-scroll-event/)

위의 throttle을 사용하는 방법은 throttle이 내부적으로 **setTimeout을 기반으로 작동하기 때문에** 우리 예상대로인 300ms씩 마다 발생해야 되지만, 무조건 300ms마다 발생시켜준다고 보장되지 않는다.

이 말이 무슨말인가 하면, 300ms마다 작동되지않고 **콜스택이 비워지지않고 다른 기능에 밀리다 밀려서 300ms 가 훨씬 지난 시점에 발생할 수도 있다**는 얘기이다.

`requestAnimationFrame`는 브라우저가 렌더링하는 빈도 60fps(초당 60회)에 맞춰서 실행되는데, 이 말은 **초당 60회의 실행을 좀 더 보장**해준다는 말이다. 

> 브라우저가 렌더링 되기 직전에 넘겨준 콜백 함수가 실행된다.

`requestAnimationFrame`도 똑같이 비동기로 작동되는 것이기 때문에 완벽하게 보장하지 않기도 하고 콜스택에 의해 밀릴 수도 있지만 `requestAnimationFrame`은 `setTimeout`이 처리되는 `task queue`보다 우선순위에 있는 `animation frame`에서 처리되기 때문에 좀 더 최적화 된 방법이라 할 수 있다.

또  `requestAnimationFrame` 을 이용하면  300ms라는 기준을 잡지 않고 60fps에 맞춰 실행되기 때문에 300ms와 같은 별다른 기준점을 주지않아도 된다.

![Execution timing: Event loop with rendering](https://blog.risingstack.com/content/images/2019/01/Execution_timing_event_loop_with_rendering.svg)



자바스크립트 비동기에 대한 더 자세한 작동방법을 알고 싶다면 

Bertalan Miklos의 [Javascript 비동기 작동방법](https://blog.risingstack.com/writing-a-javascript-framework-execution-timing-beyond-settimeout/) 에 관한 글을 읽어보자.

다음으로 소스는 throttle과 같은 최적화를 시켜주는(실행 빈도 조절) 함수를 별도로 만들어야 한다.

아래는 jbee님이 만든 [toFit](https://github.com/JaeYeopHan/gatsby-starter-bee/blob/master/src/utils/event-manager.js) 함수를 참조해서 만든 `throttleOnRendering` 함수이다.

```js
export default function throttleOnRendering(cb) {
  if (!cb) {
    throw Error('Invalid required arguments');
  }

  let tick = false;

  return function() {
    if (tick) {
      return;
    }

    tick = true;
    return requestAnimationFrame(() => {
      tick = false;
      return cb();
    });
  };
}
```

소스에 대한 자세한 내용은 원본 문서를 참조하고, 브라우저 렌더링 실행 빈도에 맞춰서 실행빈도를 조절 할 수 있게 해준다.

> 쉽게말해 브라우저 렌더링에 편승하는 것.

이 `throttleOnRendering`을 이용하면 아래와 같이 코드를 구현할 수 있다.

```js{2,7-12}
import { useEffect, useState } from "react";
import throttleOnRendering from "../utils/throttleOnRendering";

export default function useInfiniteScroll(fetchCallback) {
  const [isFetching, setIsFetching] = useState(false);

  const handleScrollThrottle = throttleOnRendering(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
      setIsFetching(true);
    }
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScrollThrottle);
    return () => {
      window.removeEventListener('scroll', handleScrollThrottle);
    };
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchCallback();
  }, [isFetching]);

  return [isFetching, setIsFetching];
}
```



## IntersectionObserver



## Infinite Scroll VS Pagenation

기본적으로 Infinite Scroll과 Pagenation은 정보를 일부분만 가져와서 보여주고, 성능상의 이점을 제공해준다는 점은 동일하나, 사용자 경험적인 측면에서는 많은 차이가 있다.

Nick Babich가 쓴 [UX: Infinite Scrolling VS Pagenation](https://uxplanet.org/ux-infinite-scrolling-vs-pagination-1030d29376f1) 글을 보면,

### Infinite Scroll

- 장점
  - 사용자 참여 및 콘텐츠 탐색이 쉽다.
  - 클릭하는 것보다 더 나은 사용자 경험을 제공한다.
  - **모바일에 적합하다**
- 단점
  - 스크롤을 해서 가져오는 정보가 많아질 수록 페이지 성능이 느려진다.
  - 정보 탐색이 힘들다. (특정 항목, 첫 위치로 돌아오기가 힘듦)
  - 스크롤 막대로 정확한 정보량을 알 수 없다. (끝에 도달하면 새로 갱신되기 때문에 언제 끝날지 모름)
  - 푸터를 찾기 힘들다.

### Pagenation

- 장점
  - 사용자 의도에 맞게 페이지를 넘길 수 있다.
  - 사용자가 페이지에 통제감을 느낄 수 있다.
  - 특정 항목의 위치를 파악 및 찾기가 쉽다.
- 단점
  - '클릭' 혹은 '다음페이지'를 클릭해야되는 번거로움이 있다.
  - 한페이지에서 매우 제한된 내용을 본다.

각각 다음과 같은 장단점을 설명하고 있다.



### Infinite Scroll과 Pagenation의 용도

위와 같은 장단점들을 잘 고려해서 상황에 따라 적절한 인터페이스를 선택하면 되겠지만,

기본적으로 InfiniteScroll은 이미지, 동영상(썸네일) 등 빠르게 정보를 파악할 수 있는 곳에서,

> 예로 페이스북, 유튜브, 인스타그램 등이 있다.

Pagenation은 정보 파악이 느리거나 목표지향적인 곳에서

> 예로 게시판이 있다.

사용을 하면 된다.

