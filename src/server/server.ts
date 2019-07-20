import * as express from "express";
import { Request, Response } from "express-serve-static-core";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { store, user } from "./router";

createConnection()
  .then(() => {
    const server = express();
    const port = process.env.PORT || 3000;

    server
      .use(express.json())
      .use("/store", store)
      .use("/user", user)
      .get("/", (_, res) => {
        res.status(200);
        res.send("Service is running.");
      });

    server.get("/", (req: Request, res: Response) => {
      res.status(404);
    });

    server.listen(port, () => {
      console.log(`Express started on http://localhost:${port}`);
      console.log("Press CTRL+C to terminate.");
    });
  });
