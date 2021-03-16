import { RouterAdapter } from "@app/common/adapters";
import { UserController } from "@app/presentation/controllers";
import JwT from "@app/presentation/middlewares/jsonwebtoken";

class UserRouter {
  public router: any;

  constructor(routes: any) {
    this.router = routes;
  }

  createRoute = () => {
    return this.router
      .post("/users", RouterAdapter.adapt(UserController.createUser))
      .post("/session", RouterAdapter.adapt(UserController.login))
      .get("/profile", JwT.checkToken, RouterAdapter.adapt(UserController.profile))
      .put("/users", JwT.checkToken, RouterAdapter.adapt(UserController.update));
  };
}

export default UserRouter;
