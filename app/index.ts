import server from "@app/data/infrastructure/config/server";

try {
  server.StartApp().listen(process.env.PORT || 3000);
  console.log(`[+] Server started on http://localhost:${process.env.PORT || 3000}`);
} catch (error) {
  console.log("[-] Server Error");
}
