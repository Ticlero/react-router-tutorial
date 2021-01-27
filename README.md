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

exact prop을 주게 되면 정확히 일치하는 경로에 대해서만 컴포넌트리 렌터링 된다.

## Link Component 사용하여 다른 주소로 이동

Link 컴포넌트를 클릭하면 다른 주소로 이동시켜 주는 컴포넌트

- 일반 웹 앱이라면 a태그를 사용하여 페이지 전환을 하지만, 리액트 라우터를 사용할 때는 이 태그를 직접 사용하면 안된다.
- 이 'a' tag는 페이지를 전환하는 과정에서 페이지를 새로 불러오기 때문에 React앱이 가지고 있던 State들을 모두 날려버리게 된다.
- Link 컴포넌트는 HTML5 History API를 사용하여 페이지의 주소만 변경

```
[App.js]
import { Link, Route } from "react-router-dom";
import About from "./Component/About";
import Home from "./Component/Home";

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
      </ul>
      <Route path="/" exact="true" component={Home}></Route>
      <Route path="/about" component={About}></Route>
      //<Route path={["/about", "/info"]} component={About}></Route> 이렇게 여러개의 path를 줄 수도 있음 - react-router-dom ver5 부터 적용 됨
    </div>
  );
}

export default App;

```

## URL Parameter 와 Query

파라미터: /profile/velopert
쿼리: /about?details=true

일반적으로
**parameter**는 특정 아이디 혹은 이름을 사용하여 조회할 때 사용.
**query**는 우리가 어떤 키워드를 검색하거나 페이지에 필요한 옵션을 전달할 때 사용.

### URL parameter

URL 파라미터를 사용할 때는 라우트로 사용되는 컴포넌트에서 받아 오는 match라는 개체 안의 params 값을 참조.
match 객체 안에는 현재 컴포넌트가 어떤 경로 규칙에 의해 보이는지에 대한 정보가 들어가있음.

```
[App.js]
import { Link, Route } from "react-router-dom";
...

function App() {
  return (
    <div>
      <ul>
        ...
        <li>
          <Link to="/profile/velopert">velopert 프로필</Link>
        </li>
        <li>
          <Link to="/profile/fiance">fiance 프로필</Link>
        </li>
      </ul>
      ...
      <Route path="/profile/:username" component={Profile}></Route>
    </div>
  );
}

export default App;
```

```
[Profile.jsx]
import React from "react";

const data = {
  velopert: {
    name: "장성현",
    description: "리액트를 좋아하는 개발자",
  },
  fiance: {
    name: "강예린",
    description: "오예",
  },
};

function Profile({ match }) {
  const { username } = match.params;
  const profile = data[username];

  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }

  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
    </div>
  );
}

export default Profile;

```

### URL query

query 문자열을 객체로 변환할 때는 **qs** 라이브러리를 사용

```
yarn add qs
```

url query는 '?details=true&another=1'과 같이 문자열에서 여러 가지 값을 줄 수 있음

parameter에서는 'match'객체의 'params'를 이용했던 것처럼

query는 'location' 객체에 들어있는 'search' 값에서 조회가 가능

query는 항상 **문자열**이라는 것을 주의해야함

```
[About.jsx]

import React from "react";
import qs from "qs";
function About({ location }) {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true, //이 설정을 통해 query string의 맨 앞의 '?'를 생략함
  });
  const showDetail = query.detail === "true"; // query string의 파싱 결과 값은 'String'이다.
  return (
    <div>
      <h1>Introduce</h1>
      <p>이 페이지는 라우터 기초를 해 보는 페이지 이다.</p>
      {showDetail && <p>detail 값을 true로 설정하셨군요!</p>}
    </div>
  );
}

export default About;

```

## Sub Route

서브 라우트는 라우트 내부에서 또 라우트를 정의하는 것을 의미
라우트로 사용되고 있는 컴포넌트 내부에 Route를 또 사용하면 된다.

```
import { Link, Route } from "react-router-dom";
import Profiles from "./Component/Profiles";

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필</Link>
        </li>
      </ul>
      <Route path="/profiles" component={Profiles}></Route>
    </div>
  );
}

export default App;

```

```
import React from "react";
import { Link, Route } from "react-router-dom";
import Profile from "./Profile";

function Profiles() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/profiles/velopert">velopert</Link>
        </li>
        <li>
          <Link to="/profiles/fiance">fiance</Link>
        </li>
      </ul>
      <Route
        path="/profiles"
        exact // = exact={true}
        render={() => <div>사용자를 선택해 주세요</div>}
      ></Route>
      <Route path="/profiles/:username" component={Profile}></Route>
    </div>
  );
}

export default Profiles;
```

