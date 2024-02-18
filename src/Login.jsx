import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const formValidationSchema = yup.object({
  userid: yup.string().required().min(5),
  password: yup.string().required().min(8),
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Login() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        userid: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (e) => {
        const result = await fetch(
          // "https://backend-url-shortner-kappa.vercel.app/login",
          "https://backend-url-shortner-kappa.vercel.app/login",

          {
            method: "POST",
            body: JSON.stringify({
              username: e.userid,
              password: e.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        ).then((data) => data);
        if (result.status == 200) {
          navigate("/home");
        } else {
          handleClick();
        }
      },
    });

  return (
    <div style={{ padding: "80px 0" }}>
      <div></div>
      <div className="login-box">
        <p>Log in to account</p>
        <form onSubmit={handleSubmit}>
          <TextField
            name="userid"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.userid}
            label="Email Id"
            variant="outlined"
            size="small"
          />
          {touched.userid && errors.userid ? errors.userid : null}
          <TextField
            // id="outlined-basic"
            autoComplete="on"
            label="password"
            variant="outlined"
            size="small"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {touched.password && errors.password ? errors.password : null}
          <div style={{ textAlign: "center" }}>
            <p style={{ display: "inline-block" }}>
              New account? <NavLink to="/signup">Sign Up</NavLink>
            </p>
            <p style={{ display: "inline-block" }}>
              Forgot Password <NavLink to="/reset">Click Here</NavLink>
            </p>
          </div>
          <Button variant="contained" type="submit">
            login
          </Button>
        </form>
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Invalid credential
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
