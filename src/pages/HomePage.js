import React, { Component } from "react";
import Button from "reactstrap/es/Button";
import { connect } from "react-redux";
import { contactAction } from "../actions/contactAction";
import Headers from "./Headers";
import ProductListing from "../features/product-listing";
import { WishlistAction } from "../actions/WishlistAction";

class Home extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.scrollFunction);
    window.onscroll = function () {
      myFunction();
    };

    var header = document.getElementById("appHeader");
    var sticky = header.offsetTop;

    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }
    this.props.getProducts();
    const userid=localStorage.getItem('userid');
    if(userid){
      this.props.getUserWishlist(userid);
    }
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollFunction);
  }

  scrollFunction() {
    let button = document.getElementById("myBtn");
    if (
      document.body.scrollTop > 30 ||
      document.documentElement.scrollTop > 30
    ) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  }

  renderLoader = () => <p>Loading</p>;

  render() {
    return (
      <React.Fragment>
        <Headers />
        <br />
        <div className="content">
          <ProductListing wishlist={this.props.wishlist} product={this.props.productData} />
          <Button
            id="myBtn"
            color="success"
            onClick={this.topFunction.bind(this)}
            className="add"
          >
            Top
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productData: state.products,
    wishlist: state.wishlist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => {
      dispatch(contactAction.getProducts());
    },
    getUserWishlist:(userid)=>{
      dispatch(WishlistAction.getUserWislist(userid));
    }
  };
};

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(Home);
