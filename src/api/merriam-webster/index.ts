import URLS from "../urls";
import { MerriamWord } from "./types";

export const fetchWord = async (searchTerm: string, token: string): Promise<MerriamWord> => {
  let data;
  try {
    const res = await fetch(`${URLS.FETCH_WORD}/?search=${searchTerm}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    data = await res.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
  return data;
};
