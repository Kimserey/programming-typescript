import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import { check, validationResult } from "express-validator";
import { TShirt } from "../entity";

export const router = Router();

router.get("/tshirts", async (req: Request, res: Response) => {
    try {
        const tshirts = await TShirt.find();
        res.json(tshirts);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

router.get("/tshirts/:tshirtId", async (req: Request, res: Response) => {
    try {
        const tshirt = await TShirt.findOne(req.params.tshirtId);

        if (!!tshirt) {
            res.json(tshirt);
        } else {
            res.sendStatus(404);
        }
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
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
        let tshirt = new TShirt();
        tshirt.description = req.body.description;
        tshirt.brand = req.body.brand;
        tshirt.price = req.body.price;
        tshirt = await tshirt.save();
        res.json(tshirt);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});
