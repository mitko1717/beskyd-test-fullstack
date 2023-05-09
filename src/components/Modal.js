"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Box_1 = __importDefault(require("@mui/material/Box"));
var Button_1 = __importDefault(require("@mui/material/Button"));
var Modal_1 = __importDefault(require("@mui/material/Modal"));
var formik_1 = require("formik");
var yup = __importStar(require("yup"));
var material_1 = require("@mui/material");
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
function BasicModal() {
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
    var formik = (0, formik_1.useFormik)({
        initialValues: initialValues,
        validationSchema: formSchema,
        onSubmit: function (values) { return handleSubmit(values); },
    });
    return (React.createElement(Modal_1.default, { open: isModalOpen, "aria-labelledby": "modal-modal-title", "aria-describedby": "modal-modal-description" },
        React.createElement(Box_1.default, { sx: style },
            React.createElement(formik_1.Formik, { initialValues: initialValues, validationSchema: formSchema, onSubmit: function () { } },
                React.createElement("form", { onSubmit: formik.handleSubmit },
                    React.createElement(material_1.Grid, { container: true, spacing: 2 },
                        React.createElement(material_1.Grid, { item: true, xs: 12 },
                            React.createElement(material_1.FormControl, { fullWidth: true, error: formik.touched.name && Boolean(formik.errors.name) },
                                React.createElement(material_1.InputLabel, { htmlFor: "name" }, "name"),
                                React.createElement(formik_1.Field, { name: "name", value: formik.values.name, type: "name", as: material_1.Input, onChange: formik.handleChange, onBlur: formik.handleBlur }),
                                formik.errors.name && formik.touched.name && (React.createElement("div", { style: { color: "red" } }, formik.errors.name)))),
                        React.createElement(material_1.Grid, { item: true, xs: 12 },
                            React.createElement(material_1.FormControl, { fullWidth: true, error: formik.touched.email && Boolean(formik.errors.email) },
                                React.createElement(material_1.InputLabel, { htmlFor: "email" }, "email"),
                                React.createElement(formik_1.Field, { name: "email", value: formik.values.email, type: "email", as: material_1.Input, onChange: formik.handleChange, onBlur: formik.handleBlur }),
                                formik.errors.email && formik.touched.email && (React.createElement("div", { style: { color: "red" } }, formik.errors.email)))),
                        React.createElement(Button_1.default, { variant: "contained", type: "submit", style: { marginTop: 20 } }, "add")))))));
}
exports.default = BasicModal;
