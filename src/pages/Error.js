import React, { Component } from "react";
import Help from "./Help";
class Error extends Component {
  locationName = "";
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      locationName: null,
    };
  }
  componentDidCatch = (error, info) => {
    this.setState({ hasError: true, locationName: this.props.loc });
  };

  render() {
    if (this.state.hasError && this.state.locationName === this.props.loc) {
      return (
        <>
          <p>
            {" "}
            Sorry there is some technical problem.Please visit after sometime
          </p>
          <Help />
        </>
      );
    }
    return this.props.children;
  }
}
export default Error;
