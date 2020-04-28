import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Comment } from "./index";

const defaultProps = {
  loading: false,
  comments: [],
  post: { title: "" },
  error: "",
  getCommentsByPost: jest.fn(),
  match: { params: {} }
};

const setup = (props = defaultProps) =>
  render(
    <MemoryRouter>
      <Comment {...props} />
    </MemoryRouter>
  );

describe("Post Component", () => {
  it("Loading Render", () => {
    const { getByText } = setup({ ...defaultProps, loading: true });
    expect(getByText("Loading . . .")).toBeInTheDocument();
  });
  it("Error Render", () => {
    const { getByText } = setup({
      ...defaultProps,
      error: "Test Error by Text"
    });
    expect(
      getByText("There is an error: Test Error by Text")
    ).toBeInTheDocument();
  });
  it("Error Render", () => {
    const { getByText, getByTestId } = setup({
      ...defaultProps,
      post: { title: "Post Title" },
      comments: [1, 2, 3, 4, 5].map(n => ({
        id: n,
        email: `jest${n}@jest.com`,
        body: `body for comment ${n}`
      }))
    });
    // if element doesn't exists, test will break
    getByText("Post Title comments.");
    [(1, 2, 3, 4, 5)].forEach(n => {
      getByTestId(`comment-${n}`);
      getByTestId(`comment-img-${n}`);
      getByTestId(`comment-email-${n}`);
      getByTestId(`comment-body-${n}`);
    });
  });
});
