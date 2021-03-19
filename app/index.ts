import server from "@app/data/infrastructure/config/server";

function init() {
  server.StartApp().listen(process.env.PORT || 3000);
  console.log(`[+] Server started on http://localhost:${process.env.PORT || 3000}`);
}

init();
