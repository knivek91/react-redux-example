import React, { Component } from "react";
import { connect } from "react-redux";

import { getCommentsByPost } from "../redux/action";

import "./styles.css";

class Comment extends Component {
  componentDidMount() {
    this.props.getCommentsByPost(+this.props.match.params.id);
  }
  render() {
    const { loading, error, comments } = this.props;
    const { post, data } = comments;
    return (
      <>
        {error ? (
          <p className="text-danger">{`There is an error: ${error}`}</p>
        ) : null}
        {loading ? (
          <p>Loading . . . </p>
        ) : (
          <div className="container">
            <h1>{post.title} comments.</h1>
            <hr />
            {data.length === 0 ? (
              <h3>Has no comments . . </h3>
            ) : (
              data.map(({ id, email, body }) => (
                <div className="row" key={id}>
                  <div className="media comment-box">
                    <div className="media-left">
                      <a href="#">
                        <img
                          className="img-responsive user-photo"
                          src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                          alt="icon"
                        />
                      </a>
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
  }
}

const mapStateToProps = state => ({
  loading: state.comments.loading,
  error: state.comments.error,
  comments: state.comments.data
});

const mapDispatchToProps = dispatch => ({
  getCommentsByPost: id => dispatch(getCommentsByPost(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
