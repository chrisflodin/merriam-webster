import axios from "axios";
import { MerriamDTO } from "../../features/main/types";
import { handleAxiosMethod } from "../../utils/axiosUtils";
import URLS from "../urls";
import { MerriamWord } from "./types";

export const fetchWord = ({ searchTerm, token }: MerriamDTO): Promise<MerriamWord> =>
  handleAxiosMethod(
    axios.get.bind(null, `${URLS.FETCH_WORD}${searchTerm}`, { headers: { Authorization: token || "" } })
  );
