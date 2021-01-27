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
