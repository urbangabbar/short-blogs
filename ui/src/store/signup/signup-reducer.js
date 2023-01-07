import { APILoadingStatus } from "../constants";
import { SIGNUP, SIGNUP_FAILED, SIGNUP_SUCCESS } from "./signup-actions";

const initialSignupState = {
  loadingState: APILoadingStatus.NOT_STARTED,
};

export const SignupReducer = (
  state = initialSignupState,
  { type, payload }
) => {
  console.log("payload", payload)
  switch (type) {
    case SIGNUP:
      return { ...state, loadingState: APILoadingStatus.STARTED };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loadingState: APILoadingStatus.SUCCESS,
        ...payload
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        loadingState: APILoadingStatus.FAILED,
        error: payload,
      };
    default:
      return state;
  }
};
