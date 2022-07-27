import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { fetchWord } from "../services/merriamWebster";
import { normalizeMerriamData } from "../utils/merriamWebster";
import { promiseHandler } from "../utils/promise-handler";

export const getData: RequestHandler = async (request, response, next) => {
  // Type this
  const { query } = request;
  if (typeof query.search !== "string") return;

  const [err, data] = await fetchWord(query.search);
  if (err) return next(err);

  response.status(StatusCodes.OK).send(normalizeMerriamData(data));
};
