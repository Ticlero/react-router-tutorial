# React Router를 활용해 보자!

## React Router 준비

React 라이브러리 자체에는 route 기능이 내장되어있지 않음
그 대신 브라우저 API를 직접 사용하여 이를 관리하거나, 라이브러리를 사용해야 함

리액트 라우팅 라이브러리 종류는 대표적으로 'react-router', 'reach-router', Next.js 등이 존재
가장 역사가 길고 사용 빈도가 높은 **'react-router'**를 설치

```
yarn add react-router-dom
```

## Project에 router 적용

'react-router-dom'에 있는 **BrowserRouter** 컴포넌트는

웹 애플리케이션에 HTML5의 History API를 사용하여 페이지를 새로고침하지 않고도 주소를 변경하고,

현재 주소에 관련된 정보를 props로 쉽게 조회하거나 사용 할 수 있도록 도와줌

```
[index.js]
...
import { BrowserRouter } from 'react-router-dom'
...

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root');
);

```

```
[App.js]

import { Route } from "react-router-dom";
import About from "./Component/About";
import Home from "./Component/Home";

function App() {
  return (
    <div>
      <Route path="/" component={Home}></Route>
      <Route path="/about" component={About}></Route>
    </div>
  );
}

export default App;
```

<Route path="" component={...} exact="true">
exact prop을 주게 되면 정확히 일치하는 경로에 대해서만 컴포넌트리 렌터링 된다.
