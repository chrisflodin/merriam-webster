import { UserDTO } from "../../types/user";
import { IAuthData } from "../../types/responseData";
import { AxiosRequestConfig } from "axios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { handleAxiosMethod } from "../../utils/axiosUtils";
import { ServerError } from "../../types/errors";

export const useAuth = (apiUri: string): UseMutationResult<IAuthData, ServerError, UserDTO, any> =>
  useMutation<IAuthData, ServerError, UserDTO>(async (userDto) => {
    const authRequest: AxiosRequestConfig = {
      method: "post",
      url: apiUri,
      data: userDto,
    };

    return handleAxiosMethod<IAuthData>(authRequest);
  });
