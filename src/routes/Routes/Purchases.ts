import { Express } from "express";
import { ResponseJwt } from "../../types/ResponseExtends";
import {
    authMiddlewareUser,
    authMiddlewareAdmin,
} from "../../middlewares/authMiddleware";

// GET
import { getCheckPurchase } from "../get/getCheckPurchase";
import { getPurchases } from "../get/getPurchases";
import { getUserPurchasesAdmin } from "../get/getUserPurchasesAdmin";
import { getUserPurchasesProfile } from "../get/getUserPurchasesProfile";
import { getAllItemsPurchased } from "../get/getAllItemsPurchased";

// POST
import { postBuyItems } from "../post/postBuyItems";
import { createPayCallback } from "../post/createPayCallback";
import { postPurchaseRedirect } from "../post/postPurchaseRedirect";

// PUT
// import { putPurchaseStatus } from "../put/putPurchaseStatus"; // need to be fixed
import { putPurchaseRetired } from "../put/putPurchaseRetired";

const PurchasesRoutes = (app: Express) => {
    // GET
    app.get("/purchase/check", authMiddlewareAdmin, (req, res, next) => {
        getCheckPurchase(req, res as ResponseJwt, next);
    });
    app.get("/purchases", authMiddlewareAdmin, (req, res, next) => {
        getPurchases(req, res as ResponseJwt, next);
    });
    app.get("/purchases/user", authMiddlewareAdmin, (req, res, next) => {
        getUserPurchasesAdmin(req, res as ResponseJwt, next);
    });
    app.get("/purchases/profile", authMiddlewareUser, (req, res, next) => {
        getUserPurchasesProfile(req, res as ResponseJwt, next);
    });
    app.get("/purchase/items", authMiddlewareAdmin, (req, res, next) => {
        getAllItemsPurchased(req, res as ResponseJwt, next);
    });

    // POST
    app.post("/purchase", authMiddlewareUser, (req, res, next) => {
        postBuyItems(req, res as ResponseJwt, next);
    });
    app.post("/purchase/callback", createPayCallback);
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
