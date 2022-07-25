/* eslint-disable testing-library/prefer-screen-queries */
import { cleanup } from "@testing-library/react";
import { renderWithRouter } from "../../testUtils";
import { RegisterForm } from "../RegisterForm";

afterEach(cleanup);

const props = {
  isAuthenticated: () => false,
  handleRegisterFormSubmit: () => true,
};

it("renders properly", () => {
  const { getByText } = renderWithRouter(<RegisterForm {...props} />);
  expect(getByText("Register")).toHaveClass("title");
});

it("renders with default props", () => {
  const { getByLabelText, getByText } = renderWithRouter(
    <RegisterForm {...props} />
  );

  const usernameInput = getByLabelText("Username");
  expect(usernameInput).toHaveAttribute("type", "text");
  expect(usernameInput).not.toHaveValue();

  const emailInput = getByLabelText("Email");
  expect(emailInput).toHaveAttribute("type", "email");
  expect(emailInput).not.toHaveValue();

  const passwordInput = getByLabelText("Password");
  expect(passwordInput).toHaveAttribute("type", "password");
  expect(passwordInput).not.toHaveValue();

  const buttonInput = getByText("Submit");
  expect(buttonInput).toHaveValue("Submit");
});

it("renders", () => {
  const { asFragment } = renderWithRouter(<RegisterForm {...props} />);
  expect(asFragment()).toMatchSnapshot();
});
