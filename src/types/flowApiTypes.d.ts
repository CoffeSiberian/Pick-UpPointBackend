import { AxiosResponse } from "axios";

export interface DataPostCreatePay {
    amount: number;
    commerceOrder: string;
    email: string;
    paymentMethod: number;
    subject: string;
    urlConfirmation: string;
    urlReturn: string;
}

export interface DataPostCreatePayAxiosResponse {
    url: string;
    token: string;
    flowOrder: number;
}

export interface DataPostCreatePayAxios extends AxiosResponse {
    data: DataPostCreatePayAxiosResponse;
}
