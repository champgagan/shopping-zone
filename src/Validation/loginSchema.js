import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email_address: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required")
    .trim()
    .lowercase(),
  password: yup.string().required("password is required").min(6).max(15).trim(),
});
