import React, { Component,forwardRef } from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { WishlistAction } from "../actions/WishlistAction";
import { NavLink } from "react-router-dom";
import { cartAction } from "../actions/cartAction";
import WishlistRow from "./WishlistRow";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

class Wishlist extends Component {
  componentDidMount() {
    if (localStorage.getItem("userid")) {
      this.props.getUserWislist(localStorage.getItem("userid"));
    }
  }
  style = { verticalAlign: "middle" };

  render() {
    const wishlist = this.props.wishlist;
    return (
      <div className="">
        {wishlist.length > 0 ? (
          <>
            <i className="fa fa-heart wishlist fa-2x"></i>
            <NavLink to="/cart">
              <span className="float-right wishlist">
                {" "}
                <i
                  className="fa fa-shopping-basket fa-3x"
                  title="Navigates to cart page"
                ></i>
              </span>
            </NavLink>

            <p className="wishlist">My Wishlist ({wishlist.length} items)</p>
            <div className="parent">
              {wishlist && (
                <AutoSizer>
                  {({ height, width }) => (
                    <FixedSizeList
                      useIsScrolling
                      height={height}
                      overscanCount={2}
                      width={width}
                      itemSize={120}
                      itemCount={wishlist.length}
                      itemData={wishlist}
                      {...this.props}
                    >
                      {WishlistRow({ test: "test" })}
                    </FixedSizeList>
                  )}
                </AutoSizer>
              )}
            </div>
            {/* <Table striped>
              <tbody className="wishlistTableBody">
                {wishlist &&
                  wishlist.map((obj) => {
                    return (
                      <WishlistRow
                        obj={obj}
                        style={this.style}
                        add={this.add}
                        removeFromWishlist={this.props.removeFromWishlist}
                      />
                    );
                  })}
              </tbody>
            </Table> */}
          </>
        ) : (
          <img
            src={require("../features/product-listing/emptyWishlist.png")}
            alt="wishlist empty"
          />
        )}
      </div>
    );
  }

  //  outerElementType = forwardRef((props, ref) => (
  //   <div ref={ref} onWheel={handleOnWheel} {...props} />
  // ));
  add = (product) => {
    this.props.addToCart({ id: product.id, price: product.price });
  };
}

const mapStateToProps = (state) => {
  return {
    wishlist: state.wishlist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserWislist: (userid) => {
      dispatch(WishlistAction.getUserWislist(userid));
    },
    removeFromWishlist: (productid) => {
      dispatch(
        WishlistAction.removeFromWishlist(
          localStorage.getItem("userid"),
          productid
        )
      );
    },
    addToCart: (payload) => {
      dispatch(cartAction.addToCart(payload));
      dispatch(
        WishlistAction.removeFromWishlist(
          localStorage.getItem("userid"),
          payload.id
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
