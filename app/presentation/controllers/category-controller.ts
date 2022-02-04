import { HttpRequest, HttpResponse, Category } from "@app/domain/usecases";
import { HttpResult } from "@app/common/helpers/http-result";

class CategoryController implements Category {
  getCategory = async (http: HttpRequest): Promise<HttpResponse> => {
    return HttpResult.ok({ result: "Sim" });
  };
}

export default new CategoryController();
