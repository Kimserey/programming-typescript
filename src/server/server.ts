import * as express from "express";
import { Request, Response } from "express-serve-static-core";
import { store, user } from "./routers";

const app = express();
const port = process.env.PORT || 3000;

app
  .use("/store", store)
  .use("/user", user);

app.get("/", (req: Request, res: Response) => {
  res.status(404);
});

app.listen(port, () => {
  console.log(`Express started on http://localhost:${port}`);
  console.log("Press CTRL+C to terminate.");
});
