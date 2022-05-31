import URLS from "../constants/urls";
import { IUser } from "../types/user";

export const signUpUser = async (profile: IUser) => {
  try {
    const res = await fetch(URLS.SIGN_UP_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};
