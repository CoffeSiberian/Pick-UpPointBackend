import bcrypt from "bcrypt";
import { HASH_ROUNDS } from "./configs";

export const hashPass = (pass: string, callback: Function): void => {
    bcrypt.hash(pass, HASH_ROUNDS, (err, hash) => {
        return callback(hash);
    });
};

export const checkHash = (
    pass: string,
    passHash: string,
    callback: Function
) => {
    bcrypt.compare(pass, passHash, (err, result): void => {
        if (err !== undefined) return callback(false);
        return callback(result);
    });
};
