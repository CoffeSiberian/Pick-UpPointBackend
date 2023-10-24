interface UserPost {
    rut: string;
    name: string;
    email: string;
    password: string;
    fk_store: string;
}

interface ConfigPost {
    payment_method: string | null?;
    api_key_public: string | null?;
    api_key_private: string | null?;
    logo: string;
    adminname: string;
    adminemail: string;
    adminpassword: string;
    fk_store: string;
}
