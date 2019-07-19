import { readFile } from "fs";
import { createServer, IncomingMessage, ServerResponse } from "http";

type ContentType = "text/html" | "image/png";

const port = process.env.PORT || 3000;

function serveStaticFile(res: ServerResponse, path: string, contentType: ContentType, responseCode = 200) {
  readFile(__dirname + path, (err, data: Buffer) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text.plain" });
      return res.end("Internal Server Error");
    }

    res.writeHead(responseCode, { "Content-Type": contentType });
    res.end(data);
  });
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const path = req.url!.replace(/\/?(?:\?.*)?$/, "").toLowerCase();

  switch (path) {
    case "":
      serveStaticFile(res, "/public/home.html", "text/html");
      break;
    case "/about":
      serveStaticFile(res, "/public/about.html", "text/html");
      break;
    case "/img/logo.png":
      serveStaticFile(res, "/public/img/logo.png", "image/png");
      break;
    default:
      serveStaticFile(res, "/public/404.html", "text/html", 404);
      break;
  }
});

server.listen(port, () => {
  console.log(`Server started on port ${port}.`);
  console.log("press Ctrl-C to terminate....");
});
