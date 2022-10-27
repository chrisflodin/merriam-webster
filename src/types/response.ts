import { MongooseUser } from "./user";

export interface ServerError {
  type: string;
  error: string;
  statusCode: number;
}

export interface Response {
  statusCode: number;
  body: ServerError | AuthSuccessResponse;
}
export interface AuthSuccessResponse {
  token: string;
  user: MongooseUser;
}
