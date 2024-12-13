import { Express } from "express";
import { ResponseJwt } from "../../types/ResponseExtends";

import { authMiddlewareAdmin } from "../../middlewares/authMiddleware";

// GET
import { getTotalPurchased } from "../get/getTotalPurchased";
import { getTotalStorePurchasesMonth } from "../get/getTotalStorePurchasesMonth";
import { getTotalStorePurchasesWeek } from "../get/getTotalStorePurchasesWeek";

const ChartsRoutes = (app: Express) => {
    // GET
    app.get("/purchases/total", authMiddlewareAdmin, (req, res, next) => {
        getTotalPurchased(req, res as ResponseJwt, next);
    });
    app.get("/purchases/total/month", authMiddlewareAdmin, (req, res, next) => {
        getTotalStorePurchasesMonth(req, res as ResponseJwt, next);
    });
    app.get("/purchases/total/week", authMiddlewareAdmin, (req, res, next) => {
        getTotalStorePurchasesWeek(req, res as ResponseJwt, next);
    });

    // POST

    // PUT

    // DELETE
};

export default ChartsRoutes;
