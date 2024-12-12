import { Express } from "express";

// middlewares
import { logAccessMiddleware } from "../middlewares/logAccessMiddleware";
import { logResponsesMiddleware } from "../middlewares/logResponsesMiddleware";

// Routes
import AuthenticateRoutes from "./Routes/Authenticate";
import CategoriesRoutes from "./Routes/Categories";
import UsersRoutes from "./Routes/Users";
import ProductsRoutes from "./Routes/Products";
import PurchasesRoutes from "./Routes/Purchases";
import ChartsRoutes from "./Routes/Charts";

export default function (app: Express) {
    // middlewares
    app.use(logAccessMiddleware);

    // Routes
    AuthenticateRoutes(app);
    CategoriesRoutes(app);
    UsersRoutes(app);
    ProductsRoutes(app);
    PurchasesRoutes(app);
    ChartsRoutes(app);

    // middlewares
    app.use(logResponsesMiddleware);
}
