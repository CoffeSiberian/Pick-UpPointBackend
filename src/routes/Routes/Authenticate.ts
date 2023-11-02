import { Express } from "express";

import { ResponsePass } from "../../types/ResponseExtends";

// middlewares
import { authAdmin } from "../../middlewares/authMiddleware";

// GET
import { verifyJWT } from "../../routes/get/verifyJWT";

// POST
import { getJwt } from "../post/getJwt";
import { postRegister } from "../post/postRegister";

const AuthenticateRoutes = (app: Express) => {
    // GET
    app.get("/verifyjwt", (req, res, next) => {
        verifyJWT(req, res, next);
    });

    // POST
    app.post("/loginadmin", authAdmin, (req, res, next) => {
        getJwt(req, res as ResponsePass, next);
    });
    app.post("/register", postRegister);
};

export default AuthenticateRoutes;
