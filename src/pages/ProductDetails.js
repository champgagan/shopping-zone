import React, { Component } from "react";
import { contactAction } from "../actions/contactAction";
import { connect } from "react-redux";
import Headers from "./Headers";
import {
  CardTitle,
  Card,
  CardText,
  CardFooter,
  CardImg,
  Button,
  Col,
  Row,
  Table,
} from "reactstrap";
import { EmailIcon, FacebookIcon, WhatsappIcon } from "react-share";
import {
  FacebookShareButton,
  EmailShareButton,
  WhatsappShareButton,
} from "react-share";
import ProductDetailsChild from "./ProductDetailsChild";
import { NavLink } from "react-router-dom";
import { cartAction } from "../actions/cartAction";

class ProductDetails extends Component {
  componentDidMount() {
    this.props.fetchProductDetails(this.props.match.params.proid);
  }

  render() {
    let details = this.props.pro !== undefined ? this.props.pro : {};
    const param = {
      id: details.id,
      name: details.name,
      type: details.type,
      price: details.price,
      path: details.path,
    };
    return (
      <React.Fragment>
        <Headers />
        <br />
        <br />
        {details !== undefined && (
          <div className="container">
            <Row>
              <Col xs="4">
                <Card
                  className="cardClass"
                  width="10px"
                  body="30px"
                  outline
                  color="success"
                >
                  <CardTitle className="transform-names" color="green">
                    {details.name}
                  </CardTitle>
                  <br />
                  {details.path && (
                    <CardImg
                      className="zoonImage"
                      height="180px"
                      width="80px"
                      top
                      src={require(`../features/product-listing/${details.path}`)}
                    />
                  )}
                  <CardText>Price :{details.price}</CardText>
                  <Button
                    size="sm"
                    color="success"
                    className="add MYbutton"
                    onClick={() => {
                      this.props.addCart(param);
                    }}
                  >
                    Add to cart
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    className="remove MYbutton"
                    onClick={() => {
                      this.props.removeFromCart(param);
                    }}
                  >
                    Remove from cart
                  </Button>
                  <CardFooter className="text-muted">
                    <FacebookShareButton url="">
                      <FacebookIcon round size="25px" />
                    </FacebookShareButton>
                    <WhatsappShareButton url="">
                      <WhatsappIcon round size="25px" />
                    </WhatsappShareButton>
                    <EmailShareButton
                      url={window.location.href}
                      subject="I would recommend below product at shopper zone"
                      body={`${details.name}-${details.description}`}
                    >
                      <EmailIcon round size="25px" />
                    </EmailShareButton>
                  </CardFooter>
                </Card>
                <br />
                <br />
              </Col>
              <Col xs="8">
                <Table className="description-table">
                  <ProductDetailsChild product={details} />
                </Table>
              </Col>
            </Row>
            <Row>
              <Col>
                <NavLink to="/">
                  <Button color="success">Return to Shop</Button>
                </NavLink>
              </Col>
            </Row>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pro: state.pDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProductDetails: (key) => {
      dispatch(contactAction.fetchDetails(key));
    },
    addCart: (payload) => {
      dispatch(cartAction.addToCart(payload));
    },
    removeFromCart: (product) => {
      dispatch(cartAction.removeFromCart(product));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
