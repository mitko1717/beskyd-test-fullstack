import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Field, useFormik, Formik } from "formik";
import { FormControl, Grid, Input, InputLabel, MenuItem, Select } from "@mui/material";
import { recordService } from "../service/RecordService";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { REQ_KEY } from "../query-const";
import { AxiosError } from "axios";
import { IModalProps } from "../models/interfaces";
import { IEditRecord } from "../types/editRecord";
import { formSchema } from "../helpers/formSchema";
import { initialValues } from "../helpers/initValEdit";
import { style } from "../helpers/modalStyle";

export default function EditModal({ isOpen, handleOpenModal, id }: IModalProps) {
  const queryClient = useQueryClient();
  
  const editRecord = useMutation((formData: IEditRecord) => recordService.updateRecord(id!, formData), {
    onSuccess: () => {
      queryClient.refetchQueries(REQ_KEY);
      handleOpenModal()
      toast.success('record edited successfully!');
    },
    onError: (err: AxiosError) => {
      toast.error(`wasnt edited! ${err.message}`);
    }
  });

  const handleSubmit = (values: IEditRecord) => {
    const formData = {
      name: values.name,
      address: values.address,
      amount: values.amount,
      role: values.role,
      status: values.status,
    };
    editRecord.mutate(formData)
  };

  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: (values) => {
      handleSubmit(values)
      formik.resetForm();
    }
  });

  return (
    <Modal
      open={isOpen}
      onClose={() => handleOpenModal()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <span className="text-xs font-bold">editing record with {id} id</span>
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
              {/*  */}

              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={formik.touched.address && Boolean(formik.errors.address)}
                >
                  <InputLabel htmlFor="address">Address</InputLabel>
                  <Field
                    name="address"
                    value={formik.values.address}
                    type="text"
                    as={Input}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.address && formik.touched.address && (
                    <div style={{ color: "red" }}>{formik.errors.address}</div>
                  )}
                </FormControl>
              </Grid>
              {/*  */}

              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                >
                  <InputLabel htmlFor="amount">Amount</InputLabel>
                  <Field
                    name="amount"
                    value={formik.values.amount}
                    type="number"
                    as={Input}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.amount && formik.touched.amount && (
                    <div style={{ color: "red" }}>{formik.errors.amount}</div>
                  )}
                </FormControl>
              </Grid>
              {/*  */}

              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={formik.touched.role && Boolean(formik.errors.role)}
                >
                  <InputLabel htmlFor="role">Role</InputLabel>
                  <Field
                    name="role"
                    value={formik.values.role}
                    as={Select}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value="Customer">Customer</MenuItem>
                    <MenuItem value="Business">Business</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                  </Field>
                  {formik.errors.role && formik.touched.role && (
                    <div style={{ color: "red" }}>{formik.errors.role}</div>
                  )}
                </FormControl>
              </Grid>
              {/*  */}

              <Grid item xs={12}>
                <FormControl
                  fullWidth
                  error={formik.touched.status && Boolean(formik.errors.status)}
                >
                  <InputLabel htmlFor="status">Status</InputLabel>
                  <Field
                    name="status"
                    value={formik.values.status}
                    as={Select}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Close">Close</MenuItem>
                  </Field>
                  {formik.errors.status && formik.touched.status && (
                    <div style={{ color: "red" }}>{formik.errors.status}</div>
                  )}
                </FormControl>
              </Grid>

              <Button variant="contained" type="submit" style={{ margin: '1rem' }}>
                add
              </Button>
            </Grid>
          </form>
        </Formik>
      </Box>
    </Modal>
  );
}
