import axios from "axios";
const {
  ADD_TO_WISHLIST,
  REQUEST_START,
  REQUEST_END,
  REMOVE_FROM_WISHLIST,
  GET_USER_WISHLIST,
} = require(".");

const addToWishlist = (userid, productid) => {
  return (dispatch) => {
    dispatch({ type: REQUEST_START });
    axios
      .post("http://localhost:8001/wishlist/add", {
        userid: userid,
        productid: productid,
      })
      .then((res) => {
        if (res && res.data && res.data.success) {
          dispatch({ type: ADD_TO_WISHLIST });
          dispatch({ type: REQUEST_END });
          dispatch(getUserWislist(userid));
        }
      })
      .catch((err) => {
        dispatch({ type: REQUEST_END });
      });
  };
};

const removeFromWishlist = (userid, productid) => {
  return (dispatch) => {
    dispatch({ type: REQUEST_START });
    axios
      .post("http://localhost:8001/wishlist/remove", {
        userid: userid,
        productid: productid,
      })
      .then((res) => {
        if (res && res.data && res.data.success) {
          dispatch({ type: REMOVE_FROM_WISHLIST });
          dispatch({ type: REQUEST_END });
          dispatch(getUserWislist(userid));
        }
      })
      .catch((err) => {
        dispatch({ type: REQUEST_END });
      });
  };
};

const getUserWislist = (userid) => {
  return (dispatch) => {
    dispatch({ type: REQUEST_START });
    axios
      .post(`http://localhost:8001/wishlist/get`, { userid: userid })
      .then((res) => {
        if (res && res.data && res.data.success) {
          dispatch({ type: GET_USER_WISHLIST, payload: res.data.wishlist });
          dispatch({ type: REQUEST_END });
        }
      })
      .catch((err) => {
        dispatch({ type: REQUEST_END });
      });
  };
};

export const WishlistAction = {
  addToWishlist,
  removeFromWishlist,
  getUserWislist,
};
