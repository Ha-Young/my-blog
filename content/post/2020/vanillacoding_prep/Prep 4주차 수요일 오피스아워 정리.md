---
title: "Prep 4주차 수요일 오피스아워 정리"
draft: false
date: "2020-10-28 22:00"
path: "/vanillacoding/prep/week4_op2"
category: "vanilla coding"
---





## strict mode?

함수가 regular function call로 실행되었을 때 글로벌객체로 잡히는 this를 undefined로 처리.



## this사용

- 함수가 실행되었을 때 결정이 된다.
- **어떻게 실행되었느냐**

1. regular function call
   - 내부에서 this가 전역객체로 작용
     - strict mode 적용시 undefined!
2. dot notation
   - 호출 한 객체 (`some`.func() 에서의 `some` 과 같은)로 적용
3. call, apply, bind
   - 이 함수들의 인자로 받아 explicit binding된 객체
     - primitive value면 객체로 변환된다.
4. new keyword
   - new keyword로 실행된 함수는 생성자 함수이고, 이 함수 내부에서의 this는 빈 객체 `{}`로 작용!



## strict mode 쓰는 이유?

- 오류 방지
- 오류 미리 발견
- 실수 방지
- 전역객체 접근 방지
- 오류 위치 파악
- 등등...



## 애러(오류)를 두려워 하지 말자

애러, 오류, 버그를 두려워 하지 말자.

사실 이들은 우리 코드의 잘못된 부분을 빨리 알려준다고 보면 된다.

오류의 정확한 위치를 빨리 파악을 하면 올바르고 빠르게 디버깅을 해서 오류를 해결 할 수 있다.



## 문제 풀어봅시당

**1**.

```js
function getName() {
    return this.title;
}

var ken = {
    title: 'ken',
    getName: getName
};

var wan = {
    title: 'wan',
    getName: getName
};

var title = getName();

console.log(title);
```

**2.**

```js
function getName() {
    return this.title;
}

var ken = {
    title: 'ken',
    getName: getName
};

var wan = {
    title: 'wan',
    getName: getName
};

var func = wan.getName;
var title = func();

console.log(title);
```

**3.**

```js
function getName() {
    return this.title;
}

var ken = {
    title: 'ken',
    getName: getName
};

var wan = {
    title: 'wan',
    getName: getName
};

var title = wan.getName();

console.log(title);
```

**4.**

```js
function getName() {
    return this.title;
}

var ken = {
    title: 'ken',
    getName: getName
};

var wan = {
    title: 'wan',
    getName: getName.bind(ken)
};

var func = wan.getName;
var title = func();

console.log(title);
```



아래 사이트 문제도 풀어보자.

