import bcrypt from "bcrypt";
import { HASH_ROUNDS } from "./configs";

export const hashPass = async (pass: string): Promise<string> => {
    const hash = await new Promise<string>((resolve, reject) => {
        bcrypt.hash(pass, HASH_ROUNDS, (err, hash) => {
            if (err) reject(err);
            resolve(hash);
        });
    });
    return hash;
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
