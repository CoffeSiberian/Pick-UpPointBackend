import { Express } from "express";
import { ResponseJwt } from "../../types/ResponseExtends";

import { authMiddlewareAdmin } from "../../middlewares/authMiddleware";

// GET
import { getTotalPurchased } from "../get/getTotalPurchased";

const ChartsRoutes = (app: Express) => {
    // GET
    app.get("/purchases/total", authMiddlewareAdmin, (req, res, next) => {
        getTotalPurchased(req, res as ResponseJwt, next);
    });

    // POST

    // PUT

    // DELETE
};

export default ChartsRoutes;
