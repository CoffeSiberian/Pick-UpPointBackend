import { Request, NextFunction } from "express";
import {
    FLOW_API_CALLBACK_URL,
    FLOW_API_RETURN_URL,
} from "../../utils/configs";
import { buyProcessSchema } from "../../schemas/ProductsSch";
import { createPurchasesWithItems } from "../../repositories/PurchasesR";
import { getManyProducts } from "../../repositories/ProductsR";
import { v4 as uuidv4 } from "uuid";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { Purchases as PurchaseType } from "../../types/db/model";
import { signDataPostCreatePay } from "../../utils/flowApi";
import { dbErrors } from "../../middlewares/errorMiddleware";

export const postBuyItems = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = buyProcessSchema.validate(req.body);
    if (error) {
        return res.status(400).json(InfoResponse(400, error.message));
    }
    const body = value as buyProcessPOST;

    const purchase = await getTotalPayment(
        body,
        res.jwtPayload.id,
        res.jwtPayload.fk_store
    );
    if (!purchase) {
        return res.status(404).json(InfoResponse(404, "Products not found"));
    }

    const response = await signDataPostCreatePay({
        amount: purchase.purchase.total,
        commerceOrder: purchase.purchase.id,
        email: res.jwtPayload.email,
        paymentMethod: 1,
        subject: res.jwtPayload.username,
        urlConfirmation: FLOW_API_CALLBACK_URL,
        urlReturn: `${FLOW_API_RETURN_URL}?id=${purchase.purchase.id}`,
        optional: JSON.stringify({
            userId: res.jwtPayload.id,
            username: res.jwtPayload.username,
            fk_store: res.jwtPayload.fk_store,
        }),
    });
    if (!response) {
        return res.status(500).json(InfoResponse(500, "Internal server error"));
    }

    purchase.purchase.payment_id = response.flowOrder.toString();
    purchase.purchase.payment_method = 1;

    try {
        await createPurchasesWithItems(purchase.purchase, purchase.products);

        res.status(200).json({
            id: purchase.purchase.id,
            url_pay: `${response.url}?token=${response.token}`,
            pay_flow_id: response.flowOrder,
        });

        return next();
    } catch (err: any) {
        dbErrors(err, res);
        next();
    }
};

const getTotalPayment = async (
    items: buyProcessPOST,
    fk_user: string,
    fk_store: string
): Promise<buyObject | null> => {
    const ids = items.products.map((item) => item.id);
    const products = await getManyProducts(ids);
    if (!products) return null;
    if (products.find((product) => !product)) return null;

    let total = 0;
    const fk_purchase = uuidv4();
    const purchaseItems: Array<itemsBuy | null> = products.map((product) => {
        const item = items.products.find((item) => item.id === product.id);
        if (!item) return null;
        const price = product.price * item.quantity;
        total += price;

        return {
            id: uuidv4(),
            quantity: item.quantity,
            price,
            fk_purchase,
            fk_product: product.id,
        };
    });
    if (purchaseItems.find((item) => !item)) return null;

    return {
        purchase: {
            id: fk_purchase,
            total,
            date: new Date(),
            status: 1,
            payment_successful: false,
            retired: false,
            fk_user,
            fk_store,
        },
        products: purchaseItems as itemsBuy[],
    };
};

interface itemsBuy {
    id: string;
    quantity: number;
    price: number;
    fk_purchase: string;
    fk_product: string;
}

interface buyObject {
    purchase: PurchaseType;
    products: itemsBuy[];
}
