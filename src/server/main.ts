import {
  createServer,
  IncomingMessage,
  ServerResponse
} from "http";

const port = process.env.PORT || 3000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const path = req.url!.replace(/\/?(?:\?.*)?$/, "").toLowerCase();

  switch (path) {
    case "":
      res.writeHead(200, { "Content-Type": "text.plain" });
      res.end("Homepage");
      break;
    case "/about":
      res.writeHead(200, { "Content-Type": "text.plain" });
      res.end("About");
      break;
    default:
      res.writeHead(404, { "Content-Type": "text.plain" });
      res.end("Not Found");
      break;
  }
});

server.listen(port, () => {
  console.log(`Server started on port ${port}.`);
  console.log("press Ctrl-C to terminate....");
});
