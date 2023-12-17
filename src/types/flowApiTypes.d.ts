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

export interface DataGetPayStatusAxiosResponse {
    flowOrder: number;
    commerceOrder: string;
    requestDate: string;
    status: number;
    subject: string;
    currency: string;
    amount: number;
    payer: string;
    optional: Optional;
    pending_info: PendingInfo;
    paymentData: PaymentData;
    merchantId: string;
}

export interface Optional {
    RUT: string;
    ID: string;
}

export interface PendingInfo {
    media: string;
    date: string;
}

export interface PaymentData {
    date: string;
    media: string;
    conversionDate: string;
    conversionRate: number;
    amount: number;
    currency: string;
    fee: number;
    balance: number;
    transferDate: string;
}

export interface DataPostCreatePayAxios extends AxiosResponse {
    data: DataPostCreatePayAxiosResponse;
}

export interface DataGetPayStatusAxios extends AxiosResponse {
    data: DataGetPayStatusAxiosResponse;
}
