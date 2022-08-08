import fetch from "node-fetch";

const BASE_URL = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/`;

export const fetchWord = async (search: string) => {
  try {
    const response = await fetch(`${BASE_URL}${search}?key=${process.env.API_KEY}`);
    return response.json();
  } catch (e) {
    if (e instanceof Error) throw e;
  }
};
