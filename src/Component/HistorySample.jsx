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