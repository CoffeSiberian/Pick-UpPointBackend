export const deepCopy = (obj: object): object => {
    return JSON.parse(JSON.stringify(obj));
};
