import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { Post } from "./index";

const defaultProps = {
  loading: false,
  data: [],
  error: "",
  getPost: jest.fn()
};

const setup = (props = defaultProps) =>
  render(
    <MemoryRouter>
      <Post {...props} />
    </MemoryRouter>
  );

describe("Post Component", () => {
  it("Render Loading", () => {
    const { getByText } = setup({ ...defaultProps, loading: true });
    expect(getByText("Loading . . .")).toBeInTheDocument();
  });
  it("Render Error", () => {
    const { getByText } = setup({
      ...defaultProps,
      error: "Test Error by Text"
    });
    expect(
      getByText("There is an error: Test Error by Text")
    ).toBeInTheDocument();
  });
  it("Render Items", () => {
    const { getByTestId } = setup({
      ...defaultProps,
      data: [{ id: 1, title: "Title For Card" }]
    });
    // if element doesn't exists, test will break
    getByTestId("card-1");
    getByTestId("link-1");
  });
});
