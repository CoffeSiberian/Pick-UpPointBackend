import { Request, NextFunction } from "express";
import { sequelize } from "../../models/database";
import {
    FLOW_API_CALLBACK_URL,
    FLOW_API_RETURN_URL,
} from "../../utils/configs";
import { buyProcessSchema } from "../../schemas/ProductsSch";
import {
    createPurchasesWithTransaction,
    createPurchaseItems,
    updatePurchase,
} from "../../repositories/PurchasesR";
import { getManyProducts } from "../../repositories/ProductsR";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { Purchases_Items } from "../../types/db/model";
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
    const items_buy = await getTotalPayment(body);

    if (!items_buy) {
        return res.status(404).json(InfoResponse(404, "Products not found"));
    }

    let transaction;
    try {
        transaction = await sequelize.transaction();
    } catch (err: any) {
        dbErrors(err, res);
        return next();
    }

    let purchase;
    try {
        purchase = await createPurchasesWithTransaction(
            {
                total: items_buy.total_price,
                date: new Date(),
                status: 1,
                payment_successful: false,
                retired: false,
                fk_user: res.jwtPayload.id,
                fk_store: res.jwtPayload.fk_store,
            },
            transaction
        );
    } catch (err: any) {
        await transaction.rollback();
        dbErrors(err, res);
        return next();
    }

    if (!purchase) {
        await transaction.rollback();
        return res.status(404).json(InfoResponse(404, "Products not found"));
    }

    const response = await signDataPostCreatePay({
        amount: purchase.total,
        commerceOrder: purchase.id!,
        email: res.jwtPayload.email,
        paymentMethod: 1,
        subject: res.jwtPayload.username,
        urlConfirmation: FLOW_API_CALLBACK_URL,
        urlReturn: `${FLOW_API_RETURN_URL}?id=${purchase.id}`,
        optional: JSON.stringify({
            userId: res.jwtPayload.id,
            username: res.jwtPayload.username,
            fk_store: res.jwtPayload.fk_store,
        }),
    });

    if (!response) {
        await transaction.rollback();
        return res.status(500).json(InfoResponse(500, "Internal server error"));
    }

    try {
        await updatePurchase(
            purchase.id!,
            {
                ...purchase,
                payment_id: response.flowOrder.toString(),
                payment_method: 1,
            },
            transaction
        );
    } catch (err: any) {
        await transaction.rollback();
        dbErrors(err, res);
        return next();
    }

    try {
        await createPurchaseItems(
            items_buy.items.map((item) => ({
                ...item,
                fk_purchase: purchase.id!,
            })),
            transaction
        );

        await transaction.commit();

        res.status(200).json({
            id: purchase.id,
            url_pay: `${response.url}?token=${response.token}`,
            pay_flow_id: response.flowOrder,
        });

        return next();
    } catch (err: any) {
        await transaction.rollback();
        dbErrors(err, res);
        next();
    }
};

const getTotalPayment = async (
    items: buyProcessPOST
): Promise<Items_Cart | null> => {
    const ids = items.products.map((item) => item.id);

    let products;
    try {
        products = await getManyProducts(ids);
    } catch (err: any) {
        return null;
    }

    if (!products) return null;
    // validate if all products are found
    if (products.find((product) => !product)) return null;

    let total_price = 0;
    let items_cart: Purchases_Items_No_Purchase[] = [];
    for (const product of products) {
        const item = items.products.find((item) => item.id === product.id);
        if (!item) continue;
        const price = product.price * item.quantity;
        total_price += price;

        items_cart.push({
            quantity: item.quantity,
            price,
            fk_product: product.id!,
        });
    }

    return {
        items: items_cart,
        total_price,
    };
};

type Purchases_Items_No_Purchase = Omit<Purchases_Items, "fk_purchase">;

interface Items_Cart {
    items: Purchases_Items_No_Purchase[];
    total_price: number;
}
