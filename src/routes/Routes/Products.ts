import { Express } from "express";
import { ResponseJwt } from "../../types/ResponseExtends";

// middlewares
import { authMiddlewareAdmin } from "../../middlewares/authMiddleware";

// GET
import { getProducts } from "../get/getProducts";
import { getProduct } from "../get/getProduct";

// POST
import { postProduct } from "../post/postProduct";
import { postProductImages } from "../post/postProductImages";

// PUT
import { putProduct } from "../put/putProduct";
import { putProductStock } from "../put/putProductStock";
import { putPrimaryImage } from "../put/putPrimaryImage";

// DELETE
import { delProduct } from "../delete/delProduct";
import { delProductImage } from "../delete/delProductImage";

const ProductsRoutes = (app: Express) => {
    // GET
    app.get("/product", (req, res, next) => {
        getProduct(req, res as ResponseJwt, next);
    });
    app.get("/products", (req, res, next) => {
        getProducts(req, res as ResponseJwt, next);
    });

    // POST
    app.post("/product", authMiddlewareAdmin, (req, res, next) => {
        postProduct(req, res as ResponseJwt, next);
    });
    app.post("/product/images", authMiddlewareAdmin, (req, res, next) => {
        postProductImages(req, res as ResponseJwt, next);
    });

    // PUT
    app.put("/product", authMiddlewareAdmin, (req, res, next) => {
        putProduct(req, res as ResponseJwt, next);
    });
    app.put("/product/stock", authMiddlewareAdmin, (req, res, next) => {
        putProductStock(req, res as ResponseJwt, next);
    });
    app.put("/product/primary_image", authMiddlewareAdmin, (req, res, next) => {
        putPrimaryImage(req, res as ResponseJwt, next);
    });

    // DELETE
    app.delete("/product", authMiddlewareAdmin, (req, res, next) => {
        delProduct(req, res as ResponseJwt, next);
    });
    app.delete("/product/image", authMiddlewareAdmin, (req, res, next) => {
        delProductImage(req, res as ResponseJwt, next);
    });
};

export default ProductsRoutes;
