import { UserDTO } from "../../types/user";
import { IAuthData } from "../../types/responseData";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { generateAxiosMethod } from "../../utils/axios";
import { ServerError } from "../../types/errors";

export const useAuthMutation = (apiUri: string) =>
  useMutation<IAuthData, ServerError, UserDTO, IAuthData>(async (userDto) =>
    generateAxiosMethod(axios.post, apiUri, userDto)
  );
