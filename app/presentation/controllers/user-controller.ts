import { User } from "@app/domain/usecases"
import { HttpRequest, HttpResponse } from '@app/domain/usecases'
import { HttpResult } from "@app/common/helpers/http-result"
import { UserService } from "@app/domain/services"
import BCrypt from "@app/presentation/middlewares/bcrypt"
import { IUserRequestCreate, IUserRequestLogin } from "@app/presentation/usecases"

class UserController implements User {

  createUser = async (http: HttpRequest): Promise<HttpResponse> => {
    const { name, email, password, password_confirmation } = http.req.body as IUserRequestCreate;

    try {
      const passwordHash = await BCrypt.CreatePasswordHash(password, password_confirmation)
      const result = await UserService.save({
        name,
        email,
        password: passwordHash,
        foto: ""
      })

      return HttpResult.ok(result)
    } catch (err) {
      return HttpResult.badRequest(err)
    }
  }

  login = async (http: HttpRequest): Promise<HttpResponse> => {
    const { email, password } = http.req.body as IUserRequestLogin

    // chamar service getUser
    try {
      return HttpResult.ok({ email, password })
    } catch (err) {
      return HttpResult.badRequest(err)
    }
  }

}

export default new UserController()
