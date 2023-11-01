import { Express } from "express";
import { ResponseJwt } from "../../types/ResponseExtends";

// GET
import { getCategories } from "../get/getCategories";
import { getCategorie } from "../get/getCategorie";
import { getCategoriesProducts } from "../get/getCategoriesProducts";

// POST
import { postCategorie } from "../post/postCategorie";

// PUT
import { putCategorieName } from "../put/putCategorieName";

// DELETE
import { delCategorie } from "../delete/delCategorie";

const CategoriesRoutes = (app: Express) => {
    // GET
    app.get("/categories", getCategories);
    app.get("/categorie", getCategorie);
    app.get("/categorie/products", getCategoriesProducts);

    // POST
    app.post("/categorie", (req, res, next) => {
        postCategorie(req, res as ResponseJwt, next);
    });

    // PUT
    app.put("/categorie/name", (req, res, next) => {
        putCategorieName(req, res as ResponseJwt, next);
    });

    // DELETE
    app.delete("/categorie", (req, res, next) => {
        delCategorie(req, res as ResponseJwt, next);
    });
};

export default CategoriesRoutes;
