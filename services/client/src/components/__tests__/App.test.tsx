import { cleanup } from "@testing-library/react";

import App from "../../App";
import { renderWithRouter } from "../../testUtils";

afterEach(cleanup);

it("renders", () => {
  const { asFragment } = renderWithRouter(<App />);
  expect(asFragment()).toMatchSnapshot();
});
