import { Request } from "express";

interface QueryData {
    limit_start: number;
    limit_end: number;
}

export const validateQueryPagination = (req: Request): null | QueryData => {
    const limit_start = req.query.limit_start;
    const limit_end = req.query.limit_end;

    if (!limit_start || typeof limit_start !== "string") {
        return null;
    }
    if (!limit_end || typeof limit_end !== "string") return null;

    const limit_startParse = parseInt(limit_start);
    const limit_endParse = parseInt(limit_end);
    if (isNaN(limit_startParse) || isNaN(limit_endParse)) {
        return null;
    }

    return {
        limit_start: limit_startParse,
        limit_end: limit_endParse,
    };
};
