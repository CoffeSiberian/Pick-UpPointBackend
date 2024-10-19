import { Express } from "express";
import { ResponseJwt } from "../../types/ResponseExtends";

// middlewares
import {
    authMiddlewareAdmin,
    authMiddlewareUser,
} from "../../middlewares/authMiddleware";

// GET
import { getUser } from "../get/getUser";
import { getListUsers } from "../get/getListUsers";
import { getUserPurchase } from "../get/getUserPurchase";
import { getUserPurchases } from "../get/getUserPurchases";

// POST
import { postUser } from "../post/postUser";

// PUT
import { putUser } from "../put/putUser";
import { putUserPassword } from "../put/putUserPassword";
import { putUserEmail } from "../put/putUserEmail";
import { putUserName } from "../put/putUserName";

// DELETE
import { delUser } from "../delete/delUser";

const UsersRoutes = (app: Express) => {
    // GET
    app.get("/user/", (req, res, next) => {
        getUser(req, res as ResponseJwt, next);
    });
    app.get("/user/list", authMiddlewareAdmin, (req, res, next) => {
        getListUsers(req, res as ResponseJwt, next);
    });
    app.get("/user/purchase/", authMiddlewareUser, (req, res, next) => {
        getUserPurchase(req, res as ResponseJwt, next);
    });
    app.get("/user/purchases/", authMiddlewareUser, (req, res, next) => {
        getUserPurchases(req, res as ResponseJwt, next);
    });

    // POST
    app.post("/user/", authMiddlewareAdmin, (req, res, next) => {
        postUser(req, res as ResponseJwt, next);
    });

    // PUT
    app.put("/user/", authMiddlewareAdmin, (req, res, next) => {
        putUser(req, res as ResponseJwt, next);
    });
    app.put("/user/password/", authMiddlewareUser, (req, res, next) => {
        putUserPassword(req, res as ResponseJwt, next);
    });
    app.put("/user/email/", authMiddlewareUser, (req, res, next) => {
        putUserEmail(req, res as ResponseJwt, next);
    });
    app.put("/user/name/", authMiddlewareUser, (req, res, next) => {
        putUserName(req, res as ResponseJwt, next);
    });

    // DELETE
    app.delete("/user/", authMiddlewareAdmin, (req, res, next) => {
        delUser(req, res as ResponseJwt, next);
    });
};

export default UsersRoutes;
