import { DISPLAY_ERROR } from '../actions'

export default function error(error=false,action){

    switch(action.type){
        case DISPLAY_ERROR:
            return true;
        default:
            return false;
    }
}