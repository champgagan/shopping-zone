import React, { Component } from "react";
import { Card, CardTitle, Table, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import CouponModal from "./CouponModal";

class PricingDetails extends Component {
  currency = String.fromCharCode(process.env.REACT_APP_CURRENCY);
  state = {
    isOpen: false,
  };

  openCouponModel = () => {
    this.setState({ isOpen: true });
  };

  close = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { cartAmount, checkCart } = this.props;
    return (
      <Card>
        <span className="cartTotal">
          {" "}
          <i className="fa fa-truck fa-rotate-360 wishlist"></i> Yay ! Eligible
          for <b>free delivery</b>
        </span>
        <br></br>
        <CardTitle className="cartTotal">Price Details:</CardTitle>
        <Table borderless>
          <tbody>
            <tr style={this.tdstyle}>
              <td className="leftAlign cartTotal">Bag total:</td>
              <td>
                {cartAmount}
                {this.currency}
              </td>
            </tr>
            <tr>
              <td className="leftAlign cartTotal">Bag discount:</td>
              <td></td>
            </tr>
            <tr>
              <td className="leftAlign cartTotal">Coupon discount:</td>
              <>
                <Button
                  style={{ color: "green" }}
                  size="sm"
                  color="link"
                  onClick={this.openCouponModel}
                >
                  APPLY
                </Button>
              </>
            </tr>
            <tr>
              <td className="leftAlign cartTotal">Order total:</td>
              <td></td>
            </tr>
            <tr>
              <td className="leftAlign cartTotal">Delivery charges:</td>
              <td>
                {cartAmount >
                process.env.REACT_APP_MIN_PRICE_FOR_FREE_DELIVERY ? (
                  <>
                    <ins>free</ins>{" "}
                    <del>
                      {process.env.REACT_APP_DELIVERY_CHARGES}
                      {this.currency}
                    </del>
                  </>
                ) : (
                  <>
                    {process.env.REACT_APP_DELIVERY_CHARGES}
                    {this.currency}
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <hr></hr>
              </td>
            </tr>
            <tr>
              <td className="leftAlign">
                <b>Total</b>:
              </td>
              <td>
                {cartAmount > process.env.REACT_APP_MIN_PRICE_FOR_FREE_DELIVERY
                  ? cartAmount
                  : parseInt(cartAmount) +
                    parseInt(process.env.REACT_APP_DELIVERY_CHARGES)}
                {this.currency}
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <NavLink
                  to={{
                    pathname: checkCart ? "/cart" : "/checkout",
                    state: { checkedOut: true },
                  }}
                >
                  <Button
                    block
                    onClick={this.checkCartAvail}
                    color="success"
                    className="add1 MYbutton"
                  >
                    Checkout Cart
                  </Button>
                </NavLink>
              </td>
            </tr>
          </tbody>
        </Table>
        <CouponModal isOpen={this.state.isOpen} onCancel={this.close} />
      </Card>
    );
  }
}

export default PricingDetails;
