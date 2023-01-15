import { combineReducers } from "redux";
import {
  CreateBlogReducer,
  DeleteBlogReducer,
  GetBlogsReducer,
  UpdateBlogReducer,
} from "./blogs/blog-reducer";
import { SignupReducer } from "./signup/signup-reducer";

export const rootReducer = combineReducers({
  signup: SignupReducer,
  createBlog: CreateBlogReducer,
  getBlogs: GetBlogsReducer,
  deleteBlog: DeleteBlogReducer,
  updateBlog: UpdateBlogReducer,
});
