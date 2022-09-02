import { mountComponentWithDeps } from "../../../utils/tests/mountComponentWithDeps";
import { IAuthData } from "../../../types/responseData";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios, { AxiosResponse } from "axios";
import SignIn from "../SignIn";
import { SignUpConfig } from "../config";

const mockEmail = "firstname.lastname@gmail.com",
  mockPassword = "1234",
  mockId = "123456789",
  //   mockId = new mongoose.Types.ObjectId(),
  mockToken = "123456789";

function mockAxiosResponse(): Promise<AxiosResponse<IAuthData>> {
  const response = {
    status: 200,
    config: {},
    headers: {},
    statusText: "Mock",
    data: {
      user: {
        email: mockEmail,
        _id: mockId,
      },
      token: mockToken,
    },
  } as AxiosResponse<IAuthData>;
  return Promise.resolve(response);
}

describe("Sign Up form", () => {
  const mock = jest.spyOn(axios, "post").mockReturnValue(mockAxiosResponse());

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
