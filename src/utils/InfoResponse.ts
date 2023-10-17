interface ResponseError {
    status: number;
    message: string;
}

export const InfoResponse = (
    status: number,
    message: string
): ResponseError => {
    return {
        status: status,
        message: message,
    };
};
