import React from "react";
import { UncontrolledTooltip } from "reactstrap";

function Timer(props) {
  const time = props.time;
  return (
    <b>
      {" "}
      {time % 2 === 0 ? (
        <i class="fa fa-hourglass-start fa-spin" aria-hidden="true"></i>
      ) : (
        <i class="fa fa-hourglass-end fa-spin" aria-hidden="true"></i>
      )}
      <div style={{ display: "block" }}>
        <span id="minutes" className="text-danger quantityText">
          You have{" "}
          <span className="timerText">
            {" "}
            {`0${Math.floor(time / 60)}`}:
            {time % 60 < 10 ? `0${time % 60}` : `${time % 60}`}
          </span>{" "}
          minutes left to place order.{"  "}
        </span>
        <span className="timerInfo">
          <i
            class="fa fa-info-circle"
            id="UncontrolledTooltipExample"
            aria-hidden="true"
          ></i>
        </span>
        <UncontrolledTooltip
          placement="right"
          target="UncontrolledTooltipExample"
        >
          You can now place your order within 10 mins. Failure to do so, we will
          redirect you to the cart page.This is done to make sure that orders
          are served on first come first serve basis. Thanks for your
          collaboration. Place order and we are happy to serve.{" "}
          <i class="fa fa-smile-o"></i>
        </UncontrolledTooltip>
      </div>
    </b>
  );
}

export default Timer;
