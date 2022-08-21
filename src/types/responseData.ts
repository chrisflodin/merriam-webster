import mongoose, { ObjectId } from "mongoose";

export interface IAuthData {
  token: string;
  data: {
    _id: mongoose.Types.ObjectId | string;
    email: string;
  };
}

export interface IServerError {
  error: string;
  statusCode: number;
  type: string;
}

export interface Response<T> {
  statusCode: number;
  body: IServerError | T;
}
