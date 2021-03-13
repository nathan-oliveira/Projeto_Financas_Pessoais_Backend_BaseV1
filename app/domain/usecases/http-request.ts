import { Request, Response, NextFunction } from "express"

export type HttpRequest = {
  req: Request,
  res: Response,
  next: NextFunction
}
