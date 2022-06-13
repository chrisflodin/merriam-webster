import { HttpStatusCode } from "./http-status-codes";

export class BaseError extends Error {
  constructor(public message: string, public statusCode: number, errorName: string = "Error") {
    super(message);
    this.name = errorName;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  getError = () => {
    return {
      message: `${this.name}: ${this.message}`,
      statusCode: this.statusCode,
    };
  };
}

export class Api404Error extends BaseError {
  constructor(message = "Not found.") {
    super(message, HttpStatusCode.NOT_FOUND, "NotFoundError");
  }
}

export class Api400Error extends BaseError {
  constructor(message = "Bad request.") {
    super(message, HttpStatusCode.INTERNAL_SERVER, "ValidationError");
  }
}
