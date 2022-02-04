import { HttpRequest, HttpResponse } from ".";

export interface Category {
  getCategory(http: HttpRequest): Promise<HttpResponse>
}
