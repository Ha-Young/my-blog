---
title: infinite scroll
draft: true
date: 2021-02-23
category: frontend
tag: ['frontend', 'react']
---



```js
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
        if (!isFetching) {
        	return;   
        }
        fetchCallback();
    }, [isFetching]);
    
    return [isFetching, setIsFetching];
}
```

