import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  GET_USER_WISHLIST,
} from "../actions";

export default function wishlistReducer(state = [], action) {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return [...state];
    case REMOVE_FROM_WISHLIST:
      return [...state];
    case GET_USER_WISHLIST:
      state = action.payload;
      return [...state];
    default:
      return state;
  }
}
