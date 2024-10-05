import { Response } from "express";
import { InfoResponse } from "../utils/InfoResponse";
import { ValidationError } from "sequelize";
import { logError } from "../utils/logger";
import { dbErrorsType } from "../types/errorMiddleware";

export const dbErrors = (
    err: dbErrorsType | ValidationError,
    res: Response
) => {
    if (err instanceof ValidationError) {
        logError(err.message);
        return res.status(400).json(InfoResponse(400, err.message));
    }

    try {
        logError(err.err.message);
        res.status(500).json(InfoResponse(500, err.err.message));
    } catch (err) {
        logError("Error in dbErrors middleware");
        res.status(500).json(InfoResponse(500, "Error in dbErrors middleware"));
    }
};
