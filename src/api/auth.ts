import URLS from "../constants/urls";
import { IUser } from "../types/user";
import { LoginCredentials } from "./types";

export const signUpUser = async (profile: IUser): Promise<{ data: IUser; token: string }> => {
  let data;
  try {
    const res = await fetch(URLS.SIGN_UP_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });
    data = await res.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
  return data;
};

export const signInUser = async (credentials: LoginCredentials): Promise<{ data: IUser; token: string }> => {
  let data;
  try {
    const res = await fetch(URLS.SIGN_IN_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    JSON.stringify(credentials);
    data = await res.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
  return data;
};
