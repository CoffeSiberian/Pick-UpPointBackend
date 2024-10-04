import { Response } from "express";
import { InfoResponse } from "../utils/InfoResponse";
import { ValidationError } from "sequelize";
import { logError } from "../utils/logger";
import { dbErrorsType } from "../types/errorMiddleware";

export const dbErrors = (err: dbErrorsType, res: Response) => {
    const error = err.err;

    if (error instanceof ValidationError) {
        logError(error.message);
        return res.status(400).json(InfoResponse(400, error.message));
    }

    try {
        logError(error.message);
        res.status(500).json(InfoResponse(500, error.message));
    } catch (err) {
        logError("Error in dbErrors middleware");
        res.status(500).json(InfoResponse(500, "Error in dbErrors middleware"));
    }
};
