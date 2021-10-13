import * as yup from "yup";

export const RegistrationSchema = yup.object().shape({
  email_address: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required")
    .trim()
    .lowercase(),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      " Password must be min 6 letter, with at least a symbol, upper and lower case letters and a number"
    )
    .required("password is required")
    .min(6, "Pasword must be of length greater than or equal to 6")
    .max(15, "Pasword at most be of length less than or equal to 15")
    .trim(),
  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Password and confirm password must match"
    ),
  mobile: yup
    .string()
    .required("Mobile no is required")
    .matches(/^[0-9]{10}$/, "Mobile no needs to be a 10 digits number"),
  firstname: yup
    .string()
    .matches(
      /^[a-zA-Z0-9]*$/,
      "First Name should not include any special characters"
    )
    .required("First Name is required")
    .max(15),
  lastname: yup
    .string()
    .matches(
      /^[a-zA-Z0-9]*$/,
      "Last name should not include any special characters"
    )
    .required("Last Name is required")
    .max(15),
  age: yup
    .string()
    .matches(/^[0-9]{1,3}$/, "Age can only have min 1 and max 3 digts")
    .required("Age is required")
    .min(1)
    .max(100),
  gender: yup
    .string()
    .lowercase()
    .required("Gender is required")
    .oneOf(["male", "female", "other"]),
  country: yup.string().required("Country is required"),
});
