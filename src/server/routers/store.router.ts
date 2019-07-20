import { Router } from "express";
import { NextFunction, Request, Response } from "express-serve-static-core";
import { check, validationResult } from "express-validator";
import { getTshirts } from "../services";

export const router = Router();

router.get("/tshirts", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tshirts = await getTshirts();
        res.json(tshirts);
    } catch {
        next();
    }
});

router.post("/order", [
    check("description", "Must have at least two characters.")
        .isString()
        .isLength({ min: 2 }),
    check("brand", "Must have at least two characters.")
        .isString()
        .isLength({ min: 2 }),
    check("price")
        .isNumeric()
], (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() });
        return;
    }
    res.json(req.body);
});
