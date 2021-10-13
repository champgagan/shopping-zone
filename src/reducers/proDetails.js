import {PRODUCT_DETAILS} from "../actions";


export default function proDetails(state={},action){
    switch (action.type) {
        case PRODUCT_DETAILS:
            return Object.assign({...action.payload});
        default:
            return state;
    }
}