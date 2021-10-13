import React from "react";
import { NavLink } from "react-router-dom";

export default function SidebarNavigation(props) {
  const { show } = props;
  const loggedin = localStorage.getItem("isAuth");
  let username = "";
  if (localStorage.getItem("user")) {
    username = localStorage.getItem("user");
  }
  return loggedin ? (
    <div
      id="mySidenav"
      style={{ display: show ? "block" : "none" }}
      class="sidenav"
    >
      <span className="circle-color welcomeText " onClick={props.hide}>
        <i className="fa fa-times fa-x circle-color"></i>
      </span>
      <hr></hr>
      <i className="fa fa-user-o circle-color user">&nbsp;&nbsp;Hi {username}</i>
      <hr></hr>
      <NavLink onClick={props.hide} to="/">
        <i className="fa fa-home"></i> Home
      </NavLink>
      <hr></hr>
      <NavLink onClick={props.hide} to="/cart">
        <i className="fa fa-shopping-cart"></i> Cart
      </NavLink>
      <hr></hr>
      <NavLink onClick={props.hide} to="/wishlist">
        <i className="fa fa-heart"></i> Wishlist
      </NavLink>
      <hr></hr>
      <NavLink onClick={props.hide} to="/">
        <i className="fa fa-shopping-basket"></i> Orders
      </NavLink>
      <hr></hr>
      <NavLink onClick={props.hide} to="/">
        <i className="fa fa-exchange"></i> Return
      </NavLink>
      <hr></hr>
      <NavLink onClick={props.hide} to="/manageAddress">
        <i className="fa fa-address-book"></i> Address
      </NavLink>
      <hr></hr>
      <NavLink onClick={props.hide} to="/help">
        <i className="fa fa-phone"></i> Help
      </NavLink>
      <hr></hr>
      <NavLink onClick={props.hide} to="/logout">
        <i className="fa fa-sign-out"></i>Logout
      </NavLink>
    </div>
  ) : (
    ""
  );
}
