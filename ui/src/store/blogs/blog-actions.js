import axios from "axios";

export const CREATE_BLOG = "CREATE_BLOG";
export const CREATE_BLOG_SUCCESS = "CREATE_BLOG_SUCCESS";
export const CREATE_BLOG_FAILED = "CREATE_BLOG_FAILED";

const getAuthToken = () => {
  return localStorage.getItem("authtoken");
};
// redux-thunk action creator
export const createBlog = (data) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_BLOG });
    try {
      const response = await axios.post("/blogs", data, {
        headers: {
          authtoken: getAuthToken(),
        },
      });
      dispatch({ type: CREATE_BLOG_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: CREATE_BLOG_FAILED, payload: error });
    }
  };
};
