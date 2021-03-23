import { RouterAdapter } from "@app/common/adapters";
import { CategoryController } from "@app/presentation/controllers";
import { JwT } from "@app/presentation/middlewares";

class CategoryRouter {
  constructor(router: any) {
    return router.get(
      "/categoria",
      JwT.checkToken,
      RouterAdapter.adapt(CategoryController.getCategory)
    );
  }
}

export default CategoryRouter;
