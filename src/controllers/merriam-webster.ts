import { RequestHandler } from "express";
import * as merriamService from "../services/merriamService";
import { Api500Error } from "../types/errors";
import { deserializeMerriamData } from "../utils/merriamWebster";
import { StatusCodes } from "http-status-codes";

export const getData: RequestHandler = async (request, response) => {
  const { query } = request;
  if (typeof query.search !== "string") return;

  const data = await merriamService.fetchWord(query.search);
  if (!data) throw new Api500Error("Error when fetching data from Merriam Webster");

  response.status(StatusCodes.OK).json(deserializeMerriamData(data));
};
