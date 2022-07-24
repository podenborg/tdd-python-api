/* eslint-disable testing-library/prefer-screen-queries */
import { cleanup, render } from "@testing-library/react";

import { About } from "../About";

afterEach(cleanup);

it("renders properly", () => {
  const { getByText } = render(<About />);
  expect(getByText("Add something relevant here.")).toHaveClass("content");
});

it("renders", () => {
  const { asFragment } = render(<About />);
  expect(asFragment()).toMatchSnapshot();
});
