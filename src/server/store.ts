import { Router } from "express";
import { Request, Response } from "express-serve-static-core";

export const router = Router();

router.get("/tshirts", (req: Request, res: Response) => {
    res.send("tshirts");
});

router.get("/inventory", (req: Request, res: Response) => {
    res.send("inventory");
});

router.post("/order", (req: Request, res: Response) => {
    res.send("orders");
});
