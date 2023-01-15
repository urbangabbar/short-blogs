import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
  UPDATE_BLOG_RESET,
} from "../store/blogs/blog-actions";
import { APILoadingStatus } from "../store/constants";
import { useHistory } from "react-router-dom";

export const DashBoard = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <div>
        <button onClick={openModal}>Create Blog</button>
        <CreateModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
        <ListBlogs />
      </div>
    </div>
  );
};

const ListBlogs = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getAllBlogs(history));
  }, []);

  const allBlogs = useSelector((state) => state.getBlogs);

  if (allBlogs.loadingState !== APILoadingStatus.SUCCESS) {
    return <>Loading !!</>;
  }
  return (
    <div>
      <h2>List of your blogs</h2>
      <ol>
        {allBlogs.blogs.map((blog, i) => (
          <BlogElement key={i} blog={blog} />
        ))}
      </ol>
    </div>
  );
};

const BlogElement = ({ blog }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const blogDeletionLoadingState = useSelector(
    (state) => state.deleteBlog.loadingState
  );
  useEffect(() => {
    if (blogDeletionLoadingState === APILoadingStatus.SUCCESS) {
      alert("Blog deleted succesfully");
      dispatch(getAllBlogs(history));
    }
  }, [blogDeletionLoadingState]);

  const [updateModalIsOpen, setUpdateIsOpen] = useState(false);
  function openUpdateModal() {
    setUpdateIsOpen(true);
  }

  const onDelete = (id) => {
    dispatch(deleteBlog(id, history));
  };

  return (
    <li>
      {blog.title}
      <button onClick={openUpdateModal}>Edit</button>
      <button onClick={() => onDelete(blog._id)}>Delete</button>
      {updateModalIsOpen && <UpdateModal
        modalIsOpen={updateModalIsOpen}
        setIsOpen={setUpdateIsOpen}
        blogData={blog}
      />}
    </li>
  );
};

const CreateModal = ({ modalIsOpen, setIsOpen }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const blogCreationLoadingState = useSelector(
    (state) => state.createBlog.loadingState
  );

  function closeModal() {
    formik.resetForm();
    setIsOpen(false);
  }
  useEffect(() => {
    if (blogCreationLoadingState === APILoadingStatus.SUCCESS) {
      alert("Blog created succesfully");
      dispatch(getAllBlogs(history));
      closeModal();
    }
  }, [blogCreationLoadingState]);

  const formik = useFormik({
    initialValues: { title: "", content: "" },
    onSubmit: (value) => {
      dispatch(createBlog(value, history));
    },
    enableReinitialize: true,
  });
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "500px",
      height: "500px",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Create Blog"
      style={customStyles}
    >
      <h2>Create Blog</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Title</label>
          <input
            name="title"
            type={"text"}
            onChange={formik.handleChange}
            value={formik.values.title}
          />
        </div>
        <div>
          <label>Content</label>
          <input
            name="content"
            type={"text"}
            onChange={formik.handleChange}
            value={formik.values.content}
          />
        </div>
        <button type="submit">Save</button>
        <button onClick={closeModal}>Cancel</button>
      </form>
    </Modal>
  );
};

const UpdateModal = ({ modalIsOpen, setIsOpen, blogData }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const blogUpdationLoadingState = useSelector(
    (state) => state.updateBlog.loadingState
  );

  function closeModal() {
    formik.resetForm();
    setIsOpen(false);
  }
  useEffect(() => {
    if (blogUpdationLoadingState === APILoadingStatus.SUCCESS) {
      dispatch({type: UPDATE_BLOG_RESET})
      alert("Blog update succesfully");
      dispatch(getAllBlogs(history));
      closeModal();
    }
  }, [blogUpdationLoadingState]);

  const formik = useFormik({
    initialValues: { title: blogData.title, content: blogData.content },
    onSubmit: (value) => {
      dispatch(updateBlog(blogData._id, value, history));
    },
    enableReinitialize: true,
  });
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "500px",
      height: "500px",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Update Blog"
      style={customStyles}
    >
      <h2>Update Blog</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Title</label>
          <input
            name="title"
            type={"text"}
            onChange={formik.handleChange}
            value={formik.values.title}
          />
        </div>
        <div>
          <label>Content</label>
          <input
            name="content"
            type={"text"}
            onChange={formik.handleChange}
            value={formik.values.content}
          />
        </div>
        <button type="submit">Save</button>
        <button onClick={closeModal}>Cancel</button>
      </form>
    </Modal>
  );
};
