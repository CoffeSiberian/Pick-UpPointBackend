import { Express } from "express";
import { ResponseJwt } from "../../types/ResponseExtends";

// GET
import { getAllStoreProducts } from "../get/getAllStoreProducts";
import { getProduct } from "../get/getProduct";

// POST
import { postProduct } from "../post/postProduct";

// PUT
import { putProduct } from "../put/putProduct";
import { putProductStock } from "../put/putProductStock";

// DELETE
import { delProduct } from "../delete/delProduct";

const ProductsRoutes = (app: Express) => {
    // GET
    app.get("/product", (req, res, next) => {
        getProduct(req, res as ResponseJwt, next);
    });
    app.get("/products", (req, res, next) => {
        getAllStoreProducts(req, res as ResponseJwt, next);
    });

    // POST
    app.post("/product", (req, res, next) => {
        postProduct(req, res as ResponseJwt, next);
    });

    // PUT
    app.put("/product", (req, res, next) => {
        putProduct(req, res as ResponseJwt, next);
    });
    app.put("/product/stock", (req, res, next) => {
        putProductStock(req, res as ResponseJwt, next);
    });

    // DELETE
    app.delete("/product", (req, res, next) => {
        delProduct(req, res as ResponseJwt, next);
    });
};

export default ProductsRoutes;
