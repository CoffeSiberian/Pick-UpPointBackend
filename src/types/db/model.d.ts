export interface Stores {
    id: string;
    name: string;
    location: string;
    phone: string;
    email: string;
}

export interface Configs {
    id: string;
    payment_method: string | null?;
    api_key_public: string | null?;
    api_key_private: string | null?;
    logo: string;
    adminname: string;
    adminemail: string;
    adminpassword: string;
    fk_store: string;
}

export interface Users {
    id: string;
    rut: string;
    name: string;
    email: string;
    password: string;
    fk_store: string;
}

export interface Categories {
    id: string;
    name: string;
    fk_store: string;
}

export interface Images_Products {
    id: string;
    name: string;
    src: string;
    fk_products: string;
}

export interface Products {
    id: string;
    name: string;
    description: string;
    price: number;
    fk_category: string;
}

export interface Stocks {
    id: string;
    quantity: number;
    fk_store: string;
    fk_product: string;
}

export interface Purchases {
    id: string;
    total: number;
    date: Date;
    status: string;
    payment_method: string | null?;
    payment_id: string | null?;
    payment_successful: boolean;
    retired: boolean;
    fk_user: string;
}

export interface Purchases_Items {
    id: string;
    quantity: number;
    fk_purchase: string;
    fk_product: string;
}
