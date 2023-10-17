import {
    SignJWT,
    importPKCS8,
    importSPKI,
    jwtVerify,
    JWSHeaderParameters,
    JWTPayload,
} from "jose";
import {
    JWT_TIMEOUT_TOKEN,
    JWT_ALGORITHM,
    JWT_SECRET_PKCS8,
    JWT_PUBLIC,
} from "./configs";
import { Jwt as JWT_Interface, JwtPayload, JwtHeader } from "../types/jwt";
import { logError } from "./logger";

const verifyHeaders = (headers: JWSHeaderParameters): JwtHeader | null => {
    if (!headers.alg) return null;
    if (!headers.typ) return null;
    return { alg: headers.alg, typ: headers.typ };
};

const verifyPayload = (payload: JWTPayload): JwtPayload | null => {
    if (!payload.id) return null;
    if (!payload.name) return null;

    if (typeof payload.id !== "string") return null;
    if (typeof payload.name !== "string") return null;

    if (!payload.iat) return null;
    if (!payload.exp) return null;

    return {
        id: payload.id,
        name: payload.name,
        iat: payload.iat,
        exp: payload.exp,
    };
};

export const createJWT = async (payload: JwtPayload): Promise<string> => {
    const privateKey = await importPKCS8(JWT_SECRET_PKCS8, JWT_ALGORITHM);

    const jwt = await new SignJWT({ ...payload })
        .setProtectedHeader({ alg: JWT_ALGORITHM, typ: "JWT" })
        .setIssuedAt()
        .setExpirationTime(JWT_TIMEOUT_TOKEN)
        .sign(privateKey);
    return jwt;
};

export const verifyJWT = async (jwt: string): Promise<JWT_Interface> => {
    const publicKey = await importSPKI(JWT_PUBLIC, JWT_ALGORITHM);
    try {
        const { payload, protectedHeader } = await jwtVerify(jwt, publicKey);

        const header = verifyHeaders(protectedHeader);
        const verifiedPayload = verifyPayload(payload);
        if (header && verifiedPayload) {
            return {
                header,
                payload: verifiedPayload,
                passed: true,
            };
        }
        throw new Error(
            `JWT verification failed. payload or header is not valid | JWT: ${jwt}`
        );
    } catch (e: any) {
        logError(e.message);
        return {
            passed: false,
        };
    }
};
