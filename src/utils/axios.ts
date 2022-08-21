import axios from "axios";
import { ServerError } from "../types/errors";
import { IServerError } from "../types/responseData";

export const handleAxiosError = (e: any): ServerError => {
  if (axios.isAxiosError(e) && e.response?.data) {
    const err = e.response?.data as IServerError;
    return new ServerError().buildError(err);
  }
  return new ServerError();
};