## 리액트 라우터 부가 기능

### history

이 객체는 라우트로 사용된 컴포넌트에 match, location과 함께 절달되는 props중 하나로, 이 객체를 통해 컴포넌트 내에 구현하는 메서드에서 라우터 API를 호출 할 수 있ㄷ음

```
[HistorySample.jsx]

import React, { Component } from "react";

export default class HistorySample extends Component {
  //뒤로 가기
  handleGoBack = () => {
    this.props.history.goBack();
  };
  //주어진 parameter or query로 가기
  handleGoHome = () => {
    this.props.history.push("/"); //홈으로 가기
  };

  componentDidMount() {
    //이것을 설정하고 나면 페이지에 변화가 생기려고 할 때마다 정말 나갈 것인지를 질물 함.
    this.unblock = this.props.history.block(`정말 떠나실 건가요?`);
  }

  componentWillUnmount() {
    //컴포넌트가 언마운트되면 질문을 멈춤
    if (this.unblock) {
      this.unblock();
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handleGoBack}>뒤로</button>
        <button onClick={this.handleGoHome}>홈으로</button>
      </div>
    );
  }
}
```

```
import { Link, Route } from "react-router-dom";
import HistorySample from "./Component/HistorySample";

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/history">History 예시</Link>
        </li>
      </ul>
      <Route path="/history" component={HistorySample}></Route>
    </div>
  );
}

export default App;

```

### withRouter

이 함수는 HoC(High-order-Component)이다.

라우트로 사용된 컴포넌트가 아니어도 'match', 'location', 'history' 객체를 접근 할 수 있게 해준다.

```
import React from "react";
import { withRouter } from "react-router-dom";

function WithRouterSample({ match, location, history }) {
  return (
    <div>
      <h4>location</h4>
      <textarea
        value={JSON.stringify(location, null, 2)}
        rows={7}
        readOnly={true}
      ></textarea>
      <h4>match</h4>
      <textarea
        value={JSON.stringify(match, null, 2)}
        rows={7}
        readOnly={true}
      ></textarea>
      <button
        onClick={() => {
          history.push("/");
        }}
      >
        홈으로
      </button>
    </div>
  );
}

export default withRouter(WithRouterSample);

```

### Switch

**Switch** 컴포넌트는 여러 Route를 감싸서 그중 일치하는 단 하나의 라우트만을 렌더링 시켜줌.
이 컴포넌트를 사용하면 모든 규칙과 일치하지 않을 때의 보여 줄 Not Found 페이지도 구현 가능해 짐.

```
import { Link, Route, Switch } from "react-router-dom";
import About from "./Component/About";
import HistorySample from "./Component/HistorySample";
import Home from "./Component/Home";
import Profiles from "./Component/Profiles";

function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필</Link>
        </li>
        <li>
          <Link to="/history">History 예시</Link>
        </li>
      </ul>
      <hr />
      <Switch>
        <Route path="/" exact={true} component={Home}></Route>
        <Route path={["/about", "/info"]} component={About}></Route>
        <Route path="/profiles" component={Profiles}></Route>
        <Route path="/history" component={HistorySample}></Route>
        <Route
          render={({ location }) => {
            return (
              <div>
                <h2>이 페이지는 존재하지 않습니다.</h2>
                <p>{location.pathname}</p>
              </div>
            );
          }}
        ></Route>
      </Switch>
    </div>
  );
}

export default App;

```

### NavLink

Link 컴포넌트와 기능이 비슷하다.

현재 경로와 Link에서 사용하는 경로가 일치하는 경우 특정 스타일 혹은 CSS클래스를 적용할 수 있는 컴포넌트
링크가 활성화되었을 때의 스타일 적용은 **activeStyle** 값을, CSS 클래스를 적용할 때는 **activeClassName** 값을 props로 넣어주면 된다.

```
import React from "react";
import { Link, NavLink, Route } from "react-router-dom";
import Profile from "./Profile";

function Profiles() {
  const activeStyle = {
    background: "black",
    color: "white",
  };
  return (
    <div>
      <h3>사용자 목록:</h3>
      <ul>
        <li>
          <NavLink activeStyle={activeStyle} to="/profiles/velopert">
            velopert
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/profiles/fiance">
            fiance
          </NavLink>
        </li>
      </ul>
      <Route
        path="/profiles"
        exact
        render={() => <div>사용자를 선택해 주세요</div>}
      ></Route>
      <Route path="/profiles/:username" component={Profile}></Route>
    </div>
  );
}

export default Profiles;

```
