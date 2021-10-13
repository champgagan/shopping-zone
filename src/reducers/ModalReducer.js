
import {CLOSE_MODAL, OPEN_MODAL} from "../actions";

const initialState={
    modalOpen:false
}

export default function ModalReducer(state={initialState},action){
    switch (action.type) {
        case OPEN_MODAL:
            return Object.assign({},{modalOpen:true});
        case CLOSE_MODAL:
            return Object.assign({},{modalOpen:false});
        default:
            return {};
    }
}