import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getPost } from "../redux/action";

import "./styles.css";

/**
 * Component for rendering all the information about the `Posts`
 * @param {boolean} loading provides if component needs to render loading indicator
 * @param {string} error provides the error message
 * @param {object} data provides all the information about the `posts`
 * @param {Function} getPost execute to get the information about the `posts`
 */
export const Post = ({ loading, error, data, getPost }) => {
  // get post after first render
  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      {error ? (
        <p className="text-danger">{`There is an error: ${error}`}</p>
      ) : null}
      {loading ? (
        <p>Loading . . .</p>
      ) : (
        <div className="row">
          {data.map(({ id, title }) => (
            <div className="col-3" key={id} data-testid={`card-${id}`}>
              <div className="card card-min-height">
                <div className="card-header ellipsis">{title}</div>
                <div className="card-body">
                  <Link to={`/comments/${id}`} data-testid={`link-${id}`}>
                    see comments
                  </Link>
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
