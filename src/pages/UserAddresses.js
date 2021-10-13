import React, { Component } from "react";
import { Alert, Row, Col } from "reactstrap";
import { AddressDetailsForm } from "./AddressDetailsForm";
import EditAddresses from "./EditAddresses";
import { connect } from "react-redux";
import { AddressAction } from "../actions/AddressAction";
import Loader from './Loader';

class UserAddresses extends Component {
  componentDidMount() {
    this.props.getAddress();
  }

  render() {
    const { address } = this.props;
    return (
      <div>
        <Alert color="success">Please manage your address below</Alert>
        <Row>
          <Col xs={{ size: 5, offset: 1 }} className="addressColumn">
            {address && address.addresses && address.addresses.length > 0 ? (
              address.addresses.map((obj) => (
                <>
                  <br></br>
                  <EditAddresses
                    key={obj._id}
                    deleteAddress={this.props.deleteAddress} updateAddress={this.updateAddress}
                    addressDetails={obj}
                  />{" "}
                </>
              ))
            ) : (
                <Alert color="warning">There are no saved addresses with us.</Alert>
            )}
          </Col>
          <Col></Col>
          <Col xs={5}>
            <br></br>
            <AddressDetailsForm
              renderReset={false}
              next={this.addNewAddress}
              nextButtonLabel="Add new address"
              labelsize={3}
              inputsize={5}
            />
            <Loader/>
          </Col>
        </Row>
      </div>
    );
  }6

   addNewAddress=(values)=>{     
    const address={
        addressline1:values.addressline1,
        addressline2:values.addressline2,
        addressline3:values.addressline3,
        town:values.town,
        state:values.state,
        country:values.country,
        postcode:values.postcode
    }
    const user=localStorage.getItem('userid');
    const email=localStorage.getItem('userdetails');    
    this.props.addAddress(user,email,address);
    }

    updateAddress=(values)=>{     
        console.log('Inside the udpdate address',values);
        const address={
            addressid:values.addressid,
            addressline1:values.addressline1,
            addressline2:values.addressline2,
            addressline3:values.addressline3,
            town:values.town,
            state:values.state,
            country:values.country,
            postcode:values.postcode
        }
        const user=localStorage.getItem('userid');
        const email=localStorage.getItem('userdetails');
        this.props.updateAddress(user,email,address);            
        }

}



const mapStateToProps = (state) => {
  return {
    address: state.address,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAddress: () => {
      const user = localStorage.getItem("userid");
      dispatch(AddressAction.getAddress(user));
    },
    addAddress: (user,email,address) => {
      dispatch(AddressAction.addAddress(user,email,address));
    },
    deleteAddress: (addressId) => {
      const user = localStorage.getItem("userid");
      dispatch(AddressAction.deleteAddress(user, addressId));
    },
    updateAddress: (user,email,address) => {        
        dispatch(AddressAction.updateAddress(user,email, address));
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAddresses);
