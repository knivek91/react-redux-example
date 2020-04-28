import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getPost } from "../redux/action";

import "./styles.css";

const Post = ({ loading, error, data, getPost }) => {
  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      {error ? (
        <p className="text-danger">{`There is an error: ${error}`}</p>
      ) : null}
      {loading ? (
        <p>Loading . . . </p>
      ) : (
        <div className="row">
          {data.map(({ id, title }) => (
            <div className="col-3">
              <div class="card card-min-height">
                <div class="card-header ellipsis">{title}</div>
                <div class="card-body">
                  <Link to={`/comments/${id}`}>see comments</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  loading: state.post.loading,
  error: state.post.error,
  data: state.post.data
});

const mapDispatchToProps = dispatch => ({
  getPost: () => dispatch(getPost())
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
