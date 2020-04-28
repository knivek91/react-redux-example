import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getCommentsByPost } from "../redux/action";

import "./styles.css";
import { Link } from "react-router-dom";

const Comment = ({ loading, error, comments, getCommentsByPost, match }) => {
  const { post, data } = comments;

  useEffect(() => {
    getCommentsByPost(+match.params.id);
  }, []);

  return (
    <>
      {error ? (
        <p className="text-danger">{`There is an error: ${error}`}</p>
      ) : null}
      {loading ? (
        <p>Loading . . . </p>
      ) : (
        <div className="container">
          <Link to="/">
            <svg
              class="bi bi-arrow-left"
              width="2em"
              height="2em"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M5.854 4.646a.5.5 0 010 .708L3.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z"
                clip-rule="evenodd"
              />
              <path
                fill-rule="evenodd"
                d="M2.5 8a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z"
                clip-rule="evenodd"
              />
            </svg>
          </Link>
          <h2 className="display-inline">{post.title} comments.</h2>
          <hr />
          {data.length === 0 ? (
            <h3>Has no comments . . </h3>
          ) : (
            data.map(({ id, email, body }) => (
              <div className="row" key={id}>
                <div className="media comment-box">
                  <div className="media-left">
                    <span>
                      <img
                        className="img-responsive user-photo"
                        src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="icon"
                      />
                    </span>
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">{email}</h4>
                    <p>{body}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  loading: state.comments.loading,
  error: state.comments.error,
  comments: state.comments.data
});

const mapDispatchToProps = dispatch => ({
  getCommentsByPost: id => dispatch(getCommentsByPost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
