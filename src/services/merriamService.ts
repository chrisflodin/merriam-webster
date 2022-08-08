import fetch from "node-fetch";
import { RootObject } from "../utils/merriamWebster";

const BASE_URL = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/`;

export const fetchWord = async (search: string): Promise<RootObject | null> => {
  try {
    const response = await fetch(`${BASE_URL}${search}?key=${process.env.API_KEY}`);
    const data: RootObject | null = await response.json();
    return data;
  } catch (e) {
    if (e instanceof Error) throw e;
    return null;
  }
};
