import React from "react";
import { Button } from "reactstrap";

export default function Logout() {
  localStorage.clear();
  setTimeout(redirect, 5000);
  return (
    <>
      <h5> you have been logged out.</h5>
      <h6>
        {" "}
        you will be automatically be redirected to the home page after 5
        seconds.If not,
        <Button onClick={redirect} color="link">
          Click here
        </Button>
      </h6>
    </>
  );
}

const redirect = () => {
  window.location.replace("/login");
};
