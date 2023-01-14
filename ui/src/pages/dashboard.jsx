import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../store/blogs/blog-actions";
import { APILoadingStatus } from "../store/constants";

export const DashBoard = () => {
  const dispatch = useDispatch();
  const blogCreationLoadingState = useSelector(
    (state) => state.createBlog.loadingState
  );
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
  const formik = useFormik({
    initialValues: { title: "", content: "" },
    onSubmit: (value) => {
      dispatch(createBlog(value));
    },
    enableReinitialize: true
  });

  const [modalIsOpen, setIsOpen] = useState(false);
  function closeModal() {
    formik.resetForm()
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  useEffect(() => {
    if (blogCreationLoadingState === APILoadingStatus.SUCCESS) {
      alert("Blog created succesfully");
      closeModal();
    }
  }, [blogCreationLoadingState]);
  function afterOpenModal() {}
  return (
    <div>
      <div>
        <button onClick={openModal}>Create Blog</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Create Blog"
          onAfterOpen={afterOpenModal}
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
      </div>
    </div>
  );
};
