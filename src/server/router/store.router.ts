import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import { check, validationResult } from "express-validator";
import { TShirt } from "../entity";

export const router = Router();

router.get("/tshirts", async (req: Request, res: Response) => {
    try {
        const tshirts = await TShirt.find();
        res.json(tshirts);
    } catch {
        res.status(500);
        res.send("Internal Server Error.");
    }
});

router.post("/tshirts", [
    check("description", "Must have at least two characters.")
        .isString()
        .isLength({ min: 2 }),
    check("brand", "Must have at least two characters.")
        .isString()
        .isLength({ min: 2 }),
    check("price")
        .isNumeric()
], async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() });
        return;
    }

    try {
        const tshirt = new TShirt();
        tshirt.description = req.body.description;
        tshirt.brand = req.body.brand;
        tshirt.price = req.body.price;
        await tshirt.save();
    } catch (e) {
        console.error(e);
        res.status(500);
        res.send("Internal Server Error.");
    }
});
