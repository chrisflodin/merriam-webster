import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { ServerError } from "../../types/errors";
import { handleAxiosMethod } from "../../utils/axiosUtils";
import { useAuth } from "../auth/useAuth";
import URLS from "../urls";
import { MerriamWord } from "./types";

interface Params {
  filter: string;
}

type MerriamQueryKey = [string, Params];

export const useMerriam = (params: Params): any => {
  const auth = useAuth();

  return useQuery<MerriamWord, ServerError, MerriamWord, MerriamQueryKey>(["merriamWord", params], ({ queryKey }) => {
    const { filter } = queryKey[1];

    const getMerriamRequest: AxiosRequestConfig = {
      method: "get",
      url: `${URLS.FETCH_WORD}${filter}`,
      headers: { Authorization: auth.token || "" },
    };

    return handleAxiosMethod<MerriamWord>(getMerriamRequest);
  });
};
