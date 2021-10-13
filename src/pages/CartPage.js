import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { ModalAction } from "../actions/ModalAction";
import { cartAction } from "../actions/cartAction";
import { connect } from "react-redux";
import Offers from "./Offers";
import PricingDetails from "./PricingDetails";
import {
  Button,
  Table,
  Col,
  InputGroupAddon,
  InputGroup,
  Input,
  UncontrolledTooltip,
  UncontrolledAlert,
  Row,
  Container,
} from "reactstrap";
import CheckModal from "./CheckModal";
import empty from "./empty.jpg";
import { WishlistAction } from "../actions/WishlistAction";

class CartPage extends Component {
  tdstyle = { padding: "0.55rem" };
  currency = String.fromCharCode(process.env.REACT_APP_CURRENCY);
  green = { color: "green" };
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.state = {
      allowCheckout: true,
    };
  }

  componentDidMount() {
    const user = localStorage.getItem("userid");
    if (user) {
      this.props.getCart(user);
    }
  }

  render() {
    return (
      <div className="container">
        {this.props.cart !== undefined && this.props.cart.length > 0 ? (
          <div>
            <br />
            <div className="cart-header">
              <p className="cart-home-link">
                <NavLink to="/">
                  <i
                    className="fa fa-home fa-2x"
                    title="Navigates to home screen"
                  ></i>
                </NavLink>
                <span className="style-text">Here is your cart</span>
              </p>
            </div>
            <Container>
              <Row>
                <Col xs={8}>
                  <Offers />
                  <br></br>
                  <Table responsive>
                    <thead className="link-green-color-cart">
                      <tr>
                        <th className="link-color header-table">Product</th>
                        <th className="link-color header-table">Name</th>
                        <th className="link-color header-table">Price</th>
                        <th className="link-color header-table">Quantity</th>
                        <th className="link-color header-table">Total</th>
                        <th className="link-color header-table">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.cart !== undefined &&
                        this.props.cart.map((product) => (
                          <tr key={product.id}>
                            <td className="description-table">
                              <NavLink to={`/desc/${product.id}`}>
                                {product.path && (
                                  <img
                                    alt={product.name}
                                    src={require(`../features/product-listing/${product.path}`)}
                                    width="50px"
                                    height="50px"
                                  />
                                )}
                              </NavLink>
                            </td>
                            <td className="description-table transform-names">
                              <NavLink
                                style={this.green}
                                to={`/desc/${product.id}`}
                              >
                                {product.name}
                              </NavLink>{" "}
                              {product.inventory <= 0 && (
                                <>
                                  {" "}
                                  <span
                                    style={{
                                      textDecoration: "underline",
                                    }}
                                    href="#"
                                    id="UncontrolledTooltipExample"
                                  >
                                    <i
                                      class="fa fa-ban wishlist  "
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                  <UncontrolledTooltip
                                    placement="right"
                                    target="UncontrolledTooltipExample"
                                  >
                                    Sorry this item is no longer
                                    available.Please remove it from the cart to
                                    checkout.
                                  </UncontrolledTooltip>
                                </>
                              )}
                              {product.inventory > 0 &&
                                product.quantity > product.inventory && (
                                  <>
                                    {" "}
                                    <span
                                      style={{
                                        textDecoration: "underline",
                                      }}
                                      href="#"
                                      id="UncontrolledTooltip"
                                    >
                                      <i
                                        class="fa fa-info-circle"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    <UncontrolledTooltip
                                      placement="right"
                                      target="UncontrolledTooltip"
                                    >
                                      Sorry we have only {product.inventory}{" "}
                                      remaining in stock.Please reduce quantity
                                      to checkout.
                                    </UncontrolledTooltip>
                                  </>
                                )}
                            </td>
                            <td className="description-table">
                              {product.price}
                            </td>
                            <td className="description-table" align="center">
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                  <Button
                                    className="MYbutton"
                                    color="danger"
                                    onClick={() => this.handleKeyDown(product)}
                                  >
                                    {product.quantity === 1 ? (
                                      <i
                                        class="fa fa-trash"
                                        aria-hidden="true"
                                      ></i>
                                    ) : (
                                      <i
                                        class="fa fa-minus"
                                        aria-hidden="true"
                                      ></i>
                                    )}
                                  </Button>
                                </InputGroupAddon>
                                <Input
                                  className="textC"
                                  disabled
                                  value={product.quantity}
                                  name={product.id}
                                />
                                <InputGroupAddon addonType="append">
                                  <Button
                                    disabled={
                                      product.quantity >= product.inventory ||
                                      product.inventory === 0
                                    }
                                    className="MYbutton"
                                    color="success"
                                    onClick={() => this.handleKeyUp(product)}
                                  >
                                    <i
                                      class="fa fa-plus"
                                      aria-hidden="true"
                                    ></i>
                                  </Button>
                                </InputGroupAddon>
                              </InputGroup>
                              {product.inventory !== 0 &&
                                product.quantity === product.inventory && (
                                  <span className="quantityText">
                                    {" "}
                                    *Maximum quantity reached
                                  </span>
                                )}
                              {product.inventory === 0 && (
                                <span className="quantityText"> *Sold out</span>
                              )}
                              {product.inventory !== 0 &&
                                product.inventory < product.quantity && (
                                  <span className="quantityText">
                                    {" "}
                                    *Sorry we have only {product.inventory}{" "}
                                    remaining in stock.Please reduce quantity to
                                    checkout.
                                  </span>
                                )}
                            </td>

                            <td className="description-table">
                              {this.calculate(product)}
                            </td>
                            <td className="description-table">
                              <i
                                onClick={() => this.remove(product)}
                                class="fa fa-trash fa-x wishlist"
                                aria-hidden="true"
                              >
                                {" "}
                              </i>
                              &nbsp;&nbsp;
                              <span class="vl" />
                              &nbsp;&nbsp;
                              <i
                                onClick={() => {
                                  this.props.addToWishlist(product);
                                }}
                                class="fa fa-heart-o fa-x wishlist"
                                aria-hidden="true"
                              >
                                {" "}
                              </i>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                  <Button
                    color="danger"
                    onClick={this.props.openModal}
                    className="remove MYbutton"
                  >
                    Empty Cart
                  </Button>
                  <br></br>
                  <br></br>
                  <div className="selectionWishlist">
                    <NavLink to="/wishlist">
                      <span>
                        <i className="fa fa-angle-right wishlist">
                          &nbsp; Choose from your wishlist
                        </i>
                      </span>
                    </NavLink>
                  </div>
                </Col>
                <Col xs="4">
                  <PricingDetails
                    cartAmount={this.totalAmount(this.props.cart)}
                    checkCart={this.checkCart()}
                    checkCartAvail={this.checkCartAvail}
                  />
                </Col>
              </Row>
            </Container>
            <br />
            <br />
            {!this.state.allowCheckout ? (
              <UncontrolledAlert color="info">
                Some item in your cart is not available or we do not have enough
                quantity as in your cart
              </UncontrolledAlert>
            ) : (
              ""
            )}
            <NavLink
              to={{
                pathname: this.checkCart() ? "/cart" : "/checkout",
                state: { checkedOut: true },
              }}
            />

            <CheckModal
              nextAction={this.props.emptyCart}
              header="Confirmation"
              message="Are you sure you want to Empty cart?"
            />
          </div>
        ) : (
          <React.Fragment>
            <br />
            <div className="cart-header">
              <p className="cart-home-link">
                <NavLink className="lin" to="/">
                  <i className="fa fa-home fa-2x"></i>
                </NavLink>
              </p>
              <span>
                Cart is still empty.<NavLink to="/">Let's Shop</NavLink>
              </span>
            </div>
            <img src={empty} alt="empty cart" />
          </React.Fragment>
        )}
      </div>
    );
  }

  checkCartAvail = () => {
    if (this.checkCart()) {
      this.setState({ allowCheckout: false });
    } else {
      this.setState({ allowCheckout: true });
    }
  };

  calculate = (pro) => {
    const [price, currency] = [...pro.price];
    const val = Number.isNaN(price * pro.quantity)
      ? 0
      : price * pro.quantity + this.currency
    return val;
  };

  checkCart = () => {
    const cart = this.props.cart;
    if (cart) {
      const isEmpty = cart.find(
        (Ob) => Ob.inventory === 0 || Ob.quantity > Ob.inventory
      );
      if (isEmpty) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  totalAmount = (cart) => {
    return (
      cart
        .map((x) => (x.quantity > 0 ? [...x.price][0] * x.quantity : 0))
        .reduce((a, b) => a + b, 0)
    );
  };

  updateCart = (e) => {
    this.props.amendCart(e.target.name, e.target.value);
  };

  remove = (e) => {
    console.log(e.id);
    if (e.id) {
      this.props.amendCart(e.id);
    }
  };

  handleKeyUp = (product) => {
    delete product.quantity;
    this.props.addCart(product);
  };

  handleKeyDown = (product) => {
    delete product.quantity;
    this.props.removeFromCart(product);
  };
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    error: state.showError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (product) => {
      dispatch(cartAction.addToCart(product));
    },
    removeFromCart: (product) => {
      dispatch(cartAction.removeFromCart(product));
    },
    emptyCart: () => {
      dispatch(cartAction.emptyCart());
    },
    openModal: () => {
      dispatch(ModalAction.openModal());
    },
    getCart: (userid) => {
      dispatch(cartAction.getCart(userid));
    },
    amendCart: (product) => {
      dispatch(cartAction.amendCart(product));
    },
    addToWishlist: (product) => {
      dispatch(
        WishlistAction.addToWishlist(localStorage.getItem("userid"), product.id)
      );
      dispatch(cartAction.removeFromCart(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
