import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Field, useFormik, Formik } from "formik";
import * as yup from "yup";
import { FormControl, Grid, Input, InputLabel } from "@mui/material";

export type IInitialValues = {
  name: string;
  email: string;
  number: number;
  password: string;
  confirmPassword: string;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const formSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "min 3 chars")
      .max(20, "20 charecters or less")
      .required("required"),
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  const initialValues: IInitialValues = {
    name: "",
    email: "",
    number: 1,
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values: IInitialValues) => {
    console.log("handleSubmit");

    const formData = {
      name: values.name,
      email: values.email,
      number: values.number,
      password: "",
      confirmPassword: "",
    }
    //   closeModal();
  };

  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <Modal
      open={isModalOpen}
    //   onClose={() => closeModal()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
          onSubmit={() => {}}
        >
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={formik.touched.name && Boolean(formik.errors.name)}
                >
                  <InputLabel htmlFor="name">name</InputLabel>
                  <Field
                    name="name"
                    value={formik.values.name}
                    type="name"
                    as={Input}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.name && formik.touched.name && (
                    <div style={{ color: "red" }}>{formik.errors.name}</div>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={formik.touched.email && Boolean(formik.errors.email)}
                >
                  <InputLabel htmlFor="email">email</InputLabel>
                  <Field
                    name="email"
                    value={formik.values.email}
                    type="email"
                    as={Input}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div style={{ color: "red" }}>{formik.errors.email}</div>
                  )}
                </FormControl>
              </Grid>

              <Button
                variant="contained"
                type="submit"
                style={{ marginTop: 20 }}
              >
                add
              </Button>
            </Grid>
          </form>
        </Formik>
      </Box>
    </Modal>
  );
}