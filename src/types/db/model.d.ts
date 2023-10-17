export interface Users {
    id: string;
    fk_company_id: number;

    created_at: Date;
    updated_at: Date;
}

export interface Companys {
    id: string;

    created_at: Date;
    updated_at: Date;
}
