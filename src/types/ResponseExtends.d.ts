import { Response } from "express";
import { JwtPayload } from "./jwt";
import { Users } from "./db/model";

interface ResponseJwt extends Response {
    jwtPayload: JwtPayload;
}

interface PassLocals {
    id: string;
    username: string;
    isAdmin: boolean;
    fk_store: string;
}

interface ResponsePass extends Response {
    locals: PassLocals;
}
