import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APILoadingStatus } from "../store/constants";
import { startSignup } from "../store/signup/signup-actions";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, "Password is too short")
    .max(20, "Password is too long")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const signupState = useSelector((store) => store.signup);

  useEffect(() => {
    if (signupState.loadingState === APILoadingStatus.SUCCESS) {
      alert("User signed in Succefully");
      history.push("/create-blog/dashboard");
    } else if (signupState.loadingState === APILoadingStatus.FAILED) {
      alert("user alredy exists please try logging in");
      history.push("/create-blog/login");
    }
  }, [signupState]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (value) => {
      dispatch(startSignup(value));
    },
    validationSchema: SignupSchema,
  });

  return (
    <div>
      <h2>SignUp</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            name="email"
            type={"text"}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          )}
        </div>
        <div>
          <label>Password: </label>
          <input
            name="password"
            type={"password"}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && (
            <div style={{ color: "red" }}>{formik.errors.password}</div>
          )}
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};
