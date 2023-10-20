export interface Stores {
    id: string;
    name: string;
    location: string;

    created_at: Date;
    updated_at: Date;
}

export interface Configs {
    id: string;
    payment_method: string | null?;
    api_key_private: string;
    api_key_public: string;
    fk_store: string;

    created_at: Date;
    updated_at: Date;
}

export interface Users {
    id: string;
    rut: string;
    name: string;
    email: string;
    password: string;
    fk_store: string;

    created_at: Date;
    updated_at: Date;
}

export interface Categories {
    id: string;
    name: string;
    fk_store: string;

    created_at: Date;
    updated_at: Date;
}

export interface Products {
    id: string;
    name: string;
    price: number;
    fk_category: string;

    created_at: Date;
    updated_at: Date;
}

export interface Stocks {
    id: string;
    quantity: number;
    fk_store: string;
    fk_product: string;

    created_at: Date;
    updated_at: Date;
}

export interface Purchases {
    id: string;
    total: number;
    fk_user: string;

    created_at: Date;
    updated_at: Date;
}

export interface Purchases_Items {
    id: string;
    quantity: number;
    fk_purchase: string;
    fk_product: string;

    created_at: Date;
    updated_at: Date;
}
