"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const router_1 = require("./router");
typeorm_1.createConnection()
    .then(() => {
    const server = express();
    const port = process.env.PORT || 3000;
    server
        .use(express.json())
        .use("/store", router_1.store)
        .use("/user", router_1.user)
        .get("/", (_, res) => {
        res.status(200);
        res.send("Service is running.");
    });
    server.get("/", (req, res) => {
        res.status(404);
    });
    server.listen(port, () => {
        console.log(`Express started on http://localhost:${port}`);
        console.log("Press CTRL+C to terminate.");
    });
});
//# sourceMappingURL=server.js.map