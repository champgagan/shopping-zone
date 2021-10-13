import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import * as image from "font-awesome/css/font-awesome.min.css";
import { connect } from "react-redux";
import { contactAction } from "../actions/contactAction";
import {
  Col,
  Nav,
  Navbar,
  Input,
  NavItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { cartAction } from "../actions/cartAction";

class Headers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: "",
      renderInp: false,
      renderSpan: true,
    };

    this.renderInput = this.renderInput.bind(this);
  }

  renderInput = () => {
    this.setState({ renderInp: true, renderSpan: false });
  };

  componentDidMount() {
    if (this.props.cart && this.props.cart.length === 0) {
      const user = localStorage.getItem("userid");
      if (user) {
        this.props.getCart(user);
      }
    }
  }

  render() {
    let cartNo = this.props.cart ? this.checkLength(this.props.cart) : 0;
    return (
      <div className="" id="appHeader">
        <Navbar className="navbar-custom" expand="auto">
          <Col xs="3">
            <Nav>
              <NavItem>
                <NavLink className="link-color link-home" to="/">
                  <i
                    className="fa fa-home home-size fa-4x"
                    title="Navigates to home screen"
                  ></i>
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col xs="5">
            {this.state.renderSpan && (
              <span className="link-color" onClick={this.renderInput}>
                <i
                  className="fa fa-search link-color basket-size"
                  title="opens search menu"
                ></i>
                &nbsp; &nbsp; Click to search
              </span>
            )}
            {this.state.renderInp && (
              <Input
                id="searchprod"
                type="text"
                placeholder="search here"
                onChange={this.searchProduct.bind(this)}
                value={this.state.searchInput}
              />
            )}
          </Col>
          <Col>
            <Nav className="cart" vertical>
              <NavItem>
              
                <NavLink className="link-color" to="/cart">
                  <i
                    className="fa fa-shopping-basket fa-3x"
                    title="Navigates to cart page"
                  ></i><i className="cart-no-color">{cartNo}</i>                  
                </NavLink>                
              </NavItem>
              <NavItem>
                {
                  <UncontrolledDropdown nav className="link-color caret">
                    <DropdownToggle
                      caret={
                        this.props.cart !== undefined &&
                        this.props.cart.length > 0
                      }
                      disabled={
                        this.props.cart !== undefined &&
                        !this.props.cart.length > 0
                      }
                      tag="span"
                      className="nav-link link-color"
                    >
                      Show cart
                    </DropdownToggle>
                    <DropdownMenu right className="dropdown-width">
                      <ul>
                        {this.props.cart !== undefined &&
                          this.props.cart.map((product) => (
                            <li
                              className="Item-Cart transform-names"
                              key={product.id}
                            >
                              <b>{product.quantity}*</b>
                              {product.name}
                              <button
                                name={product.id}
                                className="cross-red"
                                onClick={this.remove.bind(this)}
                              >
                                &times;
                              </button>
                            </li>
                          ))}
                      </ul>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                }
              </NavItem>
            </Nav>
          </Col>
        </Navbar>
      </div>
    );
  }

  const;
  remove = (e) => {
    this.props.amendCart(e.target.name);
  };

  const;
  searchProduct = (e) => {
    this.setState({ searchInput: e.target.value });
    this.props.searchProducts(e.target.value);
  };

  checkLength(array) {
    return array
      .map((x) => (x.quantity > 0 ? x.quantity : 0))
      .reduce((a, b) => a + b, 0);
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    amendCart: (id) => {
      dispatch(cartAction.amendCart(id));
    },
    searchProducts: (payload) => {
      dispatch(contactAction.searchProducts(payload));
    },
    getCart: (userid) => {
      dispatch(cartAction.getCart(userid));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Headers);
