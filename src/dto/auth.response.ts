export interface AuthResponse {
    meta : Meta;
    data : Data;
}

export interface Meta {
    code: number;
    status: string;
    message: string;
}

export interface Data {
    access_token?: string;
    token_type?: string;
    user?: User;
    message?: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
}