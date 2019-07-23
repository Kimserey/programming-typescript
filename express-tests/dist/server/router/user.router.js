"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
exports.router = express_1.Router();
exports.router.get("/", (req, res) => {
    res.send("user");
});
exports.router.post("/login", (req, res) => {
    res.send("login");
});
//# sourceMappingURL=user.router.js.map