import { Express } from "express";

// middlewares
import { logAccessMiddleware } from "../middlewares/logAccessMiddleware";
import { logResponsesMiddleware } from "../middlewares/logResponsesMiddleware";
import { dbErrors } from "../middlewares/errorMiddleware";

// Routes
import AuthenticateRoutes from "./Routes/Authenticate";
import CategoriesRoutes from "./Routes/Categories";
import UsersRoutes from "./Routes/Users";
import ProductsRoutes from "./Routes/Products";
import PurchasesRoutes from "./Routes/Purchases";

export default function (app: Express) {
    // middlewares
    app.use(logAccessMiddleware);

    // Routes
    AuthenticateRoutes(app);
    CategoriesRoutes(app);
    UsersRoutes(app);
    ProductsRoutes(app);
    PurchasesRoutes(app);

    // middlewares
    app.use(logResponsesMiddleware);
    app.use(dbErrors);
}
