import {
  ADD_TO_CART,
  AMEND_CART,
  CURRENT_CART,
  EMPTY_CART,
  REMOVE_FROM_CART,
} from "../actions";

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state];
    case REMOVE_FROM_CART:
      return [...state];
    case CURRENT_CART:
      state = action.payload;
      return [...state];
    case AMEND_CART:
      return [...state];
    case EMPTY_CART:
      state = action.payload;
      return [...state];
    default:
      return state;
  }
}
