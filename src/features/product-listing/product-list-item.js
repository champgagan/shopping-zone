import React, { Component } from "react";
import CardFooter from "reactstrap/es/CardFooter";
import {
  EmailIcon,
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton,
  EmailShareButton,
  FacebookShareButton,
} from "react-share";
import { NavLink } from "react-router-dom";
import { Col, CardImg, CardTitle, CardText, Button, Card } from "reactstrap";

class ProductListItem extends Component {
  render() {
    let nav = `desc/${this.props.product.id}`;
    let takeProduct = this.props.cart.find(
      (ob) => ob.id === this.props.product.id
    );
    let quantity = 0;
    if (takeProduct) {
      quantity = takeProduct.quantity;
    }
    const isWishlisted =
      this.props.wishlistProducts &&
      this.props.wishlistProducts.find((ob) => ob.id === this.props.product.id);
    return (
      <Col className="column-border">
        <Card className="Product-cart" body outline color="success">
          <CardTitle className="transform-names">
            <NavLink to={nav}>{this.props.product.name}</NavLink>
            &nbsp;&nbsp;
            <i
             onClick={() => isWishlisted?this.props.removewishlist(this.props.product.id):this.props.addwishlist(this.props.product.id)}
              title="add to wishlist"
              className={
                isWishlisted ? "fa fa-heart wishlist" : "fa fa-heart-o"
              }
            ></i>
          </CardTitle>
          <NavLink to={nav}>
            <CardImg top src={require(`./${this.props.product.path}`)} />
          </NavLink>
          <CardText>
            price :{this.props.product.price}
            <br></br>
            {this.props.product.discount && (
              <span className="discountText">
                discount :{this.props.product.discount}%
              </span>
            )}
          </CardText>
          {this.props.product.inventory > 0 &&
          quantity < this.props.product.inventory ? (
            <Button
              color="success"
              onClick={() => {
                this.props.add(this.props.product);
              }}
              className="add1 MYbutton"
            >
              Add to cart
            </Button>
          ) : (
            <Button
              disabled={true}
              color="success"
              onClick={() => {
                this.props.add(this.props.product);
              }}
              className="add1"
            >
              {this.props.product.inventory === 0 ? (
                <>
                  <i class="fa fa-ban" aria-hidden="true"></i> Sold out
                </>
              ) : (
                "Max in cart"
              )}
            </Button>
          )}
          <CardFooter>
            <FacebookShareButton>
              <FacebookIcon round size="25px" />
            </FacebookShareButton>
            <WhatsappShareButton>
              <WhatsappIcon round size="25px" />
            </WhatsappShareButton>
            <EmailShareButton>
              <EmailIcon round size="25px" />
            </EmailShareButton>
            {/* {props.product.inventory === 0 && (
              <p className="text-muted">
                we dont know when this would be available
              </p>
            )} */}
          </CardFooter>
        </Card>
      </Col>
    );
  }
}

export default ProductListItem;
