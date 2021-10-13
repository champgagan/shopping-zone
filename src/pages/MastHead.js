import React from "react";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";

import SidebarNavigation from "./SidebarNavigation";
import { NavLink } from "react-router-dom";

class MastHead extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
      show: false,
    };
  }

  render() {
    return (
      <React.Fragment>
        <SidebarNavigation
          show={this.state.show}
          hide={this.hideSideBar}
        ></SidebarNavigation>
        <p className="mast">
          <Button color="link" className="icon" onClick={this.showSideBar}>
            <i
              className="fa fa-user-circle-o fa-2x circle-color"
              title="Logged in user can access this"
            ></i>
          </Button>
          Welcome to online shopping
          <span className="float-right">
            <NavLink to="/help">
              <i
                className="fa fa-phone-square fa-2x circle-color headerphone"
                title="click to see contact info"
              ></i>
            </NavLink>
          </span>
        </p>
      </React.Fragment>
    );
  }

  showSideBar = () => {
    if (localStorage.getItem("isAuth")) {
      this.setState({ show: true });
    } else {
      this.props.history.push("/login");
    }
  };

  hideSideBar = () => {
    this.setState({ show: false });
  };
}

export default withRouter(MastHead);
