import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { getCommentsByPost, addCommentToPost } from "../redux/action";

import "./styles.css";
import { Link } from "react-router-dom";
import { Input, TextArea } from "./component";

const initialValues = {
  name: "",
  email: "",
  body: ""
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Must be a valid email").required("Required"),
  name: Yup.string().min(5, "At least 5 characters").required("Required"),
  body: Yup.string().min(15, "At least 15 characters").required("Required")
});

export const Comment = ({
  loading,
  error,
  comments,
  post,
  match,
  getCommentsByPost,
  addCommentToPost
}) => {
  useEffect(() => {
    getCommentsByPost(+match.params.id);
  }, []);

  const onSumbit = (values, { resetForm }) => {
    addCommentToPost({ post: post, data: { postId: post.id, ...values } });
    resetForm();
  };

  return (
    <>
      {error ? (
        <p className="text-danger">{`There is an error: ${error}`}</p>
      ) : null}
      {loading ? (
        <p>Loading . . . </p>
      ) : (
        <div className="container">
          <Link to="/" data-testid="back-link">
            <svg
              className="bi bi-arrow-left"
              width="2em"
              height="2em"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.854 4.646a.5.5 0 010 .708L3.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M2.5 8a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <h2 className="display-inline">{post.title} comments.</h2>
          <hr />
          {comments.length === 0 ? (
            <h3>Has no comments . . </h3>
          ) : (
            <>
              {comments.map(({ id, email, body }) => (
                <div className="row" key={id}>
                  <div
                    className="media comment-box"
                    data-testid={`comment-${id}`}
                  >
                    <div className="media-left">
                      <span>
                        <img
                          className="img-responsive user-photo"
                          src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                          alt="icon"
                          data-testid={`comment-img-${id}`}
                        />
                      </span>
                    </div>
                    <div className="media-body">
                      <h4
                        className="media-heading"
                        data-testid={`comment-email-${id}`}
                      >
                        {email}
                      </h4>
                      <p data-testid={`comment-body-${id}`}>{body}</p>
                    </div>
                  </div>
                </div>
              ))}
              <hr />
              <h4>Add a comment</h4>
              <div className="row">
                <div className="col">
                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSumbit}
                    validationSchema={validationSchema}
                  >
                    {() => (
                      <Form>
                        <div className="mb-4">
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            className="form-control"
                            placeholder="Name"
                          />
                        </div>
                        <div className="mb-4">
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="Email"
                          />
                        </div>
                        <div className="mb-4">
                          <TextArea
                            id="body"
                            name="body"
                            className="form-control"
                            placeholder="Comment . . . "
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-secondary float-right"
                        >
                          Add Comment
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  loading: state.comments.loading,
  error: state.comments.error,
  comments: state.comments.data.data.filter(
    d => d.postId === state.comments.data.post.id
  ),
  post: state.comments.data.post
});

const mapDispatchToProps = dispatch => ({
  getCommentsByPost: id => dispatch(getCommentsByPost(id)),
  addCommentToPost: comment => dispatch(addCommentToPost(comment))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
