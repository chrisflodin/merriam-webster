import { BaseError } from "../../types/errors";

export const errIsOperational = (err: Error) => err instanceof BaseError;
