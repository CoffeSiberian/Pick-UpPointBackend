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
import CategoriesRoutes from "./Routes/Categories";
import UsersRoutes from "./Routes/Users";
import ProductsRoutes from "./Routes/Products";

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
    CategoriesRoutes(app);
    UsersRoutes(app);
    ProductsRoutes(app);

    // middlewares
    app.use(logResponsesMiddleware);
    app.use(dbErrors);
}
