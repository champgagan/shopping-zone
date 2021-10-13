import * as yup from "yup";

export const AddressSchema = yup.object().shape({
  addressline1: yup
    .string()
    .strict(true)
    .required("Addressline 1 is required")
    .trim("First character and last character cannot be a space"),
  addressline2: yup
    .string()
    .strict(true)
    .required("Addressline 2 is required")
    .trim("First character and last character cannot be a space"),
  addressline3: yup
    .string()
    .strict(true)
    .notRequired()
    .trim("First character and last character cannot be a space"),
  town: yup
    .string()
    .strict(true)
    .required("City/Town is required")
    .trim("First character and last character cannot be a space"),
  state: yup
    .string()
    .strict(true)
    .matches(
      /^[a-z A-Z 0-9]*$/,
      "State should not include any special characters"
    )
    .required("State is required")
    .max(15)
    .trim("First character and last character cannot be a space"),
  postcode: yup
    .string()
    .strict(true)
    .matches(
      /^[a-z A-Z 0-9]*$/,
      "Postcode should not include any special characters"
    )
    .required("Postcode is required")
    .trim("First character and last character cannot be a space"),
  country: yup
    .string()
    .required("Country is required")
    .strict(true)
    .trim("First character and last character cannot be a space"),
});
