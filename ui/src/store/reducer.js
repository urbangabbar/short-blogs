import { combineReducers } from "redux";
import { SignupReducer } from "./signup/signup-reducer";

export const rootReducer = combineReducers({ signup: SignupReducer });
