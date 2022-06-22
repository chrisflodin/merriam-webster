import { BaseError } from "../../types/errors";

export const errIsOperational = (err: any | BaseError): err is BaseError => {
  return err && err.isOperational;
};

export const isError = (err: any): err is Error => err instanceof Error;
