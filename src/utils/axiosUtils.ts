import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { resolve } from "path";
import { ServerError } from "../types/errors";

// Temporarily to experiment with react suspense
export const handleAxiosMethod = async <D>(axiosConfig: AxiosRequestConfig<D>): Promise<D> => {
  try {
    return (await axios(axiosConfig)).data;
  } catch (err) {
    if (err instanceof AxiosError) throw new ServerError().fromAxios(err);
    throw new ServerError();
  }
};
