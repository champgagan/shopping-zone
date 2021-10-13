import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import cartReducer from "../reducers";
import productReducer from "../reducers/products";
import proDetails from "../reducers/proDetails";
import loader from "../reducers/loader";
import ModalReducer from "../reducers/ModalReducer";
import error from "../reducers/error";
import address from "../reducers/address";
import wishlistReducer from "../reducers/wishlist";

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
  pDetails: proDetails,
  spin: loader,
  modalState: ModalReducer,
  showError: error,
  address: address,
  wishlist: wishlistReducer,
});

const loggerMiddleware = createLogger({
  collapsed: true,
});
const middleware = [thunk, loggerMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
