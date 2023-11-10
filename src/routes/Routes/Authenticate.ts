import { Express } from "express";

import { ResponsePass } from "../../types/ResponseExtends";

// middlewares
import { authUser } from "../../middlewares/authMiddleware";

// GET
import { verifyJWT } from "../../routes/get/verifyJWT";

// POST
import { getJwt } from "../post/getJwt";
import { postRegister } from "../post/postRegister";

const AuthenticateRoutes = (app: Express) => {
    // GET
    app.get("/verifyjwt", verifyJWT);

    // POST
    app.post("/login", authUser, (req, res, next) => {
        getJwt(req, res as ResponsePass, next);
    });
    app.post("/register", postRegister);
};

export default AuthenticateRoutes;
