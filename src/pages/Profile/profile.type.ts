export type ProfileResponse = {
    token: string;
    people: People;
    permissions: Permi[];
    user: User;
    phones: Phones[];
    addresses: Addresses[];
};

export type Permi = {
    permission: string;
}

export type User = {
    id: string;
    user: string,
    people_id: number;
}

export type People = {
    name: string;
    last_name: string;
    document: string;
    birth_date: string;
    created_at?: string;
    deleted_at?: string;    
}    

export type Phones = {
    id: string;
    ddd: string;
    phone: string;
    type: string;
}

export type Addresses = {
    id: string;
    postal_code: string;
    public_place: string;
    district: string;
    city: string;
    uf: string;
    complement: string;
}