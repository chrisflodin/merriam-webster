import { RequestHandler } from "express";
import { fetchWord } from "./merriam-webster";
import { normalizeData } from "./utils";
import { promiseHandler } from "../../../utils/promise-handler";
import { StatusCodes } from "http-status-codes";

export const getData: RequestHandler = async (request, response, next) => {
  // Type this
  const { query } = request;
  if (typeof query.search !== "string") return;
  const [err, data] = await promiseHandler(fetchWord(query.search));
  if (err) return next(err);
  response.status(StatusCodes.OK).send(normalizeData(data));
};
