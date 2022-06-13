import URLS from "../urls";
import { IUser } from "../../types/user";
import { LoginCredentials } from "./types";
import { Response } from "../../types/response-data";

export const signUpUser = async (profile: IUser): Promise<Response> => {
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

    return {
      statusCode: res.status,
      body: data,
    } as Response;
  } catch (error: any) {
    console.log(error.message);
  }

  return data;
};

export const signInUser = async (credentials: LoginCredentials): Promise<Response> => {
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

    return {
      statusCode: res.status,
      body: data,
    } as Response;
  } catch (error: any) {
    console.log(error.message);
  }
  return data;
};
