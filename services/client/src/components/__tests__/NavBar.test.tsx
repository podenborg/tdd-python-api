/* eslint-disable testing-library/prefer-screen-queries */
import { cleanup } from "@testing-library/react";

import { NavBar } from "../NavBar";
import { renderWithRouter } from "../../testUtils";

afterEach(cleanup);

const props = {
  title: "Hello, World!",
  logoutUser: () => true,
};

it("renders a title", () => {
  const { getByText } = renderWithRouter(<NavBar {...props} />);
  expect(getByText(props.title)).toHaveClass("nav-title");
});

it("renders", () => {
  const { asFragment } = renderWithRouter(<NavBar {...props} />);
  expect(asFragment()).toMatchSnapshot();
});
