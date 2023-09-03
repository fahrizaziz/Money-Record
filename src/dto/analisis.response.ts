export interface AnalisisResponse {
    meta : Meta;
    data: Data;
}

export interface Meta {
    code?: number;
    status?: string;
    message: string;
}

export interface Data {
    today?: number;
    yesterday?: number;
    week?: number[];
    month?: Month;
    message?: string;
}

export interface Month {
    income: number;
    outcome: number;
}