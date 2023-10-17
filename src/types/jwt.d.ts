export interface JwtPayload {
    id: string;
    name: string;
    iat?: number;
    exp?: number;
}

export interface JwtHeader {
    alg: string;
    typ: string;
}

export interface Jwt {
    payload?: JwtPayload | null;
    header?: JwtHeader | null;
    passed: boolean;
}
