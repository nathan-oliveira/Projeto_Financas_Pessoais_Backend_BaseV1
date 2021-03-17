import { HttpRequest, HttpResponse } from "@app/domain/usecases";
import { HttpResult } from "@app/common/helpers/http-result";
import { User, IUserId } from "@app/domain/usecases";
import { UserService } from "@app/domain/services";
import { BCrypt } from "@app/presentation/middlewares";
import { IUserRequestCreate, IUserRequestLogin } from "@app/presentation/usecases";

class UserController implements User {
  createUser = async (http: HttpRequest): Promise<HttpResponse> => {
    const { name, email, password, password_confirmation } = http.req.body as IUserRequestCreate;

    try {
      const passwordHash = await BCrypt.CreatePasswordHash(password, password_confirmation);
      const result = await UserService.save({ name, email, password: passwordHash, foto: "" });

      return HttpResult.ok(result);
    } catch (err) {
      return HttpResult.badRequest(err);
    }
  };

  login = async (http: HttpRequest): Promise<HttpResponse> => {
    console.log("login");
    const { email, password } = http.req.body as IUserRequestLogin;

    try {
      const user = await UserService.getUserByEmail({ email, password });
      const result = await BCrypt.ComparePasswordHash(password, user[0]);

      return HttpResult.ok(result);
    } catch (err) {
      return HttpResult.badRequest(err);
    }
  };

  profile = async (http: HttpRequest): Promise<HttpResponse> => {
    const { userId } = (http.req as unknown) as IUserId;
    const user = await UserService.getUserById(userId);

    return HttpResult.ok(user);
  };

  update = async (http: HttpRequest): Promise<HttpResponse> => {
    const { userId } = (http.req as unknown) as { userId: number };
    const { password, password_confirmation } = http.req.body;

    if (password) {
      http.req.body.password = await BCrypt.CreatePasswordHash(password, password_confirmation);
    }

    try {
      const result = await UserService.updateUser(userId, http.req.body);
      return HttpResult.ok(result);
    } catch (err) {
      return HttpResult.badRequest(err);
    }
  };
}

export default new UserController();
