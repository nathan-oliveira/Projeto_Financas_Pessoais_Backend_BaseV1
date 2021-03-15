import "reflect-metadata";
import "./env";
import "express-async-errors";

import express from "express";
import * as bp from "body-parser";
import cors from "cors";
import morgan from "morgan";

import App from "./app";
import errorHandler from "@app/common/errors/error-handler";
import routes from "@app/presentation/routes";

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

  private middleware(): void {
    this.server.Connection();
    this.server.ChangeMiddleware(cors());
    this.server.ChangeMiddleware(morgan("combined"));
    this.server.ChangeMiddleware(bp.urlencoded({ extended: true }));
    this.server.ChangeMiddleware(bp.json({ limit: "20mb" }));
    this.server.ChangeMiddleware(routes.index());
    this.server.ChangeMiddleware(errorHandler.handler);
  }
}

export default new Server().server;
