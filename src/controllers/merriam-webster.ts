import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as merriamService from "../services/merriamService";
import { deserializeMerriamData } from "../utils/merriamWebster";

export const getData: RequestHandler = async (request, response, next) => {
  // Type this
  const { query } = request;
  if (typeof query.search !== "string") return;

  const [err, data] = await merriamService.fetchWord(query.search);
  if (err) return next(err);

  response.status(StatusCodes.OK).json(deserializeMerriamData(data));
};
