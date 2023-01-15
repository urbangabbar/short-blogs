import { APILoadingStatus } from "../constants";
import {
  CREATE_BLOG,
  CREATE_BLOG_FAILED,
  CREATE_BLOG_SUCCESS,
  DELETE_BLOG,
  DELETE_BLOG_FAILED,
  DELETE_BLOG_SUCCESS,
  GET_BLOGS,
  GET_BLOGS_FAILED,
  GET_BLOGS_SUCCESS,
  UPDATE_BLOG,
  UPDATE_BLOG_FAILED,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_RESET
} from "./blog-actions";

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
        ...payload,
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

export const DeleteBlogReducer = (
  state = initialCreateBlogState,
  { type, payload }
) => {
  switch (type) {
    case DELETE_BLOG:
      return { ...state, loadingState: APILoadingStatus.STARTED };
    case DELETE_BLOG_SUCCESS:
      return {
        ...state,
        loadingState: APILoadingStatus.SUCCESS,
        ...payload,
      };
    case DELETE_BLOG_FAILED:
      return {
        ...state,
        loadingState: APILoadingStatus.FAILED,
        error: payload,
      };
    default:
      return state;
  }
};

export const UpdateBlogReducer = (
  state = initialCreateBlogState,
  { type, payload }
) => {
  switch (type) {
    case UPDATE_BLOG:
      return { ...state, loadingState: APILoadingStatus.STARTED };
    case UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        loadingState: APILoadingStatus.SUCCESS,
        ...payload,
      };
    case UPDATE_BLOG_FAILED:
      return {
        ...state,
        loadingState: APILoadingStatus.FAILED,
        error: payload,
      };
    case UPDATE_BLOG_RESET:
      return initialCreateBlogState;
    default:
      return state;
  }
};

export const GetBlogsReducer = (
  state = initialCreateBlogState,
  { type, payload }
) => {
  switch (type) {
    case GET_BLOGS:
      return { ...state, loadingState: APILoadingStatus.STARTED };
    case GET_BLOGS_SUCCESS:
      return {
        ...state,
        loadingState: APILoadingStatus.SUCCESS,
        blogs: payload,
      };
    case GET_BLOGS_FAILED:
      return {
        ...state,
        loadingState: APILoadingStatus.FAILED,
        error: payload,
      };
    default:
      return state;
  }
};
