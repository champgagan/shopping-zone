import axios from "axios";
import {
  GET_USER_ADDRESS,
  DISPLAY_ERROR,
  ADD_USER_ADDRESS,
  DELETE_USER_ADDRESS,
  UPDATE_USER_ADDRESS,
  REQUEST_START,
  REQUEST_END
} from "../actions";

const isAuthenticated = localStorage.getItem("access-token");

function addAddress(user, email, address) {    
  return (dispatch) => {
    dispatch({type:REQUEST_START});
        axios.post(
        `http://localhost:8001/address/add`,
        {
          email: email,
          userid: user,
          addressline1: address.addressline1,
          addressline2: address.addressline2,
          addressline3: address.addressline3,
          town:address.town,
          state:address.state,
          country:address.country,
          postcode:address.postcode
        },
        { headers: { Authorization: `Bearer ${isAuthenticated}` } }
      )
      .then((res) => {
          if(res && res.data.success)
          {
              dispatch({type:ADD_USER_ADDRESS});
              getadd(dispatch, user);              
              
          }
          dispatch({type:REQUEST_END});
      })
      .catch((err) => {
        dispatch({type:REQUEST_END});
      });
  };
}

function updateAddress(user, email, address) {
    console.log('inside update address call');
  return (dispatch) => {
    dispatch({type:REQUEST_START});
    axios.post(
        `http://localhost:8001/address/update`,
        {
          email: email,
          userid: user,
          _id:address.addressid,
          addressline1: address.addressline1,
          addressline2: address.addressline2,
          addressline3: address.addressline3,
          state:address.state,
          town:address.town,
          country:address.country,
          postcode:address.postcode
        },
        { headers: { Authorization: `Bearer ${isAuthenticated}` } }
      )
      .then((res) => {
          if(res && res.data.success)
          {
              dispatch({type:UPDATE_USER_ADDRESS});
              getadd(dispatch, user);
          }
          dispatch({type:REQUEST_END});
      })
      .catch((err) => {
        dispatch({type:REQUEST_END});
      });
  };
}

const getAddress = (user) => {
  return (dispatch) => {
    dispatch({type:REQUEST_START});
    axios
      .get(`http://localhost:8001/address/get?userid=${user}`, {
        headers: { Authorization: `Bearer ${isAuthenticated}` },
      })
      .then((res) => {
        if (res && res.data.success) {
          dispatch({ type: GET_USER_ADDRESS, payload: res.data });
        }
        dispatch({type:REQUEST_END});
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: DISPLAY_ERROR });
      });
  };
};

const deleteAddress = (user, addressId) => {
  return (dispatch) => {
    dispatch({type:REQUEST_START});
    deleteadd(dispatch, user, addressId);
  };
};

function deleteadd(dispatch, user, addressId) {
  return axios
    .post(
      `http://localhost:8001/address/delete`,
      { userid: user, _id: addressId },
      { headers: { Authorization: `Bearer ${isAuthenticated}` } }
    )
    .then((res) => {
      if (res && res.data.success) {
        dispatch({ type: DELETE_USER_ADDRESS });
        getadd(dispatch, user);
      }
      dispatch({type:REQUEST_END});
    })
    .catch((err) => {
      dispatch({type:REQUEST_END});
    });
}

function getadd(dispatch, user) {
  return axios
    .get(`http://localhost:8001/address/get?userid=${user}`, {
      headers: { Authorization: `Bearer ${isAuthenticated}` },
    })
    .then((res) => {
      if (res && res.data.success) {
        dispatch({ type: GET_USER_ADDRESS, payload: res.data });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: DISPLAY_ERROR });
    });
}

export const AddressAction = {
  getAddress,
  deleteAddress,
  addAddress,
  updateAddress
};
