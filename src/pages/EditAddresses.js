import React, { Component } from "react";
import { Button, Card, Collapse, CardBody } from "reactstrap";
import { AddressDetailsForm } from "./AddressDetailsForm";
import Loader from "./Loader";

class EditAddresses extends Component {
  state = {
    collapseOpen: false,
  };
  render() {
    const { addressDetails, deleteAddress } = this.props;
    const initialValues = {
      addressid: addressDetails._id,
      addressline1: addressDetails.addressline1,
      addressline2: addressDetails.addressline2,
      addressline3: addressDetails.addressline3,
      town: addressDetails.town,
      state: addressDetails.state,
      country: addressDetails.country,
      postcode: addressDetails.postcode,
    };
    return (
      <Card>
        <CardBody>
          <Loader />
          <span className="text-muted">
            {addressDetails.addressline1} ,{addressDetails.addressline2}{" "}
            {addressDetails.addressline3},{addressDetails.town} ,
            {addressDetails.state} -{addressDetails.postcode},
            {addressDetails.country}
          </span>
          <br></br>
          <Button
            color="success"
            onClick={this.toggle}
            id={addressDetails._id}
            size="sm"
            className="remove"
          >
            {this.state.collapseOpen ? (
              <i class="fa fa-arrow-up">&nbsp;Close</i>
            ) : (
              <i class="fa fa-edit">&nbsp;Edit</i>
            )}
          </Button>
          <Button
            color="danger"
            size="sm"
            onClick={() => deleteAddress(addressDetails._id)}
            className="remove"
          >
            <i class="fa fa-trash" aria-hidden="true">
              &nbsp;delete
            </i>
          </Button>
          <Collapse isOpen={this.state.collapseOpen}>
            <hr />
            <br></br>
            <AddressDetailsForm
              initialValues={initialValues}
              next={this.updateAddressAndClose}
              renderReset={true}
              nextButtonLabel="Save & close"
              labelsize={4}
              inputsize={5}
            />
          </Collapse>
        </CardBody>
      </Card>
    );
  }

  toggle = () => {
    this.setState({ collapseOpen: !this.state.collapseOpen });
  };

  updateAddressAndClose = (values) => {
    this.toggle();
    this.props.updateAddress(values);
  };
}

export default EditAddresses;
