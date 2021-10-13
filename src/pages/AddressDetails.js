import React, { Component } from "react";
import { Form, FormGroup, Input, Button, Label, Col } from "reactstrap";

export default class AddressDetails extends Component {
  render() {
    const {
      renderReset,
      handleChange,
      handleReset,
      handleBlur,
      handleSubmit,
      values,
      errors,
      touched,
      isSubmitting,
      labelsize = 2,
      inputsize = 5,
      nextButtonLabel,
    } = this.props;
    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
          <Label sm={labelsize} for="addressline1">
            <b>Address Line 1</b>
          </Label>
          <Col sm={inputsize}>
            <Input
              type="text"
              name="addressline1"
              id="addressline1"
              placeholder="Address Line 1"
              invalid={!!errors.addressline1 && touched.addressline1}
              valid={!errors.addressline1 && touched.addressline1}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.addressline1}
            />
          </Col>
          <Col>
            {errors.addressline1 && touched.addressline1 ? (
              <span className="formErrors">{errors.addressline1}</span>
            ) : null}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={labelsize} for="addressline2">
            <b>Address Line 2</b>
          </Label>
          <Col sm={inputsize}>
            <Input
              type="text"
              name="addressline2"
              id="addressline2"
              placeholder="Address Line 2"
              invalid={!!errors.addressline2 && touched.addressline2}
              valid={!errors.addressline2 && touched.addressline2}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.addressline2}
            />
          </Col>
          <Col>
            {errors.addressline2 && touched.addressline2 ? (
              <span className="formErrors">{errors.addressline2}</span>
            ) : null}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={labelsize} for="addressline3">
            <b>Address Line 3</b>
          </Label>
          <Col sm={inputsize}>
            <Input
              type="text"
              name="addressline3"
              id="addressline3"
              placeholder="Address Line 3"
              invalid={!!errors.addressline3 && touched.addressline3}
              valid={!errors.addressline3 && touched.addressline3}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.addressline3}
            />
          </Col>
          <Col>
            {errors.addressline3 && touched.addressline3 ? (
              <span className="formErrors">{errors.addressline3}</span>
            ) : null}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={labelsize} for="town">
            <b>Town/city</b>
          </Label>
          <Col sm={inputsize}>
            <Input
              type="text"
              name="town"
              id="town"
              placeholder="Town/city"
              invalid={!!errors.town && touched.town}
              valid={!errors.town && touched.town}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.town}
            />
          </Col>
          <Col>
            {errors.town && touched.town ? (
              <span className="formErrors">{errors.town}</span>
            ) : null}
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={labelsize} for="town">
            <b>State</b>
          </Label>
          <Col sm={inputsize}>
            <Input
              type="text"
              name="state"
              id="state"
              placeholder="State"
              invalid={!!errors.state && touched.state}
              valid={!errors.state && touched.state}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.state}
            />
          </Col>
          <Col>
            {errors.state && touched.state ? (
              <span className="formErrors">{errors.state}</span>
            ) : null}
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={labelsize} for="postcode">
            <b>postcode</b>
          </Label>
          <Col sm={inputsize}>
            <Input
              type="text"
              name="postcode"
              id="postcode"
              placeholder="postcode"
              invalid={!!errors.postcode && touched.postcode}
              valid={!errors.postcode && touched.postcode}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.postcode}
            />
          </Col>
          <Col>
            {errors.postcode && touched.postcode ? (
              <span className="formErrors">{errors.postcode}</span>
            ) : null}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={labelsize} for="country">
            <b>Country</b>
          </Label>
          <Col sm={inputsize}>
            <Input
              type="text"
              name="country"
              id="country"
              placeholder="Country"
              invalid={!!errors.country && touched.country}
              valid={!errors.country && touched.country}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.country}
            />
          </Col>
          <Col>
            {errors.country && touched.country ? (
              <span className="formErrors">{errors.country}</span>
            ) : null}
          </Col>
        </FormGroup>
        {renderReset && (
          <Button
            color="link"
            type="button"
            onClick={handleReset}
            className="add"
          >
            Reset
          </Button>
        )}
        <Button
          disabled={isSubmitting}
          color="success"
          type="submit"
          className="add"
        >
          {nextButtonLabel}
        </Button>
      </Form>
    );
  }
}
