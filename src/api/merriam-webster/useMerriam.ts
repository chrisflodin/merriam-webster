import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { ServerError } from "../../types/errors";
import { handleAxiosMethod } from "../../utils/axiosUtils";
import URLS from "../urls";
import { MerriamWord } from "./types";

interface Params {
  filter: string;
  authToken: string;
}

type MerriamQueryKey = [string, Params];

export const useMerriam = (params: Params): UseQueryResult<MerriamWord, ServerError> =>
  useQuery<MerriamWord, ServerError, MerriamWord, MerriamQueryKey>(["merriamWord", params], ({ queryKey }) => {
    const { filter, authToken } = queryKey[1];

    const axiosConfig: AxiosRequestConfig = {
      method: "get",
      url: `${URLS.FETCH_WORD}${filter}`,
      headers: { Authorization: authToken || "" },
    };

    return handleAxiosMethod<MerriamWord>(axiosConfig);
  });
