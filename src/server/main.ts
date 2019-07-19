import {
  createServer,
  IncomingMessage,
  ServerResponse
} from "http";

const port = process.env.PORT || 3000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { "Content-Type": "text.plain" });
  res.end("Hello World!");
});

server.listen(port, () => {
  console.log(`Server started on port ${port}.`);
  console.log("press Ctrl-C to terminate....");
});
