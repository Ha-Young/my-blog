---
title: "Lexical Scope? Javascript Scope"
draft: true
date: "2020-11-12"
path: "/javascript/lexicalscope"
category: "javascript"
---

여러분 lexical scope라는 말을 알고계신가용 (알고 계셨다면 죄송합니당...)
수요일날 오피스아워 정리한것을 읽어보는데 제가 lexical this라는 것을 적어놨더라구용 (arrow function에 있는 this는 lexical this라는 말...)
막 아는 것처럼 적어놨는데, 사실 몰랐습니당. 그래서 이게 무엇인지 좀 찾아보았는데용
우선 lexical this란 워딩을 **lexical scope가 적용된 this**로 바꿔야 될 것 같습니당. (lexical this의 의미라고 생각해주셔도 될 것 같습니당)lexical scope란 간단히 말해서 함수가 작동하는 부분이 아닌 **선언된 부분에서 스코프가 결정**된다는 것입니당.
우리가 배웠던 javascript의 scope 작동방식인데용, lexical scope를 따로 배우기 보다는 우리가 배운 이 javascript scope방식이 lexical scope방식이라고 생각하시면 될 것 같습니당.
(반대로 dynamic scope도 있습니당 우리는 javascript를 하기 때문에 굳이 알 필요는 없지만, 다른 언어와의 작동방식 차이로 궁금하시면 알아두시는 것도 좋을 것 같습니당.)아래는 제가 다른 예제 참조하여 만든 예제인데용, 보고 결과를 찾으시면 lexical scope(javascript scope)이해를 잘하고 계시는것이고, dynamic scope의 작동방식을 알면 왜 다르게 작동하는지, dynamic scope와 lexical scope와의 차이를 알 수 있을 것 같습니당

```
var isGood = true;function vanilla() {
    var isGood = false;
    coding();
}function coding() {
    var teacher = 'ken';
    console.log(teacher);
    console.log(isGood);
}vanilla(); // lexical scope 적용과 dynamic scope의 적용결과는 다르다. why?
function vanilla() {
    var isGood = false;
    var teacher = 'ken';
    function coding() {
        var isGood = true;
        console.log(isGood);
        console.log(teacher);
    }
    coding();
}vanilla(); // lexical scope 적용과 dynamic scope의 적용결과는 같음. why?
```