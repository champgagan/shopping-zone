import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class SecuredRoute extends Component {
  state = {
    isValidUser: false,
    isChecked: false,
  };
  async componentDidMount() {
    const isAuthenticated = localStorage.getItem("access-token");
    if (!!isAuthenticated) {
      try {
        const result = await axios.post(
          "http://localhost:8001/verifyUser",
          { key: "" },
          { headers: { Authorization: `Bearer ${isAuthenticated}` } }
        );
        this.setState({ isValidUser: true, isChecked: true });
      } catch (err) {
        this.setState({ isValidUser: false, isChecked: true });
      }
    } else {
      console.log("inside the else case without axios");
      this.setState({ isValidUser: false, isChecked: true });
    }
  }

  render() {
    const Component = this.props.component;
    const { isValidUser } = this.state;
    if (this.state.isChecked) {
      return !isValidUser ? (
        <Redirect to={{ pathname: "/login" }} />
      ) : (
        <Component />
      );
    } else {
      return <h1>Loading......</h1>;
    }
  }
}

export default SecuredRoute;
