import { API_KEY } from "../../fake-env";
import { RequestInfo, RequestInit } from "node-fetch";

const fetch = (url: RequestInfo, init?: RequestInit) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url, init));

const BASE_URL = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/`;

export const fetchWord = async (search: string) => {
  const response = await fetch(`${BASE_URL}${search}?key=${API_KEY}`);
  const data = response.json();
  return data;
};
