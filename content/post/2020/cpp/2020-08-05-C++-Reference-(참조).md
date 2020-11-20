---
title: "C++ Reference (참조)"
date: "2020-08-05 21:27:00"
draft: false
path: "/cpp/Ref05"
category: 'cpp'

---

### C++ Reference (참조)

초창기 C에서 C++로 넘어올 때, 추가된 개념인데 C, C++ 개발자 사이에서는 호불호가 많이 갈리는 기능인 것 같다.

어떠한 사람들은 포인터로 다 대체가 되기 때문에 포인터만 쓰는 것이 좋다고 하고 어떠한 사람들은 포인터보다 편하기 때문에 사용하기 좋아하는 것 같다.

우선 Reference 문법은

- 자바와 비슷하지만 성능저하가 없다. (자바는 안정성을 위해 포인터를 없앰 - 매니지드)

- 똑같이 C++에서 안정성을 보장해야 될 때 Reference를 쓰면 된다.

>  **하지만, 주소연산(포인터연산)이나 주소값 변경 등을 할 때에는 꼭 포인터를 써야 된다.**
>
> Call by Reference  < - > Call by Value

- Java에서는 원시타입을 제외한 타입 (Object)은 모두 Reference.
- C, C++은 모든 타입에 똑같이 동작한다.
  object도 참조에 의한 연산을 하려면 포인터로 받아야 한다.



### C++에서 사용

C++에서 사용할 때 &(엠퍼센드) 기호를 붙여서 표현한다.

- C++에서 참조는 별칭

```C++
int number = 100;
int& reference = number;
```

다음과 같이 number를 참조로 reference변수명을 통해 접근가능하다.

-  NULL이 될 수 없다

```C++
int& reference = NULL; // ERROR
```

- 초기화 중에 반드시 선언되어야 한다

```C++
int& reference; // ERROR
```

- 참조하는 대상을 바꿀 수 없다.

```C++
int number1 = 100;
int number2 = 200;
int& reference = number1;
reference = number2;
```

**이렇게 하면 reference가 참조하는 변수 number1의 값이 바뀐다.**

그래서 number1, number2 모두 200의 값이 된다.



### Swap 함수를 통한 포인터과 Refence비교

- Pointer

```C++
void swap(int *number1, int *number2)
{
    int temp = *number1;
    *number1 = *number2;
    *number2 = temp;
}
```

* Reference

```C++
void swap(int& number1, int& number2)
{
    int temp = number1;
    number1 = number2;
    number1 = temp;
}
```



### 참조의 장점

- null 값이 들어갈 수 없어서 안전하다.
- 우리가 소유하지 않은 메모리에 접근 할 수 없어 안전.



### 컴퓨터는 참조가 뭔지 알까?

컴퓨터는 참조가 무엇인지 모르는데,
포인터와 참조를 빌드시켜서 어셈블리어를 살펴보면 똑같은 어셈블리어로 만들어져 있는걸 확인 할 수 있다.

이를 통해 실제로 빌드가 되면 포인터와 참조는 같은것이라고 볼 수 있고
단지, 인간이 코드를 이해하기 쉽게, 포인터 대신에 사용할 수 있게 하는 것이라고 볼 수 있다.
(실수도 막아준다)

컴파일러가 참조를 포인터로 바꿔주는 것.(기계가 이해 할 수 있도록)



### 추천하는 코딩표준

- 읽기전용 매개변수는 상수참조로

```c++
const int& a
```

- 출력결과용 매개변수는 포인터로

```C++
int* result
```

어쨋든, 둘 다 함수내에서 assert 함수를 통해 null 체크를 해야한다.

C#에서는 out키워드를 이용하면된다.



### 정리

- 참조
- 포인터와 참조에 대한 코딩표준