
import {OPEN_MODAL,CLOSE_MODAL} from "./index";


function openModal() {
return dispatch=>{
         dispatch({type:OPEN_MODAL});
}
}

function  closeModal() {
  return dispatch=>{
    dispatch({type:CLOSE_MODAL});
  }
}


export const ModalAction={
  openModal,closeModal
};
