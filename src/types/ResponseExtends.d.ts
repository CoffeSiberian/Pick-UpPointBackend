import { Response } from "express";
import { Jwt } from "./jwt";
import { Users } from "./db/model";

interface JwtLocals {
    jwt?: Jwt;
}

interface PassLocals {
    id: string;
    isAdmin: boolean;
    fk_store: string;
}

export interface ResponseJwt extends Response {
    locals: JwtLocals;
}

export interface ResponsePass extends Response {
    locals: PassLocals;
}
