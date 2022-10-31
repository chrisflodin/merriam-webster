export const BASE_URL = "http://localhost:5001";

const URLS = {
  BASE_URL,
  SIGN_UP_URL: BASE_URL + "/user/new",
  SIGN_IN_URL: BASE_URL + "/user/login",
  FETCH_WORD: BASE_URL + "/fetch-data/?search=",
};

export default URLS;
