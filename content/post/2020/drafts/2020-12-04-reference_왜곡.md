```js
var mainObject = {
    a: 1,
    b: 2,
    c: function() {
        return 1;
    },
    d: undefined,
};

var json = JSON.stringify(mainObject);
var copyObject = JSON.parse(json);

console.log(copyObject);

var mainArray = [1, 2, undefined, (function foo(){})];

var json = JSON.stringify(mainObject);
var copyObject = JSON.parse(json);

console.log(copyObject);
```

Underdash 과제에서 reference 값을 할당할 때 왜곡이 일어날 수 있는 부분에 대해서
리뷰어님께서 지적해주신 적이 있습니다.
한번 생각해 볼만한 것 같아서 이해하는데 도움되었던 사이트 링크 첨부합니다.
혹시 잘못된 정보가 있다면 알려주세요~
송지연님 감사합니다!
javascript deep copy shallow copy
https://mygumi.tistory.com/322
PS. 깊은 복사 방식중에 JSON.parse(JSON.stringify()); 을 이용하는 경우
복사하려는 값이 객체일 때 속성이 function, undefined 인 경우 undefined로 처리되고
복사하려는 값이 배열일 때 원소가 function, undefined 인 경우 null로 처리된다는 것을 확인했습니다.