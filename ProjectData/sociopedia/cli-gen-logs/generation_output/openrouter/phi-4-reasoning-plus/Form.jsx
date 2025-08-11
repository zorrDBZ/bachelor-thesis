import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  password: Yup.string().required("Required"),
});

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password
          })
        });
        const data = await response.json();
        if (response.ok) {
          // Successful login – update global state and redirect
          dispatch(setLogin(data));
          navigate("/home");
        } else {
          // Display error message returned by server
          formik.setErrors({ general: data.msg || "Login failed" });
        }
      } catch (error) {
        formik.setErrors({ general: error.message || "An error occurred" });
      }
    }
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      sx={{ "& > :not(style)": { m: 1 } }}
    >
      <Typography variant="h6" gutterBottom>
        Login
      </Typography>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      {formik.errors.general && (
        <Typography color="error" variant="body2">
          {formik.errors.general}
        </Typography>
      )}
      <Button
        type="submit"
        color="primary"
        variant="contained"
        fullWidth
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </Box>
  );
};

export default Form;