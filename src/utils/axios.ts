import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ServerError } from "../types/errors";
import { IAuthData, IServerError } from "../types/responseData";

type AxiosMethod = <T = any, R = AxiosResponse<T>, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>
) => Promise<R>;

export const transformAxiosError = (axiosErr: AxiosError<IServerError> | null): ServerError | null => {
  if (axiosErr && axiosErr.response?.data) return new ServerError().buildError(axiosErr.response.data);
  return null;
};

export const handleAxiosError = (e: any): ServerError => {
  if (axios.isAxiosError(e) && e.response?.data) {
    const err = e.response?.data as IServerError;
    return new ServerError().buildError(err);
  }
  return new ServerError();
};

export const generateAxiosMethod = async <T>(axiosMethod: AxiosMethod, url: string, payload: any): Promise<T> => {
  try {
    const response = axiosMethod<T>(url, payload);
    return (await response).data;
  } catch (err) {
    if (err instanceof AxiosError) return Promise.reject(new ServerError().fromAxios(err));
    return Promise.reject(new ServerError());
  }
};
