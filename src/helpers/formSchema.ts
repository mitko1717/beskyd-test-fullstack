import * as yup from "yup";

export const formSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Min 3 characters")
    .max(20, "20 characters or less")
    .required("Required"),
  address: yup.string().required("Address is required"),
  amount: yup.number().required("Amount is required"),
  role: yup.string().required("Role is required"),
  status: yup.string().required("Status is required"),
});
