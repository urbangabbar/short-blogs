import axios from "axios";
const SIGNUP = "SIGNUP";
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
const SIGNUP_FAILED = "SIGNUP_FAILED";

export const startSignup = (data) => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP });
    try {
      const response = await axios.post("/signup", data);
      dispatch({ type: SIGNUP_SUCCESS, paylod: response });
    } catch (error) {
      console.log(error);
      dispatch({ type: SIGNUP_FAILED, paylod: error });
    }
  };
};
