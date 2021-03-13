import * as jwt from "jsonwebtoken"
import { HttpRequest } from '@app/domain/usecases'
import { IJwT, IJwTPayload } from "@app/presentation/usecases"

class JsonWebToken {
  static async createToken(dataForm: IJwT): Promise<object> {
    const { id, name, email, nivel, foto } = dataForm

    const token = await jwt.sign({ id }, process.env.APP_SECRET || 'secret', {
      expiresIn: "1d"
    })

    return { name, email, nivel, foto, token }
  }

  static async checkToken(http: HttpRequest) {
    const authHeader = http.req.headers.authorization;

    if (!authHeader) throw new Error('Token indefinido!')

    const [, token] = authHeader.split(" ")

    try {
      const payload = (await jwt.verify(token, process.env.APP_SECRET || 'secret')) as IJwTPayload;
      (<any>http.req).userId = payload.id
    } catch (err) {
      return err;
    }
  }
}

export default JsonWebToken
