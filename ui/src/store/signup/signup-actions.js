import axios from "axios";
export const SIGNUP = "SIGNUP";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILED = "SIGNUP_FAILED";

// redux-thunk action creator
export const startSignup = (data) => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP });
    try {
      const response = await axios.post("/signup", data);
      localStorage.setItem("authtoken", response.data.authToken);
      dispatch({ type: SIGNUP_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: SIGNUP_FAILED, payload: error });
    }
  };
};
