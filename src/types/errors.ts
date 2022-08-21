import { IServerError } from "./responseData";

export class ServerError extends Error {
  constructor(public message: string = "Server Error", public statusCode?: number, public type?: string | null) {
    super(message);
    this.message = message || "Server Error";
    this.type = type || null;
    this.statusCode = statusCode || 500;
  }

  buildError = (err: IServerError) => {
    const { error, type, statusCode } = err;
    this.message = error;
    this.type = type;
    this.statusCode = statusCode;
    return this;
  };

  getError = () => {
    return {
      type: this.type,
      error: this.message,
      statusCode: this.statusCode,
    };
  };
}
