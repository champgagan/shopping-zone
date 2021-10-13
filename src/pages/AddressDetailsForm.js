import { withFormik } from "formik";
import AddressDetails from "./AddressDetails";
import { AddressSchema } from "../Validation/AddressSchema";

export const AddressDetailsForm = withFormik({
  mapPropsToValues: (props) =>
    props.initialValues || {
      addressline1: "",
      addressline2: "",
      addressline3: "",
      town: "",
      state: "",
      country: "",
      postcode: "",
    },
  enableReinitialize: true,
  validateOnBlur: true,
  validationSchema: AddressSchema,
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    setSubmitting(false);
    if (props && props.next) {
      props.next(values);
    }
    resetForm();
  },
})(AddressDetails);
