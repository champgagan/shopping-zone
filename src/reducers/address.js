import {GET_USER_ADDRESS,DELETE_USER_ADDRESS,ADD_USER_ADDRESS} from '../actions';


export default function address(state={},action){

switch(action.type){
    
    case GET_USER_ADDRESS:
      return Object.assign({},action.payload);
    
    case ADD_USER_ADDRESS:
      return state;
    case DELETE_USER_ADDRESS:
      return state;
    default:
         return state; 
}

}