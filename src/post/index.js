import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getPost } from "../redux/action";

class Post extends Component {
  componentDidMount() {
    this.props.getPost();
  }
  render() {
    const { loading, error, data } = this.props;
    return (
      <>
        {error ? (
          <p className="text-danger">{`There is an error: ${error}`}</p>
        ) : null}
        {loading ? (
          <p>Loading . . . </p>
        ) : (
          <div className="table-responsive">
            <table className="table table-condensed">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map(({ id, title }) => (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{title}</td>
                    <td>
                      <Link to={`/comments/${id}`}>go to comments</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.post.loading,
  error: state.post.error,
  data: state.post.data
});

const mapDispatchToProps = dispatch => ({
  getPost: () => dispatch(getPost())
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
