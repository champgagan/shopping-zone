import axios from "axios";
import {
  LOAD_PRODUCT,
  SEARCH_PRODUCT,
  PRODUCT_DETAILS,
  REQUEST_START,
  REQUEST_END,
} from "./index";

function getProducts() {
  const access = localStorage.getItem("access-token");
  return (dispatch) => {
    dispatch({ type: REQUEST_START });
    axios
      .get("http://localhost:8001/product", {
        headers: { Authorization: `Bearer ${access}` },
      })
      .then((res) => {
        dispatch({ type: LOAD_PRODUCT, payload: res.data });
        dispatch({ type: REQUEST_END });
      })
      .catch((err) => {
        console.log("seeing error here", err);
        dispatch({ type: REQUEST_END });
      });
  };
}

function searchProducts(key) {
  const access = localStorage.getItem("access-token");
  return (dispatch) => {
    dispatch({ type: REQUEST_START });
    axios
      .get(`http://localhost:8001/product/search?pName=${key}`, {
        headers: { Authorization: `Bearer ${access}` },
      })
      .then((res) => {
        dispatch({ type: SEARCH_PRODUCT, payload: res.data });
        dispatch({ type: REQUEST_END });
      });
  };
}

function fetchDetails(productId) {
  const access = localStorage.getItem("access-token");
  const url = "http://localhost:8001/productDetails?pid=" + productId;
  return (dispatch) => {
    axios
      .get(url, { headers: { Authorization: `Bearer ${access}` } })
      .then((res) => {
        dispatch({ type: PRODUCT_DETAILS, payload: res.data });
      });
  };
}

export const contactAction = {
  getProducts,
  searchProducts,
  fetchDetails,
};
