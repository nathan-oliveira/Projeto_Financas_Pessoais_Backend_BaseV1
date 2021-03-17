import "reflect-metadata";
import "./env";
import "express-async-errors";

import bp from "body-parser";
import compression from "compression";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import App from "./app";
import errorHandler from "@app/common/errors/error-handler";
import routes from "@app/presentation/routes";

import fs from "fs";
import path from "path";

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

  public routerAdapter() {
    fs.readdir("./app/presentation/routes", async (err, paths) => {
      for (let filePath of paths) {
        if (filePath !== "index.ts") {
          const route = await import(path.resolve("./app/presentation/routes/" + filePath));
          const controller = await new route.default();
          const routerBind = await controller.createRoute();
          this.routes.use("/", routerBind);
        }
      }
    });
  }

  private middleware(): void {
    this.server.Connection();
    this.server.ChangeMiddleware(cors());
    this.server.ChangeMiddleware(morgan("combined"));
    this.server.ChangeMiddleware(bp.urlencoded({ extended: true }));
    this.server.ChangeMiddleware(bp.json({ limit: "20mb" }));
    this.server.ChangeMiddleware(compression());

    this.routerAdapter();
    this.server.ChangeMiddleware(this.routes);

    this.server.ChangeMiddleware(errorHandler.handler);
  }
}

export default new Server().server;
