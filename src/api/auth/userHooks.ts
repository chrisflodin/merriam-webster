import URLS from "../urls";
import { UserDTO } from "../../types/user";
import { IAuthData, IServerError } from "../../types/responseData";
import axios, { AxiosError } from "axios";
import { ServerError } from "../../types/errors";
import { useMutation } from "@tanstack/react-query";
import { handleAxiosError } from "../../utils/axios";

export const useCreateUser = () =>
  useMutation<IAuthData, AxiosError<IServerError>, UserDTO, IAuthData>(
    (userDto) => axios.post(URLS.SIGN_UP_URL, userDto),
    {
      onError: (err) => {
        handleAxiosError(err);
      },
    }
  );

export const useSignIn = () =>
  useMutation<IAuthData, AxiosError<IServerError>, UserDTO, IAuthData>(
    (userDto) => axios.post(URLS.SIGN_IN_URL, userDto),
    {
      onError: (err) => {
        handleAxiosError(err);
      },
    }
  );
