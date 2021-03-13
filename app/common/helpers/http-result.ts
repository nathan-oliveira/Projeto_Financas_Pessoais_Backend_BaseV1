import { HttpStatusCode } from "@app/common/errors/http-status-code"

export class HttpResult {

  static ok (body: any) {
    return {
      statusCode: HttpStatusCode.ok,
      body
    }
  }

  static badRequest (error: any) {
    return {
      statusCode: HttpStatusCode.badRequest,
      body: {
        error: error.message
      }
    }
  }

  static unauthorizedError (error: any) {
    return {
      statusCode: HttpStatusCode.unauthorized,
      body: {
        error: error.message
      }
    }
  }

  static serverError (error: any) {
    return {
      statusCode: HttpStatusCode.serverError,
      body: {
        error: error.message
      }
    }
  }

  static badGatewat (error: any) {
    return {
      statusCode: HttpStatusCode.badGatewat,
      body: {
        error: error.message
      }
    }
  }

  static forbidden (error: any) {
    return {
      statusCode: HttpStatusCode.forbidden,
      body: {
        error: error.message
      }
    }
  }

  static notFound (error: any) {
    return {
      statusCode: HttpStatusCode.notFound,
      body: {
        error: error.message
      }
    }
  }

}
