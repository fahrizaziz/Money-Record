export interface HistoryResponse {
    meta : Meta;
    data: Data;
}

export interface Meta {
    code?: number;
    status?: string;
    message: string;
}

export interface Data {
    id_user?: string;
    type?: string;
    date? : Date;
    total?: string;
    details?: string;
    created_at?: Date;
    updated_at?: Date;
    user?: User;
    message?: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
}