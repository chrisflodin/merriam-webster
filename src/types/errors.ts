import { StatusCodes } from "http-status-codes";

export class BaseError extends Error {
  constructor(
    public message: string,
    public isOperational: boolean = true,
    public log: any,
    public statusCode: number
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
  constructor(message?: string, isOperational?: boolean, log?: any) {
    super(message || "Bad request.", isOperational, log, StatusCodes.BAD_REQUEST);
  }
}

export class Api401Error extends BaseError {
  constructor(message?: string, isOperational?: boolean, log?: any) {
    super(message || "Unauthorized.", isOperational, log, StatusCodes.UNAUTHORIZED);
  }
}

export class Api404Error extends BaseError {
  constructor(message?: string, isOperational?: boolean, log?: any) {
    super(message || "Not found.", isOperational, log, StatusCodes.NOT_FOUND);
  }
}

export class Api500Error extends BaseError {
  constructor(message?: string, isOperational?: boolean, log?: any) {
    super(message || "Internal server error.", isOperational, log, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
