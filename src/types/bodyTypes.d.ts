interface UserPost {
    rut: string;
    name: string;
    email: string;
    password: string;
}

interface ConfigPost {
    payment_method: string | null?;
    api_key_public: string | null?;
    api_key_private: string | null?;
    logo: string;
    adminname: string;
    adminemail: string;
    adminpassword: string;
}

interface CategoriePost {
    name: string;
}

interface ProductPost {
    name: string;
    description: string;
    price: number;
    fk_category: string;
}

interface buyProcessPOST {
    products: {
        id: string;
        quantity: number;
    }[];
}
