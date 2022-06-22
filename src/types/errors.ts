import { HttpStatusCode } from "./http-status-codes";

export class BaseError extends Error {
  constructor(
    public isOperational: boolean = false,
    public message: string,
    public statusCode: number,
    public log: any
  ) {
    super(message);
    this.name = this.constructor.name;
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

export class Api400Error extends BaseError {
  constructor(isOperational?: boolean, message = "Bad request.", log?: any) {
    super(isOperational, message, HttpStatusCode.BAD_REQUEST, log);
  }
}

export class Api401Error extends BaseError {
  constructor(isOperational?: boolean, message = "Unauthorized.", log?: any) {
    super(isOperational, message, HttpStatusCode.UNAUTHORIZED, log);
  }
}

export class Api404Error extends BaseError {
  constructor(isOperational?: boolean, message = "Not found.", log?: any) {
    super(isOperational, message, HttpStatusCode.NOT_FOUND, log);
  }
}

export class Api500Error extends BaseError {
  constructor(isOperational?: boolean, message = "Internal server error.", log?: any) {
    super(isOperational, message, HttpStatusCode.INTERNAL_SERVER, log);
  }
}
