import { Router } from "express";
import { Request, Response } from "express-serve-static-core";

export const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("user");
});

router.post("/login", (req: Request, res: Response) => {
    res.send("login");
});
