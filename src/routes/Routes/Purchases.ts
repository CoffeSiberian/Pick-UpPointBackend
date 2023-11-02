import { Express } from "express";
import { ResponseJwt } from "../../types/ResponseExtends";

// GET
import { getPurchase } from "../get/getPurchase";

// POST
import { postBuyItems } from "../post/postBuyItems";

// PUT
import { putPurchaseStatus } from "../put/putPurchaseStatus";
import { putPurchaseRetired } from "../put/putPurchaseRetired";

const PurchasesRoutes = (app: Express) => {
    // GET
    app.get("/purchase", (req, res, next) => {
        getPurchase(req, res as ResponseJwt, next);
    });

    // POST
    app.post("/purchase", (req, res, next) => {
        postBuyItems(req, res as ResponseJwt, next);
    });

    // PUT
    app.put("/purchase/status", (req, res, next) => {
        putPurchaseStatus(req, res as ResponseJwt, next);
    });
    app.put("/purchase/retired", (req, res, next) => {
        putPurchaseRetired(req, res as ResponseJwt, next);
    });
};

export default PurchasesRoutes;
