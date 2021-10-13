import { LOAD_PRODUCT, SEARCH_PRODUCT } from "../actions";

export default function productReducer(state = [], action) {
  switch (action.type) {
    case SEARCH_PRODUCT:
      return [...action.payload];
    case LOAD_PRODUCT:
      return [...action.payload];
    default:
      return state;
  }
}
