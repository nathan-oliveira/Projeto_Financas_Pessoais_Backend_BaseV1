import { Request, Response, NextFunction } from "express"
import { HttpRequest, HttpResponse } from '@app/domain/usecases'

export class RouterAdapter {

  static adapt (router: any) {

    return async (req: Request, res: Response, next: NextFunction) => {
      const httpRequest: HttpRequest = { req, res, next }
      const httpResponse: HttpResponse = await router(httpRequest)

      res.status(httpResponse.statusCode).json(httpResponse.body)
    }

  }

}
