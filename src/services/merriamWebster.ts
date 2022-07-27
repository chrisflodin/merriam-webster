import fetch from "node-fetch";
import { promiseHandler } from "../utils/promise-handler";

const BASE_URL = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/`;

export const fetchWord = async (search: string) => {
  const response = await fetch(`${BASE_URL}${search}?key=${process.env.API_KEY}`);
  const data = response.json();
  return promiseHandler(data);
};
