import { APILoadingStatus } from "../constants";
import { CREATE_BLOG, CREATE_BLOG_FAILED, CREATE_BLOG_SUCCESS } from "./blog-actions";

const initialCreateBlogState = {
  loadingState: APILoadingStatus.NOT_STARTED,
};

export const CreateBlogReducer = (
  state = initialCreateBlogState,
  { type, payload }
) => {
  switch (type) {
    case CREATE_BLOG:
      return { ...state, loadingState: APILoadingStatus.STARTED };
    case CREATE_BLOG_SUCCESS:
      return {
        ...state,
        loadingState: APILoadingStatus.SUCCESS,
        ...payload
      };
    case CREATE_BLOG_FAILED:
      return {
        ...state,
        loadingState: APILoadingStatus.FAILED,
        error: payload,
      };
    default:
      return state;
  }
};
