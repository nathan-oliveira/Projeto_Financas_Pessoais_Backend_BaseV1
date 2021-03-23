import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { HttpResult } from "@app/common/helpers/http-result";
import { IJwT, IJwTPayload } from "@app/presentation/usecases";

export class JwT {
  static async createToken(dataForm: IJwT): Promise<object> {
    const { id, name, email, nivel, foto } = dataForm;

    const token = await jwt.sign({ id }, process.env.APP_SECRET || "secret", {
      expiresIn: "1d",
    });

    return { name, email, nivel, foto, token };
  }

  static async checkToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    try {
      if (!authHeader) throw new Error("Token indefinido!");

      const [, token] = authHeader.split(" ");
      const payload = (await jwt.verify(token, process.env.APP_SECRET || "secret")) as IJwTPayload;

      (<any>req).userId = payload.id;
      next();
    } catch (err) {
      const payload = HttpResult.unauthorizedError(err);
      res.status(payload.statusCode).json(payload.body);
    }
  }
}
