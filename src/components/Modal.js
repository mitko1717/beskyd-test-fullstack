var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Field, useFormik, Formik } from "formik";
import * as yup from "yup";
import { FormControl, Grid, Input, InputLabel } from "@mui/material";
var style = {
    position: "absolute",
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
    var _a = React.useState(false), isModalOpen = _a[0], setIsModalOpen = _a[1];
    var formSchema = yup.object().shape({
        name: yup
            .string()
            .min(3, "min 3 chars")
            .max(20, "20 charecters or less")
            .required("required"),
        email: yup.string().email("Invalid email").required("Email is required"),
    });
    var initialValues = {
        name: "",
        email: "",
        number: 1,
        password: "",
        confirmPassword: "",
    };
    var handleSubmit = function (values) {
        console.log("handleSubmit");
        var formData = {
            name: values.name,
            email: values.email,
            number: values.number,
            password: "",
            confirmPassword: "",
        };
        //   closeModal();
    };
    var formik = useFormik({
        initialValues: initialValues,
        validationSchema: formSchema,
        onSubmit: function (values) { return handleSubmit(values); },
    });
    return (_jsx(Modal, __assign({ open: isModalOpen, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" }, { children: _jsx(Box, __assign({ sx: style }, { children: _jsx(Formik, __assign({ initialValues: initialValues, validationSchema: formSchema, onSubmit: function () { } }, { children: _jsx("form", __assign({ onSubmit: formik.handleSubmit }, { children: _jsxs(Grid, __assign({ container: true, spacing: 2 }, { children: [_jsx(Grid, __assign({ item: true, xs: 12 }, { children: _jsxs(FormControl, __assign({ fullWidth: true, error: formik.touched.name && Boolean(formik.errors.name) }, { children: [_jsx(InputLabel, __assign({ htmlFor: "name" }, { children: "name" })), _jsx(Field, { name: "name", value: formik.values.name, type: "name", as: Input, onChange: formik.handleChange, onBlur: formik.handleBlur }), formik.errors.name && formik.touched.name && (_jsx("div", __assign({ style: { color: "red" } }, { children: formik.errors.name })))] })) })), _jsx(Grid, __assign({ item: true, xs: 12 }, { children: _jsxs(FormControl, __assign({ fullWidth: true, error: formik.touched.email && Boolean(formik.errors.email) }, { children: [_jsx(InputLabel, __assign({ htmlFor: "email" }, { children: "email" })), _jsx(Field, { name: "email", value: formik.values.email, type: "email", as: Input, onChange: formik.handleChange, onBlur: formik.handleBlur }), formik.errors.email && formik.touched.email && (_jsx("div", __assign({ style: { color: "red" } }, { children: formik.errors.email })))] })) })), _jsx(Button, __assign({ variant: "contained", type: "submit", style: { marginTop: 20 } }, { children: "add" }))] })) })) })) })) })));
}
