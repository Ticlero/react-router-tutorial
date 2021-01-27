import React from "react";
import WithRouterSample from "./WithRouterSample";

const data = {
  velopert: {
    name: "장성현",
    description: "개발을 좋아하는 개발자",
  },
  fiance: {
    name: "강예린",
    description: "장성현과 곧 약혼할 사람",
  },
};

function Profile({ match }) {
  console.log(match);
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
      <WithRouterSample />
    </div>
  );
}

export default Profile;
