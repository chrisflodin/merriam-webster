import { IUser } from "./user";

export interface ServerError {
  message: string;
}

export interface Response {
  statusCode: number;
  body: ServerError | AuthSuccessResponse;
}
export interface AuthSuccessResponse {
  token: string;
  data: IUser;
}
