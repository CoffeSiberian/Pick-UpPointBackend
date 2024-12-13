// Grafico de barras o lineal para las ventas
// Grafico de linea para el total vendido en la semana
// total de venta del periodo
// 7 y 30 dias
import { Express } from "express";
import { ResponseJwt } from "../../types/ResponseExtends";

import { authMiddlewareAdmin } from "../../middlewares/authMiddleware";

// GET
import { getTotalPurchased } from "../get/getTotalPurchased";
import { getTotalStorePurchasesMoth } from "../get/getTotalStorePurchasesBetween";

// POST

// PUT

// DELETE

const ChartsRoutes = (app: Express) => {
    // GET
    app.get("/purchases/total", authMiddlewareAdmin, (req, res, next) => {
        getTotalPurchased(req, res as ResponseJwt, next);
    });
    app.get("/purchases/total/moth", authMiddlewareAdmin, (req, res, next) => {
        getTotalStorePurchasesMoth(req, res as ResponseJwt, next);
    });

    // POST

    // PUT

    // DELETE
};

export default ChartsRoutes;
