import { BaseError } from "./base-error";
import { HttpStatusCode } from "./http-status-code";
import { HttpRequest } from "@app/domain/usecases";

class ErrorHandler {
  handler = (err: Error, http: HttpRequest) => {
    if (err instanceof BaseError) {
      http.res.status(err.httpStatusCode).json(err.message);
    } else {
      http.req.res?.status(HttpStatusCode.serverError).json({ error: "Internal server error!" });
    }
  };
}

export default new ErrorHandler();
