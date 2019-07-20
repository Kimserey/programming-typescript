import * as express from "express";
import { Request, Response } from "express-serve-static-core";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { TShirt } from "./entity";
import { store, user } from "./router";

createConnection({
  type: "sqlite",
  database: "./data/data.db",
  entities: [ TShirt ],
  logging: true,
  synchronize: true
})
  .then(() => {
    const server = express();
    const port = process.env.PORT || 3000;

    server
      .use(express.json())
      .use("/store", store)
      .use("/user", user);

    server.get("/", (req: Request, res: Response) => {
      res.status(404);
    });

    server.listen(port, () => {
      console.log(`Express started on http://localhost:${port}`);
      console.log("Press CTRL+C to terminate.");
    });
  }
  );
