import { Express } from "express";
import { ResponseJwt } from "../../types/ResponseExtends";
import {
    authMiddlewareUser,
    authMiddlewareAdmin,
} from "../../middlewares/authMiddleware";

// GET
import { postCheckPurchase } from "../post/postCheckPurchase";
import { getUserPurchase } from "../get/getUserPurchase";
import { getPurchases } from "../get/getPurchases";

// POST
import { postBuyItems } from "../post/postBuyItems";
import { createPayCallback } from "../post/createPayCallback";
import { postPurchaseRedirect } from "../post/postPurchaseRedirect";

// PUT
// import { putPurchaseStatus } from "../put/putPurchaseStatus"; // need to be fixed
import { putPurchaseRetired } from "../put/putPurchaseRetired";

const PurchasesRoutes = (app: Express) => {
    // GET
    app.get("/purchase/user", authMiddlewareUser, (req, res, next) => {
        getUserPurchase(req, res as ResponseJwt, next);
    });
    app.get("/purchases", authMiddlewareAdmin, (req, res, next) => {
        getPurchases(req, res as ResponseJwt, next);
    });

    // POST
    app.post("/purchase/check", authMiddlewareAdmin, (req, res, next) => {
        postCheckPurchase(req, res as ResponseJwt, next);
    });
    app.post("/purchase", authMiddlewareUser, (req, res, next) => {
        postBuyItems(req, res as ResponseJwt, next);
    });
    app.post("/purchase/callback", (req, res, next) => {
        createPayCallback(req, res as ResponseJwt, next);
    });
    app.post("/purchase/redirect", postPurchaseRedirect);

    // PUT
    /*     app.put("/purchase/status", authMiddlewareAdmin, (req, res, next) => {
        putPurchaseStatus(req, res as ResponseJwt, next);
    }); */
    app.put("/purchase/retired", authMiddlewareAdmin, (req, res, next) => {
        putPurchaseRetired(req, res as ResponseJwt, next);
    });
};

export default PurchasesRoutes;
