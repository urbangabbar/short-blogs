import { combineReducers } from "redux";
import { CreateBlogReducer } from "./blogs/blog-reducer";
import { SignupReducer } from "./signup/signup-reducer";

export const rootReducer = combineReducers({ signup: SignupReducer, createBlog: CreateBlogReducer });
