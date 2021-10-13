import React, { Component } from "react";
import { connect } from "react-redux";
import { ModalAction } from "../actions/ModalAction";
import { cartAction } from "../actions/cartAction";
import { AddressAction } from "../actions/AddressAction";
import { AddressDetailsForm } from "./AddressDetailsForm";
import { NavLink } from "react-router-dom";
import { Input, Table, Collapse, Button, Col, Row, Alert } from "reactstrap";
import CheckModal from "./CheckModal";
import { withRouter } from "react-router-dom";
import Timer from "./Timer";
import { Redirect } from "react-router-dom";

class AddressComponent extends Component {
  componentDidMount() {
    this.scrollFunction(this);
    this.props.getAddress();
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", this.lockHistory());
    const user = localStorage.getItem("userid");
    if (user) {
      this.props.getCart(user);
    }
  }

  lockHistory() {
    window.history.pushState(null, document.title, window.location.href);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    window.removeEventListener("popstate", this.lockHistory);
    this.props.closeModal();
  }

  scrollFunction(o) {
    this.timer = setInterval(function () {
      o.setState({ time: o.state.time - 1 });
    }, 1000);
  }

  checkPop() {
    alert("you might loose data");
  }

  state = {
    address: "0",
    time: 599,
  };

  render() {
    if (this.state.time <= 0) {
      this.props.closeModal();
      return <Redirect to="/cart" />;
    }
    return (
      <div className="container">
        <Timer time={this.state.time} />
        <div className="cart-header">
          Please fill in your address below
          <NavLink to="/manageAddress" className="float-right marginRight7">
            Manage Address
          </NavLink>
        </div>
        <Row>
          <Col xs={5}>
            <Input
              type="select"
              name="addressValue"
              value={this.state.address}
              onChange={this.handleChange}
            >
              <option value="0">Please select</option>
              {this.props.address &&
                this.props.address.addresses &&
                this.props.address.addresses.map((ob) => {
                  return (
                    <option className="text-muted" value={ob._id}>
                      {ob.addressline1},{ob.addressline2}
                      {ob.addressline3},{ob.town} ,{ob.state} -{ob.postcode},
                      {ob.country}
                    </option>
                  );
                })}

              <option className="text-danger" value="1">
                ******ADD OTHER*****
              </option>
            </Input>
            <br></br>
            <Collapse isOpen={this.state.address === "1"}>
              <hr></hr>
              <AddressDetailsForm
                renderReset={true}
                nextButtonLabel="Submit"
                error={this.props.error}
                next={this.props.openModal}
                labelsize={4}
                inputsize={6}
              />
            </Collapse>
            <br></br>
            {this.state.address !== "1" && (
              <Button
                disabled={this.state.address === "0"}
                className="checkHover"
                color="success"
                onClick={this.props.openModal}
              >
                Proceed to buy
              </Button>
            )}
          </Col>
          <Col xs={{ size: 4, offset: 2 }} className="">
            <Alert color="success">
              <p className="">Your order summary</p>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="description-table">Name</th>
                    <th className="description-table">Qty</th>
                    <th className="description-table">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.cart !== undefined &&
                    this.props.cart.map((product) => {
                      return (
                        <tr key={product.id}>
                          <td className="text-muted description-table">
                            {product.name}
                          </td>
                          <td className="text-muted description-table">
                            {product.quantity}
                          </td>
                          <td className="text-muted description-table">
                            {product.price}
                          </td>
                        </tr>
                      );
                    })}
                  <tr>
                    <td colspan="3">
                      <span className="text-success">
                        Amount to pay: {this.totalAmount(this.props.cart)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="3">
                      <span className="text-muted">
                        <i class="fa fa-info-circle" aria-hidden="true">
                          {" "}
                          all prices are inclusive of tax.
                        </i>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Alert>
          </Col>
        </Row>
        <CheckModal nextAction={this.nextAct} header="confirmation" />
      </div>
    );
  }

  totalAmount = (cart) => {
    return (
      cart
        .map((x) => (x.quantity > 0 ? [...x.price][0] * x.quantity : 0))
        .reduce((a, b) => a + b, 0) + "$"
    );
  };

  handleChange = (e) => {
    this.setState({ address: e.target.value });
  };

  nextAct = () => {
    this.props.history.push("confirmation");
  };
}

const mapStateToProps = (state) => {
  return {
    address: state.address,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAddress: () => {
      const user = localStorage.getItem("userid");
      dispatch(AddressAction.getAddress(user));
    },
    openModal: () => {
      dispatch(ModalAction.openModal());
    },
    closeModal: () => {
      dispatch(ModalAction.closeModal());
    },
    getCart: (userid) => {
      dispatch(cartAction.getCart(userid));
    },
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddressComponent)
);
