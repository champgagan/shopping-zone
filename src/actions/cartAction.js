import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  EMPTY_CART,
  CURRENT_CART,
  REQUEST_START,
  REQUEST_END,
  AMEND_CART,
} from "./index";

function getCart(userid) {
  return (dispatch) => {
    dispatch({type:REQUEST_START});
    axios
      .post(`http://localhost:8001/cart/getCart`, { userid: userid })
      .then((res) => {
        if (res && res.data.success) {
          dispatch({ type: CURRENT_CART, payload: res.data.products });
          dispatch({type:REQUEST_END});
        }
      })
      .catch(err=>{
        dispatch({type:REQUEST_END});
      });
  };
}

function addToCart(payload) {    
  const userid = localStorage.getItem("userid");
  return (dispatch) => {
    dispatch({type:REQUEST_START});
    axios
      .post(`http://localhost:8001/cart/addToCart`, {
        userid: userid,
        price: payload.price,
        quantity: payload.quantity ? payload.quantity : 1,
        productid:payload.id
      })
      .then((res) => {
        if (res && res.data.success) {
          dispatch({ type: ADD_TO_CART });
          getCurrentCart(dispatch, userid);
          dispatch({type:REQUEST_END});
        }
      })
      .catch(err=>{
        dispatch({type:REQUEST_END});
      });
  };
}

function removeFromCart(payload) {  
  const userid = localStorage.getItem("userid");
  return (dispatch) => {
    dispatch({type:REQUEST_START});
    axios
      .post(`http://localhost:8001/cart/removeFromCart`, {
        userid: userid,        
        quantity: payload.quantity ? payload.quantity : 1,
        productid:payload.id
      })
      .then((res) => {
        if (res && res.data.success) {
          dispatch({ type: REMOVE_FROM_CART });
          getCurrentCart(dispatch, userid);
          dispatch({type:REQUEST_END});
        }
      })
      .catch(err=>{
        dispatch({type:REQUEST_END});
      });
  };
}

function emptyCart() {
  const userid = localStorage.getItem("userid");
  return (dispatch) => {
    dispatch({type:REQUEST_START});
    axios
      .post(`http://localhost:8001/cart/emptyCart`, { userid: userid })
      .then((res) => {
        if (res && res.data.success) {
           dispatch({ type: EMPTY_CART, payload: [] });
           dispatch({type:REQUEST_END});
        }
      })
      .catch(err=>{
        dispatch({type:REQUEST_END});
      });
  };
}

function amendCart(productid) {
  const userid = localStorage.getItem("userid");
  return (dispatch) => {
    dispatch({type:REQUEST_START});
    axios    
      .post(`http://localhost:8001/cart/removeAll`, {
        userid: userid,
        productid: productid,
      })
      .then((res) => {
        if (res && res.data.success) {
          dispatch({ type: AMEND_CART });
          getCurrentCart(dispatch, userid);
        }
      })
      .catch(err=>{
        dispatch({type:REQUEST_END});
      });
  };
}

function getCurrentCart(dispatch, userid) {
  return axios
    .post(`http://localhost:8001/cart/getCart`, { userid: userid })
    .then((res) => {
      if (res && res.data.success) {
        dispatch({ type: CURRENT_CART, payload: res.data.products });
        dispatch({type:REQUEST_END});
      }
    });
}

export const cartAction = {
  getCart,
  emptyCart,
  amendCart,
  addToCart,
 removeFromCart

};
