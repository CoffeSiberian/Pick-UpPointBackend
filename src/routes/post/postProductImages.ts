import { Request, NextFunction } from "express";
import { createProductImages } from "../../repositories/ProductsR";
import formidable from "formidable";
import { v4 as uuidv4 } from "uuid";
import { STATIC_FOLDER } from "../../utils/configs";
import { ResponseJwt } from "../../types/ResponseExtends";
import { InfoResponse } from "../../utils/InfoResponse";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const postProductImages = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const form = formidable({
        uploadDir: STATIC_FOLDER,
        keepExtensions: true,
        allowEmptyFiles: false,
        maxFiles: 1,
        maxFileSize: 5 * 1024 * 1024,
        filter: ({ mimetype }) => {
            return !!mimetype && mimetype.includes("image");
        },
        filename: (_name, ext) => {
            return `${uuidv4().replaceAll("-", "")}${ext}`;
        },
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(500).json(InfoResponse(500, "Internal Server Error"));
            return next();
        }

        if (!files.image) {
            res.status(400).json(InfoResponse(400, "Bad Request"));
            return next();
        }

        if (!fields.fk_product) {
            res.status(400).json(InfoResponse(400, "Bad Request"));
            return next();
        }

        if (fields.fk_product.length !== 1 || files.image.length !== 1) {
            res.status(400).json(InfoResponse(400, "Bad Request"));
            return next();
        }

        createProductImages(
            fields.fk_product[0],
            files.image[0].newFilename,
            res.jwtPayload.fk_store
        )
            .then(() => {
                res.json(InfoResponse(200, "Created"));
                next();
            })
            .catch((err) => {
                dbErrors(err, res);
                next();
            });
    });
};
