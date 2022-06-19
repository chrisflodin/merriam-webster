import { HttpStatusCode } from "./http-status-codes";

export class BaseError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  isOperational = () => {
    return this instanceof BaseError;
  };

  getError = () => {
    return {
      message: `${this.name}: ${this.message}`,
      statusCode: this.statusCode,
    };
  };
}

export class Api400Error extends BaseError {
  constructor(message = "Bad request.") {
    super(message, HttpStatusCode.INTERNAL_SERVER);
  }
}
export class Api401Error extends BaseError {
  constructor(message = "Unauthorized.") {
    super(message, HttpStatusCode.UNAUTHORIZED);
  }
}
export class Api404Error extends BaseError {
  constructor(message = "Not found.") {
    super(message, HttpStatusCode.NOT_FOUND);
  }
}

export class Api500Error extends BaseError {
  constructor(message = "Internal server error.") {
    super(message, HttpStatusCode.INTERNAL_SERVER);
  }
}

export const STANDARD_ERROR = {
  BAD_REQUEST: new Api400Error(),
  UNAUTHORIZED: new Api401Error(),
  NOT_FOUND: new Api404Error(),
  INTERNAL_SERVER: new Api500Error(),
};
