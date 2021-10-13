import React from "react";
import Container from "reactstrap/es/Container";
import { Row } from "reactstrap";
import { connect } from "react-redux";
import { cartAction } from "../../actions/cartAction";
import ProductListingItem from "./product-list-item";
import ProductError from "./ProductError";
import { WishlistAction } from "../../actions/WishlistAction";
import { FixedSizeGrid as Grid } from "react-window";

const productForm = (props) => {
  return props.error ? (
    "your access is restricted"
  ) : props.product !== undefined && props.product.length > 0 ? (
    <>
      <Container>
        <Row xs="4">
          {props.product.map((product) => (
            <ProductError>
              <ProductListingItem
                cart={props.cart}
                key={product.id}
                product={product}
                add={props.addCart}
                remove={props.removeFromCart}
                addwishlist={props.addToWishlist}
                removewishlist={props.removeFromWishlist}
                wishlistProducts={props.wishlist}
              />
            </ProductError>
          ))}
        </Row>
      </Container>
    </>
  ) : (
    <React.Fragment>
      {/* <Alert color="danger">
        <b>Please refine your search</b>
      </Alert> */}
      Loading......
    </React.Fragment>
  );
};

const Example = (props) => {
  console.log("check props here", props);
  return (
    <Row xs="4">
      {props.product.map((product) => (
        <ProductError>
          <ProductListingItem
            cart={props.cart}
            key={product.id}
            product={product}
            add={props.addCart}
            remove={props.removeFromCart}
            addwishlist={props.addToWishlist}
            removewishlist={props.removeFromWishlist}
            wishlistProducts={props.wishlist}
          />
        </ProductError>
      ))}
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    error: state.showError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (payload) => {
      dispatch(cartAction.addToCart(payload));
    },
    removeFromCart: (product) => {
      dispatch(cartAction.removeFromCart(product));
    },
    addToWishlist: (productid) => {
      dispatch(
        WishlistAction.addToWishlist(localStorage.getItem("userid"), productid)
      );
    },
    removeFromWishlist: (productid) => {
      dispatch(
        WishlistAction.removeFromWishlist(
          localStorage.getItem("userid"),
          productid
        )
      );
    },
  };
};

const productList = connect(mapStateToProps, mapDispatchToProps)(productForm);

export default productList;
