import { ServerError } from "./error";
import { IUser } from "./user";

export interface AuthSuccessResponse {
  token: string;
  data: IUser;
}

export interface Response {
  statusCode: number;
  body: ServerError | AuthSuccessResponse;
}
