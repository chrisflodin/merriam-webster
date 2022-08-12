import { RequestHandler } from "express";
import * as merriamService from "../services/merriamService";
import { StatusCodes } from "http-status-codes";

export const getData: RequestHandler = async (request, response) => {
  const { query } = request;
  if (typeof query.search !== "string") return;

  const data = await merriamService.fetchWord(query.search);

  response.status(StatusCodes.OK).json(data);
};
