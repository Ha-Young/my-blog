---
title: "javascript prototype 생성자 함수 내부에 체이닝을 하면 안되는 이유"
draft: true
date: "2020-11-12"
path: "/javascript/protype_constructor_doNotChaning"
category: "javascript"
---





```
const House = function(width, length, height) {  
  this.width = width;
  this.length = length;
  this.height = height;
};
House.prototype.calculateArea = function() {
  return (this.width * this.height) + "㎡"
};
House.prototype.calculateVolume = function() {
  return (this.width * this.length * this.height) + "㎥"
}
const Room = function(width, length, height, hasWindows) {
  if (width < 3 || length < 3 || height < 3) {
    throw new Error("Is this room really? Okay, so I'll give you DOOM.")
  }
  House.call(this, width, length, height);
  this.hasWindows = hasWindows;
  this.numbersOfWindows = function() {
    if (!this.hasWindows) {
      return 0;
    } else if (this.width < 9 && this.length < 9) {
      return 1;
    } else {
      return 2;
    }
  }
  Room.prototype = Object.create(House.prototype);
  Room.prototype.constructor = Room;
};
// Room.prototype = Object.create(House.prototype);
// Room.prototype.constructor = Room;
const myHouse = new House(6, 6, 4);
const myRoom = new Room(3, 3, 3, false);
console.dir(Room);
console.log('my Room area is', myRoom.calculateArea(), '/' , 'my Room volume is', myRoom.calculateVolume());
```

위 코드 대로 실행하면 제일 아랫 줄의 `console.log('my Room area is', myRoom.calculateArea(), '/' , 'my Room volume is', myRoom.calculateVolume());`코드는 에러를 던집니다. 하지만 주석 처리된 코드를 해제하고 위에 함수 내부의 동일한 코드를 주석 처리 한 뒤 실행해보면 아랫 줄의 콘솔이 정상적으로 작동합니다.
그런데 오류가 발생할 때 `Room` 디렉토리를 보면 `caculateArea`와 `caculateVolume`을 상속받고 있다고 나옵니다.(아래 사진 첨부)
그래서 왜 오류가 나오는지 궁금했습니다. ![:thinking_face:](https://a.slack-edge.com/production-standard-emoji-assets/10.2/google-medium/1f914.png)(실제로 사용하기에 적절한 코드는 아니지만 공부하다보니 궁금해졌습니다... ![:point_right:](https://a.slack-edge.com/production-standard-emoji-assets/10.2/google-medium/1f449.png)![:point_left:](https://a.slack-edge.com/production-standard-emoji-assets/10.2/google-medium/1f448.png))





## 나의 답변

상엽님 이거는 생성자함수인 `Room`을 dir 하기보다는 생성자함수로 생성된 객체인스턴스인 `myRoom`을 dir 해보는게 맞을 것 같아요!실제로 `dir(myRoom)` 해보면 결과가 다르게 나옵니다!생성자 함수에 prototype 상속 체인 작업

> ( `Child.prototype = Object.create(Parent.prototype)` )

을 해두면 **생성자 함수가 호출되었을 때 생성자 함수에 prototype 상속 체이닝이 일어나기 때문에** 맨 처음 생성한 객체 인스턴스에 대해서는 prototype 상속이 제대로 이뤄지지 않습니다!
(Prototype 체이닝이 생성자 함수를 호출하지 않으면 이뤄지지 않음)두번째로 객체 인스턴스를 생성하면 그때는 프로토타입 체이닝이 되어 있으므로 잘 작동 할 거예요.
그리고 저렇게 해두고 작업을 하면 어제 캔님이 말씀하셨듯이 생성자가 호출 될 때마다 프로토타입 체이닝을 하므로, 비효율 적이고 이렇게 첫번째 객체인스턴스는 제대로 작동을 하지 않기때문에 잘못된 방법이라 할 수 있을 것 같아요.이 순서대로 한번 해보시고 비교해보시면 이해하실 거예요!

1. 생성자 함수 내부에 `Object.create()` 한 것과 외부에 한 것 dir(myRoom) 비교 해보기
2. 생성자 함수 내부에 `Object.create()` 해두고 새로운 객체 생성 전에 `dir(Room)` 해보기 (생성자 함수 호출 X)
3. 2번 후 새로운 객체(인스턴스) 생성(생성자 함수 호출) 후에 `dir(Room)` 해보기
4. 처음만든 객체 인스턴스에서는 당연히 상속이 제대로 이루어지지 않아 애러가 날 것.
5. 다시 한번 객체 인스턴스 생성후 `dir(newInstance)` 해보기

이렇게 한번 해보세요~



생성자 함수 내부에서 `Room.prototype = Object.create(House.rpototype)` 을 하더라도 이미 인스턴스로 생성된 `this` 는 `Room.prototype = Object.create(House.rpototype)` 이 반영되어있지 않은 상태로 생성되어져 버렸기 때문에 바로 적용이 안되는것이구요. 내부에서
`console.log(this.__``*proto__)*` 해보시면 Object입니다.순서가

```
const Room = function (width, length, height, hasWindows) {
  if (width < 3 || length < 3 || height < 3) {
    throw new Error("Is this room really? Okay, so I'll give you DOOM.");
  }
  House.call(this, width, length, height);
  this.hasWindows = hasWindows;
  this.numbersOfWindows = function () {
    if (!this.hasWindows) {
      return 0;
    } else if (this.width < 9 && this.length < 9) {
      return 1;
    } else {
      return 2;
    }
  };
};var myRoom = new Room(3,3,3,false);Room.prototype = Object.create(House.prototype);
Room.prototype.constructor = Room;dir(myRoom);
```

와 같다고 보시면 될 것 같습니다.이렇게 되면 myRoom객체의 prototype은 Object이죠