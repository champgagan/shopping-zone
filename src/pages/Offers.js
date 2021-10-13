import React, { Component } from "react";
import { Button, Collapse } from "reactstrap";

class Offers extends Component {
  currency = String.fromCharCode(process.env.REACT_APP_CURRENCY);
  state = {
    open: false,
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };
  render() {
    return (
      <div className="selectionWishlist">
        <span className="availableOffers">
          <i class="fa fa-bolt" aria-hidden="true">
            &nbsp; Available offers
          </i>
        </span>
        <br></br>
        <br></br>
        <ul>
          <li>
            free delivery on orders above{" "}
            {process.env.REACT_APP_MIN_PRICE_FOR_FREE_DELIVERY}
            {this.currency}
          </li>
          <Button
            onClick={this.toggle}
            style={{ color: "green" }}
            size="sm"
            color="link"
          >
            {this.state.open ? "Show Less " : "Show More "}
            {this.state.open ? (
              <i class="fa fa-angle-up" aria-hidden="true"></i>
            ) : (
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            )}
          </Button>
          <Collapse isOpen={this.state.open}>
            <li>flash sale is on.</li>
            <li>flat 20% off on your first order.</li>
          </Collapse>
        </ul>
      </div>
    );
  }
}

export default Offers;
