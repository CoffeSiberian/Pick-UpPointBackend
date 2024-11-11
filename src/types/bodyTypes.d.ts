interface UserPost {
    rut: string;
    name: string;
    email: string;
    password: string;
}

type UserPostOptionalPassword = Omit<UserPost, "password"> &
    Partial<Pick<UserPost, "password">>;

interface UserPostRegister extends UserPost {
    fk_store: string;
}

interface ConfigPost {
    payment_method: string | null?;
    api_key_public: string | null?;
    api_key_private: string | null?;
    logo: string;
}

interface CategoriePost {
    name: string;
}

interface ProductPost {
    name: string;
    description: string;
    price: number;
    stock: number;
    fk_category: string;
}

interface buyProcessPOST {
    products: {
        id: string;
        quantity: number;
    }[];
}

interface LoginAdmin {
    username: string;
    password: string;
    fk_store: string;
}

interface LoginUser {
    email: string;
    password: string;
    fk_store: string;
}
