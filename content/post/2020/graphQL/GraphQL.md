---
title: "GraphQL이란?"
date: "2020-08-28 18:00"
draft: false
path: "/GraphQL/what"
category: 'graphQL'

---

![graphql](https://graphql-kr.github.io/img/logo.svg)

GraphQL은 웹 개발을 하는 사람이면 한번쯤 들어봤을 것 같다.

특히나 웹 프론트앤드쪽을 공부한다면 제법 많이 들어봤을 것인데,
나는 웹 프론트앤드 공부를 하다가 스쳐지나가면서 많이 봤고 나중에 React나 다른 프론트앤드
기술을 완벽하게 익힌다음에 넘어가서 배울거라고 생각했었다.

하지만 블로그를 Gatsby로 만드려고 하다보니 GraphQL을 알아야 될 수 밖에 없었는데,
Gatsby 기술스택에 GraphQL 있어서 알아보았다.

(여기저기 찾아봤는데 그 중에서 너무 설명을 잘 한 유튜브가 있어서 추천.)

[![YouTube](http://img.youtube.com/vi/EkWI6Ru8lFQ/0.jpg)](https://www.youtube.com/watch?v=EkWI6Ru8lFQ)



### GraphQL?

GraphQL은 위키백과를 참고하자면

> 그래프QL은 페이스북이 2012년에 개발하여 2015년에 공개적으로 발표된 데이터 질의어이다. 그래프QL은 REST 및 부속 웹 서비스 아키텍처를 대체할 수 있다. 클라이언트는 필요한 데이터의 구조를 지정할 수 있으며, 서버는 정확히 동일한 구조로 데이터를 반환한다. 그래프QL은 사용자가 어떤 데이터가 필요한 지 명시할 수 있게 해 주는 강타입 언어이다. 이러한 구조를 통해 불필요한 데이터를 받게 되거나 필요한 데이터를 받지 못하는 문제를 피할 수 있다.

라고 되어있다.

요약하자면

1. 그래프QL은 데이터 질의어이다. (다른 데이터질의어는 SQL이 있겠다.)
2. REST, 웹 서비스 아키텍처를 대체할 수 있다.
3. 클라이언트가 필요한 데이터의 구조를 지정하면 서버는 그 구조 그대로 데이터를 반환하기 때문에
   불필요한 데이터나 필요한 데이터를 받지 못하는 문제를 피할 수 있다.

앞서 동영상을 봤다면 이 말이 확 이해가 될 것이라고 생각한다.

[GraphQL의 공식페이지]("https://graphql.org")에서는 GraphQL을 한 마디로 설명하는데,

> **API를 위한 쿼리 언어**
>
> GraphQL은 API를 위한 쿼리 언어이며 이미 존재하는 데이터로 쿼리를 수행하기 위한 런타임 입니다. GraphQL은 API에 있는 데이터에 대한 완벽하고 이해하기 쉬운 설명을 제공하고 클라이언트에게 필요한 것을 정확하게 요청할 수 있는 기능을 제공하며 시간이 지남에 따라 API를 쉽게 진화시키고 강력한 개발자 도구를 지원합니다.

라고 되어있다.

제일 두드러지는 GraphQL의 특성은 아무래도 설정된 데이터set을 한꺼번에 받는 REST API와는 다르게 **데이터 set 중에서 원하는 데이터만을 추출**하는 것이 아닐까 한다.



### 기존 방식과 차이

이는 기존에 서버에서 클라이언트가 받을 데이터를 설계하거나 예측해서 API를 설계하는 서버중심에서 

GraphQL 클라이언트가 필요한 데이터를 GraphQL이라는 질의어로 뽑아 쓸 수 있다는 것인데, 클라이언트 쪽에서 데이터를 다루기 훨씬 편리해졌다고 볼 수 있다.

```sql
SELECT plot_id, species_id, sex, weight, ROUND(weight / 1000.0, 2) FROM surveys;
```

```gql
{
  hero {
    name
    friends {
      name
    }
  }
}
```

참조 : [kakao Tech](https://tech.kakao.com/2019/08/01/graphql-basic/)



![RestAPI vs GraphQLAPI](http://tech.kakao.com/files/graphql-mobile-api.png)

출처 : https://blog.apollographql.com/graphql-vs-rest-5d425123e34b

위 사진과 같이 REST API의 한계는 모든 데이터들이 필요할 때 각각의 API를 요청해야 되지만, GraphQL의 경우에는 Graphql 질의어를 잘 작성한다면 모든 데이터를 한번에 가져 올 수 있다.

이는 클라이언트에서 비동기적으로 API를 사용해 데이터를 가져오는데 있어서 REST API보다 훨씬 더 안전해졌다고 볼 수 있겠다.

```gpl
{
  human(id: "1000") {
    name
    height
  }
}

```

그리고 특정 한 데이터만 가져올 땐 위와같이 property설정으로 가능하다.

좀 더 다양한 질의 방식을 보고 싶다면
[여기](https://bricoler.tistory.com/2)를 참조하자.

### 어떠한 방식인가?

1. 클라이언트에서 필요한 데이터들을 GraphQL질의로 서버에 요청하면
   (필요한 데이터들을 정의)

2. HTTP POST 방식으로 데이터가 날라가게 된다.
   (REST API와 차이점. REST API는 데이터 요청할 때 GET 방식 사용)
3. 서버측에서 GraphQL Resolver로 설정한 함수에서 받아 클라이언트에서 요청한 데이터를 DB에서 뽑는다.
   (GraphQL에 의해 클라이언트에서 요청한 데이터만)

4. 결과를 JSON으로 Response에 실어서 전달.

5. 클라이언트에서 필요한 데이터만 JSON으로 받아 데이터 처리



### 그럼 데이터 생성과 삭제는?

자 그럼 데이터 요청은 위에서 살펴봤던대로 graphQL질의어로 하면 되지만, 생성과 삭제는 어떻게 할까?

GraphQL에서는 **쿼리/뮤테이션** 으로 질의 방식이 나뉜다고 볼 수 있는데,

- **쿼리** 방식은 데이터 리드(Read) 즉, 읽을 때의 방식이고

```gql
query Hero($episode: Episode, $withFriends: Boolean!) {
  hero(episode: $episode) {
    name
    friends @include(if: $withFriends) {
      name
    }
  }
}
```

(앞에서 쭉 봤던 gql질의어에 앞에 query키워드가 붙었다고 보면 된다.)

- **뮤테이션** 방식은 흔히 우리가 DB에서 말하는 CUD(Create, Update, Delete)에 대한 방식이다.

```gql
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
```

다음과 같이 mutation 키워드를 사용하면서 create를 질의할 수 있다.

