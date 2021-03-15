import { HttpRequest, HttpResponse } from ".";

export interface User {
  createUser(http: HttpRequest): Promise<HttpResponse>;
}

export type IUserId = { userId: number };
