import SignUp from "../signUp";
import { mountComponentWithDeps } from "../../../../utils/tests/mountComponentWithDeps";
import * as userHooks from "../../../../api/auth/userHooks";
import { ServerError } from "../../../../types/errors";
import { IAuthData } from "../../../../types/responseData";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserDTO } from "../../../../types/user";
import { handleAxiosError } from "../../../../utils/axios";
import axios, { AxiosResponse } from "axios";

const mockEmail = "firstname.lastname@gmail.com",
  mockPassword = "1234",
  mockId = "123456789",
  //   mockId = new mongoose.Types.ObjectId(),
  mockToken = "123456789";

function axiosResponse(): Promise<AxiosResponse<IAuthData>> {
  const response = {
    status: 200,
    config: {},
    headers: {},
    statusText: "Mock",
    data: {
      data: {
        email: mockEmail,
        _id: mockId,
      },
      token: mockToken,
    },
  } as AxiosResponse<IAuthData>;
  return Promise.resolve(response);
}

describe("Sign Up form", () => {
  const mock = jest.spyOn(axios, "post").mockReturnValue(axiosResponse());

  // Arrange
  beforeEach(() => {
    mountComponentWithDeps(<SignUp></SignUp>);
  });

  it("fills out the form and submits", async () => {
    // Act
    userEvent.type(screen.getByPlaceholderText(/john.doe@gmail.com/), mockEmail);
    userEvent.type(screen.getByPlaceholderText(/password/), mockPassword);
    userEvent.click(screen.getByRole("button"));

    // Assert
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/john.doe@gmail.com/)).toHaveValue("");
      expect(screen.getByPlaceholderText(/password/)).toHaveValue("");
    });
    expect(mock).toHaveBeenCalled();
  });
});
function useMutation<T, U, V, W>(arg0: (data: any) => any, arg1: { onError: (err: any) => void }) {
  throw new Error("Function not implemented.");
}
