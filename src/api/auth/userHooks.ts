import URLS from "../urls";
import { IUser, UserDTO } from "../../types/user";
import { LoginCredentials } from "./types";
import { IAuthData } from "../../types/responseData";
import axios from "axios";
import { ServerError } from "../../types/errors";
import { useMutation } from "@tanstack/react-query";
import { handleAxiosError } from "../../utils/axios";

export const useCreateUser = () =>
  useMutation<IAuthData, ServerError, UserDTO, IAuthData>((data) => axios.post(URLS.SIGN_UP_URL, data), {
    onError: (err) => {
      handleAxiosError(err);
    },
  });

export const signInUser = async (credentials: LoginCredentials): Promise<IUser> => {
  let data;
  return {
    email: "",
    password: "asd",
  };

  // try {
  //   const res = await fetch(URLS.SIGN_IN_URL, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(credentials),
  //   });

  //   data = await res.json();
  //   console.log(data);

  //   return {
  //     statusCode: res.status,
  //     body: data,
  //   } as Response;
  // } catch (error: any) {
  //   console.log(error.message);
  // }
  return data;
};
