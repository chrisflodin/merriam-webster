import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ServerError } from "../../types/errors";
import { handleAxiosMethod } from "../../utils/axiosUtils";
import URLS from "../urls";
import { MerriamWord } from "./types";

interface Params {
  filter: string;
  authToken: string;
}

type MerriamQueryKey = [string, Params];

export const useMerriam = (params: Params) =>
  useQuery<QueryFunctionContext<MerriamQueryKey>, ServerError, MerriamWord, MerriamQueryKey>(
    ["merriamWord", params],
    ({ queryKey }) => {
      const { filter, authToken } = queryKey[1];

      return handleAxiosMethod(
        axios.get.bind(null, `${URLS.FETCH_WORD}${filter}`, { headers: { Authorization: authToken || "" } })
      );
    }
  );
