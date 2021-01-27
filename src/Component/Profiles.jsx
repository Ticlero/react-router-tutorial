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
