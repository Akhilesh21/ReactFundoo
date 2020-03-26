import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ResponsePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    setTimeout(() => {
      this.props.history.push("/login");
    }, 5000);
  }
  render() {
    return (
      <div className="responsepage">
        <h1>Request has been sent for Forgot password</h1>
        <h1>Please check Mail</h1>
      </div>
    );
  }
}

export default withRouter(ResponsePage);
