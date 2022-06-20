import { API_KEY } from "../../../fake-env";
import fetch from "node-fetch";

const BASE_URL = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/`;

export const fetchWord = async (search: string) => {
  const response = await fetch(`${BASE_URL}${search}?key=${API_KEY}`);
  const data = response.json();
  return data;
};
