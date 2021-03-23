import { HttpRequest, HttpResponse } from "@app/domain/usecases";
import { HttpResult } from "@app/common/helpers/http-result";

class CategoryController {
  getCategory = async (http: HttpRequest): Promise<HttpResponse> => {
    return HttpResult.ok({ result: "Sim" });
  };
}

export default new CategoryController();
