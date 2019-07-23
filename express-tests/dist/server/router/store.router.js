"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const entity_1 = require("../entity");
exports.router = express_1.Router();
exports.router.get("/tshirts", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const tshirts = yield entity_1.TShirt.find();
        res.json(tshirts);
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
}));
exports.router.get("/tshirts/:tshirtId", [
    express_validator_1.param("tshirtId").isInt()
], (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const tshirt = yield entity_1.TShirt.findOne(req.params.tshirtId);
        if (!!tshirt) {
            res.json(tshirt);
        }
        else {
            res.sendStatus(404);
        }
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
}));
exports.router.post("/tshirts", [
    express_validator_1.body("description", "Must have at least two characters.")
        .isString()
        .isLength({ min: 2 }),
    express_validator_1.body("brand", "Must have at least two characters.")
        .isString()
        .isLength({ min: 2 }),
    express_validator_1.body("price")
        .isNumeric()
], (req, res) => __awaiter(this, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() });
        return;
    }
    try {
        let tshirt = new entity_1.TShirt();
        tshirt.description = req.body.description;
        tshirt.brand = req.body.brand;
        tshirt.price = req.body.price;
        tshirt = yield tshirt.save();
        res.json(tshirt);
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
}));
//# sourceMappingURL=store.router.js.map