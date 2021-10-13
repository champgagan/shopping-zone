import React from "react";
import { ModalAction } from "../actions/ModalAction";
import { connect } from "react-redux";

import {
  Input,
  Label,
  Modal,
  ModalFooter,
  Button,
  ModalBody,
  ModalHeader,
} from "reactstrap";

const CheckModal = (props) => {
  let isOpen =
    props.isModelOpen !== undefined ? props.isModelOpen.modalOpen : false;
  return (
    <div>
      <Modal
        isOpen={isOpen}
        modalTransition={{ timeout: 700 }}
        backdropTransition={{ timeout: 800 }}
        toggle={props.closeModel}
        centered
        scrollable
      >
        <ModalHeader toggle={props.closeModel} className=".modal-header">
          <i class="fa fa-exclamation-triangle" aria-hidden="true">
            {" "}
            {props.header}
          </i>
        </ModalHeader>
        <ModalBody className="modal-body">
        {props.message}
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.closeModel} color="secondary">
            Cancel
          </Button>
          <Button onClick={props.nextAction} color="success">
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isModelOpen: state.modalState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModel: () => {
      dispatch(ModalAction.closeModal());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckModal);
