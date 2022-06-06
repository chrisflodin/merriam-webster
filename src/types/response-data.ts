import { ServerError } from "./error";
import { IUser } from "./user";

export interface AuthSuccessResponse {
  token: string;
  data: IUser;
}

export interface ResponseData {
  statusCode: number;
  body: ServerError | AuthSuccessResponse;
}
