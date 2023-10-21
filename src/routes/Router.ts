import { Express } from "express";

// types
import { ResponsePass } from "../types/ResponseExtends";

// middlewares
import { authAdmin } from "../middlewares/authMiddleware";
import { logAccessMiddleware } from "../middlewares/logAccessMiddleware";
import { logResponsesMiddleware } from "../middlewares/logResponsesMiddleware";
import { dbErrors } from "../middlewares/errorMiddleware";

// GET
import { verifyJWT } from "../routes/get/verifyJWT";

// POST
import { getJwt } from "./post/getJwt";

// PUT

// DELETE

// Routes

export default function (app: Express) {
    // middlewares
    app.use(logAccessMiddleware);

    // GET
    app.get("/verifyjwt", (req, res, next) => {
        verifyJWT(req, res, next);
    });

    // POST
    app.post("/loginadmin", authAdmin, (req, res, next) => {
        getJwt(req, res as ResponsePass, next);
    });

    // Routes

    // middlewares
    app.use(logResponsesMiddleware);
    app.use(dbErrors);
}
