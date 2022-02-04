import "reflect-metadata";
import "express-async-errors";
import "./env";

import bp from "body-parser";
import compression from "compression";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import App from "./app";
import errorHandler from "@app/common/errors/error-handler";

class Server {
  public http: express.Application;
  public routes: express.Router;
  public server: App;

  constructor() {
    this.http = express();
    this.routes = express.Router();
    this.server = new App(this.http);

    this.middleware();
  }

  private async middleware(): Promise<void> {
    this.server.Connection();
    this.server.ChangeMiddleware(helmet());
    this.server.ChangeMiddleware(cors());
    this.server.ChangeMiddleware(morgan("combined"));
    this.server.ChangeMiddleware(bp.urlencoded({ extended: true }));
    this.server.ChangeMiddleware(bp.json({ limit: "20mb" }));
    this.server.ChangeMiddleware(compression());
    this.server.ChangeRouterLoaderAdapter(this.routes);
    this.server.ChangeMiddleware(this.routes);
    this.server.ChangeMiddleware(errorHandler.handler);
  }
}

export default new Server().server;
