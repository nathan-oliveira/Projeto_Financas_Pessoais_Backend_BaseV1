import { HttpStatusCode } from "./http-status-code";

export abstract class BaseError extends Error {
  public readonly name: string;
  public readonly httpStatusCode: HttpStatusCode;

  constructor(name: string, httpStatusCode: HttpStatusCode, message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpStatusCode = httpStatusCode;

    Error.captureStackTrace(this);
  }
}
