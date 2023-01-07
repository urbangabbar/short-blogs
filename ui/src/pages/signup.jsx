import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { startSignup } from "../store/signup/signup-actions";

export const SignUp = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (value) => {
      dispatch(startSignup(value));
    },
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
        </div>
        <div>
          <label>Password: </label>
          <input
            name="password"
            type={"password"}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};
