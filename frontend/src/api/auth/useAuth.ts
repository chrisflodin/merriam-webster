import { useEffect } from "react";
import { handleAxiosMethod } from "../../utils/axiosUtils";
import { UserDTO } from "../../types/user";
import { IAuthData } from "../../types/responseData";
import { AxiosRequestConfig } from "axios";
import { MutateOptions, useMutation } from "@tanstack/react-query";
import { ServerError } from "../../types/errors";
import { useHistory, useLocation } from "react-router-dom";
import { routing } from "../../config/routing";
import URLS from "../urls";
import Cookies from "js-cookie";

export interface Auth {
  signIn: (userData: UserDTO, cb: Function) => Promise<IAuthData>;
  signUp: (userData: UserDTO, cb: Function) => Promise<IAuthData>;
  signOut: () => void;
  error: ServerError | null;
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
}

interface Variables {
  userDTO: UserDTO;
  cb: Function;
  apiUrl?: string;
}

export const useAuth = (): Auth => {
  const history = useHistory();
  const location = useLocation();
  const { reset, mutateAsync, error, isLoading } = useMutation<IAuthData, ServerError, Variables>(
    async ({ userDTO, apiUrl }) => {
      const authRequest: AxiosRequestConfig = {
        method: "post",
        url: apiUrl,
        data: userDTO,
      };

      return handleAxiosMethod<IAuthData>(authRequest);
    }
  );

  useEffect(() => {
    reset();
  }, [location]);

  const mutationOptions: MutateOptions<IAuthData, ServerError, Variables> = {
    onSuccess: (authData, { cb }) => {
      history.replace("/");
      Cookies.set("Authorization", authData.token);
      if (cb) cb();
    },
  };

  return {
    signIn: async (userDTO: UserDTO, cb: Function) => {
      return mutateAsync({ userDTO, cb, apiUrl: URLS.SIGN_IN_URL }, mutationOptions);
    },
    signUp: (userDTO: UserDTO, cb: Function) => {
      return mutateAsync({ userDTO, cb, apiUrl: URLS.SIGN_UP_URL }, mutationOptions);
    },
    signOut: () => {
      Cookies.remove("Authorization");
      history.push(routing.SIGN_IN);
    },
    error: error,
    isAuthenticated: Cookies.get("Authorization") && Cookies.get("Authorization")!.length > 0 ? true : false,
    token: Cookies.get("Authorization") || null,
    isLoading,
  };
};
