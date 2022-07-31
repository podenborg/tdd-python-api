/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render, cleanup } from "@testing-library/react";

import { UsersList } from "../UsersList";

afterEach(cleanup);

const users = [
  {
    id: 1,
    username: "michael",
    email: "hermanmu@gmail.com",
  },
  {
    id: 2,
    username: "michaelherman",
    email: "michael@mherman.org",
  },
];

const props = {
  users: users,
  removeUser: () => true,
  isAuthenticated: () => false,
};

it("renders a username", () => {
  const { getByText } = render(
    <UsersList {...props} isAuthenticated={() => true} />
  );
  expect(getByText("michael")).toHaveClass("username");
  expect(getByText("michaelherman")).toHaveClass("username");
});

it("renders", () => {
  const { asFragment } = render(<UsersList {...props} />);
  expect(asFragment()).toMatchSnapshot();
});

it("renders when authenticated", () => {
  const { asFragment } = render(
    <UsersList {...props} isAuthenticated={() => true} />
  );
  expect(asFragment()).toMatchSnapshot();
});
