import { RouterAdapter } from "@app/common/adapters"
import { userController } from "@app/presentation/controllers"
// import JwT from "@app/presentation/middlewares/jsonwebtoken"

class UserRouter {
  public router: any;

  constructor(routes: any) {
    this.router = routes
  }

  createRoute = () => {
    return this.router
      .post("/users", RouterAdapter.adapt(userController.createUser))
      .post("/session", RouterAdapter.adapt(userController.login))
  }
}

export default UserRouter
