import { NextFunction, Response } from "express";
import { UserRequest } from "../../../types/user";
import { fetchWord } from "./merriam-webster";
import { normalizeData } from "./utils";
import { promiseHandler } from "../../../utils/promise-handler";

export const getData = async ({ query }: UserRequest, res: Response, next: NextFunction) => {
  // Type this
  const [err, data] = await promiseHandler(fetchWord(query.search));
  if (err) return next(err);
  res.status(200).send(normalizeData(data));
};
