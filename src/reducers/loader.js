
import {REQUEST_END, REQUEST_START} from "../actions";



export default function loader(state={},action){
    switch (action.type) {
        case REQUEST_START:
            return Object.assign({},{loading:true});
        case REQUEST_END:
            return Object.assign({},{loading:false});
        default:
            return state;
    }
}