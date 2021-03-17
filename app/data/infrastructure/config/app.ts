import { Application } from "express";
import Connection from "@app/data/infrastructure/database";

class App {
  constructor(private http: Application) {}

  ChangeMiddleware(middleware: any): void {
    this.http.use(middleware);
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
