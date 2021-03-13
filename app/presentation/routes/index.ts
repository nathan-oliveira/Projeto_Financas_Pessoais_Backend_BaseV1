import { Router } from "express"
import UserRoutes from './user-router'

class Routes {
  public routes: Router
  public userRouter: UserRoutes

  constructor() {
    this.routes = Router()
    this.userRouter = new UserRoutes(this.routes)
  }

  index = () => {
    return this.routes
      .use("/api", this.userRouter.createRoute())
  }
}

export default new Routes()
