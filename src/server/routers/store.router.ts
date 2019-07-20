import { Router } from "express";
import { NextFunction, Request, Response } from "express-serve-static-core";
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

router.post("/order", (req: Request, res: Response) => {
    res.send("orders");
});
