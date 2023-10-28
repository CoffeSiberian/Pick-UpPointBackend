import { Request, NextFunction } from "express";
import { buyProcessSchema } from "../../schemas/ProductsSch";
import { createPurchasesWithItems } from "../../repositories/PurchasesR";
import { getManyProducts } from "../../repositories/ProductsR";
import { v4 as uuidv4 } from "uuid";
import { InfoResponse } from "../../utils/InfoResponse";
import { ResponseJwt } from "../../types/ResponseExtends";
import { Purchases as PurchaseType } from "../../types/db/model";

export const postBuyItems = async (
    req: Request,
    res: ResponseJwt,
    next: NextFunction
): Promise<any> => {
    const { error, value } = buyProcessSchema.validate(req.body);
    if (error) return next({ error });
    const body = value as buyProcessPOST;

    const purchase = await getTotalPayment(body, res.jwtPayload.id);

    try {
        if (!purchase) return next({ error: "Products not found" });
        await createPurchasesWithItems(purchase.purchase, purchase.products);
        res.status(200).json(InfoResponse(200, "Created"));
        return next();
    } catch (err: any) {
        next({ err });
    }
};

const getTotalPayment = async (
    items: buyProcessPOST,
    fk_user: string
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
            status: "pending",
            payment_successful: false,
            retired: false,
            fk_user,
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
