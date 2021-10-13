import React from "react";

import {
  Input,
  Modal,
  ModalFooter,
  Button,
  ModalBody,
  ModalHeader,
} from "reactstrap";

const CouponModal = (props) => {
  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        modalTransition={{ timeout: 700 }}
        backdropTransition={{ timeout: 700 }}
        toggle={props.onCancel}
        centered
      >
        <ModalHeader toggle={props.onCancel} className="modal-header">
          <i class="fa fa-scissors" aria-hidden="true"></i> Apply Coupon
        </ModalHeader>
        <ModalBody className="modal-body">
          <Input
            type="text"
            name="coupon code"
            id="exampleEmail"
            placeholder="Enter the coupon code"
          />          
          <p className='errorCoupon'>This is not a valid coupon</p>
          <br></br>
          <br></br>
        </ModalBody>
        <ModalFooter style={{ display: "inline" }}>
          <div className="float-left">Coupon Discount:</div>
          <Button className="float-right" color="success">
            APPLY
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CouponModal;