[take this quiz](https://dev.to/liaowow/take-this-quiz-understand-how-this-works-in-javascript-44dj)



## Q.arrow function? lexical this?

arrow function은 기본적으로 일반적인 함수 선언, 표현문과 다르게 this가 없다.

그래서 laxical this(스코프내에 존재하는 this) 가 적용되는 것.

현재 함수 스코프내에 this가 없다면 상위 스코프로 탐색해간다.



## Q.new?

new keyword로 실행된 함수는 생성자 함수이고, 이 함수 내부에서의 this는 빈 객체 `{}`로 작용!



## call apply bind

모두 다 **explicit binding** 함수.

this를 명백하게 지정해서 함수에 연결시킨다.

#### call(), apply()

인자로 넣은 this를 바인딩시켜 함수를 실행한다.

call과 apply차이는 인자 수의 차이.

- call (thisArgs, arg1, arg2, arg3.....)

  - 원본함수의 인자들을 call의 this인자 다음 각각의 인자값으로

- apply (thisArgs, [ arg1, arg2, arg3 ])

  - 원본함수의 인자들을 apply this인자 다음의 배열안에 담아서... 

  

상황에 따라 사용하면 되었지만,  es6에서 spread 연산자가 도입되면서 사용에 크게 차이가 없어졌다.

#### bind()

위 call, apply와 다르게 **함수 실행 X** 
**인자로 넣은 객체가 this로 바인딩 된 새로운 함수를 리턴한다.**



## Q.깜장썬글레스 문제

```js
var status = "❤";

setTimeout(() => {
    const status = "🙌";
    
    const data = {
        status: "🎁";
        getStatus: () => {
            return this.status;
        }
    };
    
    console.log(data.getStatus()) // ???
    var message = data.getStatus.call(this);
	console.log(message); // ???
}, 10);
```

풀어보자.



#### getStatus가 화살표 함수가 아니라 getStatus: function() {} 라면?

결과는 위와 똑같다.

하지만 자세한 설명은 Closer와 관계가 있어서 나중에 배우니 지금은 Pass!



## call()에 thisArgs로 Primitive value?

thisArgs가 Obj로 변환된다.

자세한 내용은 공식문서 참조.



## this 강의 Quiz 해설

```js
const something = {
    age: 10,
    speak: function () {
        console.log(this.age);
    }
};

const butler = {
    age: 20,
    serve: function (cb) {
        cb();
    }
};

butler.serve(something.speak);
```

맨 마지막 `butler.serve(something.speak)`에서 `something.speak`를 인자로 넘기는 것이 포인트이다.

인자로 넘긴다고 바로 실행되는것이 아니라,
butler의 serve함수에서 인자로 받고 실행시키는 구문은 11라인에서 하기 때문에 이 위치에서의 사용이 speak함수 내부의 this를 결정시킨다. 



```js
function Programmer() {
    this.isSmart = false;
    
    this.upgrade = function (version) {
        this.isSmart = !!version;
        work();
    };
    
    return this;
}

function work() {
    if (this.isSmart) {
        window.alert("I can do ...");
    }
}

const programmer = new Programmer();

programmer.upgrade(1);

// 14줄의 alert가 실행?
```

이 문제는 간단한데,

work() 함수가 regular function call이 적용되어서 this가 전역객체이고, isSmart 속성이 없기때문에 실행되지 않는다.



#### 실행순서

1. `const programmer = new Programmer()` 로 new keyword (생성자함수)로 실행이 된다.

2. `Programmer()` 함수가 생성자 함수로 실행이 되면서, 내부의 this는 빈 객체로 작용.

3. 빈 객체 `{}`에 `isSmart` 속성값, `upgrade()` 메서드 생성 후 객체 리턴 

   - ```js
     {
         isSmart: false,
         upgrade: function (version) {
             this.isSmart = !!version;
             work();
         };
     }
     ```

     로  반환되었다.

4. `const programmer` 변수로 생성자로 생성된 객체 받음.

5. `programmer.upgrade(1)` 로 `upgrade()` 함수 실행 

   - Programmer 생성자 함수로 생성된 객체의 `upgrade()` 메소드이다.

6. `upgrade` 메소드 실행시 내부의 **this는 programmer 객체** 즉, 위 Person 생성자 함수로 만들었던 객체.

7. 따라서 `this.isSmart = !!version` 값은 `this.isSmart = !!1`

   - !!로 !연산자를 두번 하면 Boolean 형으로 변환시키는 것. 그래서 1은 Truthy이므로 true가 된다.

8. **this 가 programmer 객체**이므로 false로 설정되어있던 programmer객체의 **isSmart 값이 true로 바뀐다**.

9. 그리고 `work()` 함수 실행.

10. work 함수가 실행될 때에는 general function call 이므로 내부의 this는 전역객체.

11. 전역객체에 isSmart라는 속성은 없으므로 alert는 실행되지 않는다.



**work.call(this) 라고 했다면,  alert 실행.**

이 당시의 call의 argumet로 넘기는 this는 programmer객체 자신이므로.



## Q. 일반함수 선언시 전역객체의 method이므로, 실은 window.메서드() 가 되어서 내부적으로는 dot notation이 적용되는 것이 아닌가?

**일단 this값은 함수 선언시에 결정 되지 않는다!!**

또한, **일반함수 선언시에 무조건 전역객체의 메서드가 되지도 않는다.**



아래 예제에서 bar는 전역객체의 메서드가 아니다!

```js
function vanilla () {
    function coding () {
        console.log(this.title);
    }
    
    coding();
    console.log(this.title);
}

var ken = {
    title: 'ken',
    work: vanilla
};

ken.work();
```



## Q. strict mode로 전역객체 참조가능?

```js
function someFunc () {
 // ToDo   
}
```

함수 선언시에 전역객체의 메서드로 들어가지는데,

strict mode로 선언했을 때 
`window.someFunc()` 로 사용가능?



된다. 자세한 사항은 공식문서에서 찾아보자.



## Q. strict mode 상태로 웹이나 앱 서비스 괜찮은가?

괜찮다. 

요즘에는 **다 strict mode가 기본**.



## ETC

- 강하게 키우시는 켄님
  - 절벽에서 밀어서...
- 앞으로 일 하려면 멘탈이 굉장히 중요하다.
- 부트캠프 코딩테스트는 한시간에 두문제!
  - 문제당 20분, 40분씩
  - 난이도는 마지막 과제와 수준이 비슷하다.
  - 요구사항에 맞는 함수를 구현하는 형식. (쉽지는 않을거다)
  - prep 미수강자는 3문제! 1시간 30분!
  - 16명 인원 제한 하지만 추가로 받을 수 있다. ( 노력하며 가능성이 있으신 분들 )
- **금요일까지 말 끝에 ㅇ을 받침으로 해야합니당**
- 켄님 녹화시에 화면 크게 해주셔야됩니당