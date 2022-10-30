import { deserializeMerriamData } from "../utils/merriamWebster";
import { API_KEY } from "../consts";
import { Api500Error } from "../types/errors";
import axios from "axios";
import { MerriamWord } from "../types/merriamWebster";

const BASE_URL = `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/`;

export const fetchWord = async (search: string): Promise<MerriamWord> => {
  const { data, status } = await axios.get(`${BASE_URL}${search}?key=${API_KEY}`);
  if (status !== 200) throw new Api500Error("Error when fetching data from Merriam Webster");
  return deserializeMerriamData(data);
};
