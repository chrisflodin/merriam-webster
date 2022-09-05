import { mountComponentWithDeps } from "../../../utils/tests/mountComponentWithDeps";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignIn from "../SignIn";
import { SignUpConfig } from "../config";
import * as axiosUtils from "../../../utils/axiosUtils";

const mockEmail = "firstname.lastname@gmail.com",
  mockPassword = "1234";

describe("Sign Up form", () => {
  const mock = jest.spyOn(axiosUtils, "handleAxiosMethod");

  // Arrange
  beforeEach(() => {
    mountComponentWithDeps(<SignIn config={SignUpConfig}></SignIn>);
  });

  it("fills out the form and submits", async () => {
    // Arrange
    const emailField = screen.getByPlaceholderText(/john.doe@gmail.com/);
    const passwordField = screen.getByPlaceholderText(/password/);
    const btn = screen.getByRole("button");

    // Act
    userEvent.type(emailField, mockEmail);
    userEvent.type(passwordField, mockPassword);
    userEvent.click(btn);

    // Assert
    await waitFor(() => {
      expect(emailField).toHaveValue("");
      expect(passwordField).toHaveValue("");
    });
    expect(mock).toHaveBeenCalled();
  });
});
