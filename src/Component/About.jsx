import React from "react";
import qs from "qs";
function About({ location }) {
  console.log(location);
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const showDetail = query.details === "true";
  return (
    <div>
      <h1>Introduce</h1>
      <p>이 페이지는 라우터 기초를 해 보는 페이지 이다.</p>
      {showDetail && <p>details 값을 true로 설정하셨군요!</p>}
    </div>
  );
}

export default About;
