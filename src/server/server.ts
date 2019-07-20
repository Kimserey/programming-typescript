import * as express from "express";
import { Request, Response } from "express-serve-static-core";
import * as store from "./store";
import * as user from "./user";

const app = express();
const port = process.env.PORT || 3000;

app
  .use("/store", store.router)
  .use("/user", user.router);

app.get("/", (req: Request, res: Response) => {
  res.status(404);
});

app.listen(port, () => {
  console.log(`Express started on http://localhost:${port}`);
  console.log("Press CTRL+C to terminate.");
});
