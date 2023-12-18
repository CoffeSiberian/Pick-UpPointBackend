import { Express } from "express";
import { ResponseJwt } from "../../types/ResponseExtends";
import {
    authMiddlewareUser,
    authMiddlewareAdmin,
} from "../../middlewares/authMiddleware";

// GET
import { getPurchase } from "../get/getPurchase";

// POST
import { postBuyItems } from "../post/postBuyItems";
import { createPayCallback } from "../post/createPayCallback";

// PUT
import { putPurchaseStatus } from "../put/putPurchaseStatus";
import { putPurchaseRetired } from "../put/putPurchaseRetired";

const PurchasesRoutes = (app: Express) => {
    // GET
    app.get("/purchase", authMiddlewareAdmin, (req, res, next) => {
        getPurchase(req, res as ResponseJwt, next);
    });

    // POST
    app.post("/purchase", authMiddlewareUser, (req, res, next) => {
        postBuyItems(req, res as ResponseJwt, next);
    });
    app.post("/purchase/callback", (req, res, next) => {
        createPayCallback(req, res as ResponseJwt, next);
    });

    // PUT
    app.put("/purchase/status", authMiddlewareAdmin, (req, res, next) => {
        putPurchaseStatus(req, res as ResponseJwt, next);
    });
    app.put("/purchase/retired", authMiddlewareAdmin, (req, res, next) => {
        putPurchaseRetired(req, res as ResponseJwt, next);
    });
};

export default PurchasesRoutes;
