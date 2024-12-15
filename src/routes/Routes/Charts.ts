import { Express } from "express";
import { ResponseJwt } from "../../types/ResponseExtends";

import { authMiddlewareAdmin } from "../../middlewares/authMiddleware";

// GET
import { getTotalPurchased } from "../get/getTotalPurchased";
import { getMostPurchasedItems } from "../get/getMostPurchasedItems";

const ChartsRoutes = (app: Express) => {
    // GET
    app.get("/purchases/total", authMiddlewareAdmin, (req, res, next) => {
        getTotalPurchased(req, res as ResponseJwt, next);
    });
    app.get("/purchases/most", authMiddlewareAdmin, (req, res, next) => {
        getMostPurchasedItems(req, res as ResponseJwt, next);
    });
};

export default ChartsRoutes;
