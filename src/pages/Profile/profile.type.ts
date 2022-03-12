export type ProfileResponse = {
    token: string;
    people: People[];
    permissions: Permi[];
    user: User[];
};

export type Permi = {
    permission: string;
}

export type User = {
    id: string;
    people_id: number;
}

export type People = {
    created_at?: string;
    deleted_at?: string;
    document: string;
    name: string;
    last_name: string;
}    