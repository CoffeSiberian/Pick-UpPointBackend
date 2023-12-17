import { createHmac } from "crypto";
import { FLOW_API_SECRET_KEY, FLOW_API_KEY, FLOW_API_URL } from "./configs";
import { dataGet, dataPost } from "./dataFetch";

// types
import {
    DataPostCreatePay,
    DataPostCreatePayAxios,
    DataPostCreatePayAxiosResponse,
} from "../types/flowApiTypes";

const sign = (encodedData: { [key: string]: any }): string => {
    let stringCode: string = "";

    for (let key in encodedData) {
        stringCode += key + encodedData[key];
    }

    return createHmac("sha256", FLOW_API_SECRET_KEY)
        .update(stringCode)
        .digest("hex");
};

export const signDataPostCreatePay = async (
    data: DataPostCreatePay
): Promise<DataPostCreatePayAxiosResponse | null> => {
    const dataToSign = {
        amount: data.amount,
        apiKey: FLOW_API_KEY,
        commerceOrder: data.commerceOrder,
        currency: "CLP",
        email: data.email,
        paymentMethod: data.paymentMethod,
        subject: data.subject,
        urlConfirmation: data.urlConfirmation,
        urlReturn: data.urlReturn,
    };
    const signData = sign(dataToSign);

    const dataToSend = {
        ...dataToSign,
        s: signData,
    };

    const response: DataPostCreatePayAxios | null = await dataPost(
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        },
        dataToSend,
        `${FLOW_API_URL}/payment/create`
    );

    if (!response) return null;
    if (response.status !== 200) return null;
    return response.data;
};

const signDataGetGetPayByFlowOrder = (flowOrder: number) => {
    const dataToSign = {
        apiKey: FLOW_API_KEY,
        flowOrder: flowOrder,
    };

    const signData = sign(dataToSign);

    const dataToSend = {
        ...dataToSign,
        s: signData,
    };
};
