import * as express from "express";
import { Request, Response } from "express-serve-static-core";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.type("text/plain");
  res.send("Meadowlark Travel");
});

app.get("/about", (req: Request, res: Response) => {
  res.type("text/plain");
  res.send("About Meadowlark Travel");
});

app.use((_: Request, res: Response) => {
  res.type("text/plain");
  res.status(404);
  res.send("Not Found");
});

app.use((err: any, req: Request, res: Response) => {
  console.error(err.message);
  res.type("text/plain");
  res.status(500);
  res.send("Server Error");
});

app.listen(port, () => {
  console.log(`Express started on http://localhost:${port}`);
  console.log("Press CTRL+C to terminate.");
});
