import React from "react";
import { ToastBody, Toast, ToastHeader } from "reactstrap";

export default function Help() {
  return (
    <div className="bg-success rounded">
      <Toast className="alignCenter">
        <ToastHeader>Contact Details</ToastHeader>
        <ToastBody>
          <address className="addressHelp">
            <br></br>
            You can now Call us our Email us for your queries.
            <br></br>
            <br></br>
            <a
              style={{ color: "black" }}
              href="mailto:shoppingzone1917@gmail.com"
            >
              <i class="fa fa-envelope"></i>
            </a>
            {"  "}
            <b className="quantityText"> shoppingzone1917@gmail.com</b>
            <br></br>
            <i class="fa fa-phone"></i>
            {"    "}
            <b className="quantityText">123456789</b>
            <br></br>
            <br></br>
            Registered at:<br></br>B 106<br></br>
            Rajendra Place<br></br>
            Delhi. 1100006<br></br>
            INDIA<br></br>
            <br></br>
          </address>
        </ToastBody>
      </Toast>
    </div>
  );
}
