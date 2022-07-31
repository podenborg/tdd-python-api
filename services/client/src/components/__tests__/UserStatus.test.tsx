/* eslint-disable testing-library/prefer-screen-queries */
import { render, cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { renderWithRouter } from "../../testUtils";

import { UserStatus } from "../UserStatus";

afterEach(cleanup);

jest.mock("axios");
const axios = require("axios");

const props = {
  isAuthenticated: () => true,
};

it("renders properly when authenticated", async () => {
  axios.mockImplementation(() =>
    Promise.resolve({
      data: { email: "test@test.com", id: 1, username: "test" },
    })
  );

  const { findByTestId } = renderWithRouter(<UserStatus {...props} />);

  await act(async () => {
    expect(axios).toHaveBeenCalledTimes(1);
  });

  expect((await findByTestId("user-email")).innerHTML).toBe("test@test.com");
  expect((await findByTestId("user-username")).innerHTML).toBe("test");
});

it("renders", async () => {
  axios.mockImplementation(() =>
    Promise.resolve({
      data: { email: "test@test.com", id: 1, username: "test" },
    })
  );

  const { asFragment } = render(<UserStatus {...props} />);

  await act(async () => {
    expect(axios).toHaveBeenCalled();
  });

  expect(asFragment()).toMatchSnapshot();
});
