import React, { Component } from "react";
import { connect } from "react-redux";
import { Spinner } from "reactstrap";

class Loader extends Component {
  render() {
    return this.props.loader !== undefined && this.props.loader.loading ? (     
          <Spinner
            className="loader"
            style={{ align: "center", width: "3rem", height: "3rem" }}
            size="xl"
            animation="border"
            color="warning"
          />
                  
    ) : null;
  }
}

const mapStateToProps = (state) => {
  return {
    loader: state.spin,
  };
};

export default connect(mapStateToProps)(Loader);
