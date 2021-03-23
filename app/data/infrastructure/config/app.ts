import { Application } from "express";
import Connection from "@app/data/infrastructure/database";

import fs from "fs";
import path from "path";

class App {
  constructor(private http: Application) {}

  ChangeMiddleware(middleware: any): void {
    this.http.use(middleware);
  }

  ChangeRouterLoaderAdapter(router: any) {
    const pathRouter = `./${
      process.env.PRODUCTION === "true" ? "dist" : "app"
    }/presentation/routes/`;

    fs.readdir(pathRouter, async (err, paths) => {
      for (let filePath of paths) {
        const route = await import(path.resolve(pathRouter + filePath));
        const createRoute = await new route.default(router);
        router.use("/api", createRoute);
      }
    });
  }

  Connection(): void {
    Connection.then(async (resp) => {
      console.log("[+] Banco ON");
      return await Connection;
    }).catch(async (err) => {
      return console.log("[-] Banco OFF");
    });
  }

  StartApp(): Application {
    this.http.disable("x-powered-by");
    return this.http;
  }
}

export default App;
