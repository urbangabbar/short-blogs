import axios from "axios";

export const CREATE_BLOG = "CREATE_BLOG";
export const CREATE_BLOG_SUCCESS = "CREATE_BLOG_SUCCESS";
export const CREATE_BLOG_FAILED = "CREATE_BLOG_FAILED";

export const DELETE_BLOG = "DELETE_BLOG";
export const DELETE_BLOG_SUCCESS = "DELETE_BLOG_SUCCESS";
export const DELETE_BLOG_FAILED = "DELETE_BLOG_FAILED";

export const GET_BLOGS = "GET_BLOGS";
export const GET_BLOGS_SUCCESS = "GET_BLOGS_SUCCESS";
export const GET_BLOGS_FAILED = "GET_BLOGS_FAILED";

export const UPDATE_BLOG = "UPDATE_BLOG";
export const UPDATE_BLOG_SUCCESS = "UPDATE_BLOG_SUCCESS";
export const UPDATE_BLOG_FAILED = "UPDATE_BLOG_FAILED";
export const UPDATE_BLOG_RESET = "UPDATE_BLOG_RESET";

const getAuthToken = () => {
  return localStorage.getItem("authtoken");
};
// redux-thunk action creator
export const createBlog = (data, history) => {
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
      if(error.code === "ERR_BAD_REQUEST"){
        history.push("/create-blog/signup")
      }
      dispatch({ type: CREATE_BLOG_FAILED, payload: error });
    }
  };
};

export const getAllBlogs = (history)=> {
  return async (dispatch) => {
    dispatch({ type: GET_BLOGS });
    try {
      const response = await axios.get("/user-blogs", {
        headers: {
          authtoken: getAuthToken(),
        },
      });
      dispatch({ type: GET_BLOGS_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      if(error.code === "ERR_BAD_REQUEST"){
        history.push("/create-blog/signup")
      }
      dispatch({ type: GET_BLOGS_FAILED, payload: error });
    }
  };
}

export const deleteBlog = (id, history)=> {
  return async (dispatch) => {
    dispatch({ type: DELETE_BLOG });
    try {
      const response = await axios.delete(`/blogs/${id}`, {
        headers: {
          authtoken: getAuthToken(),
        },
      });
      dispatch({ type: DELETE_BLOG_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      if(error.code === "ERR_BAD_REQUEST"){
        history.push("/create-blog/signup")
      }
      dispatch({ type: DELETE_BLOG_FAILED, payload: error });
    }
  };
}

export const updateBlog = (id,data, history)=> {
  return async (dispatch) => {
    dispatch({ type: UPDATE_BLOG });
    try {
      const response = await axios.put(`/blogs/${id}`,data, {
        headers: {
          authtoken: getAuthToken(),
        },
      });
      dispatch({ type: UPDATE_BLOG_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      if(error.code === "ERR_BAD_REQUEST"){
        history.push("/create-blog/signup")
      }
      dispatch({ type: UPDATE_BLOG_FAILED, payload: error });
    }
  };
}
