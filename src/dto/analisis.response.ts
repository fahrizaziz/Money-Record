export class AnalisisResponse {
    meta?: Meta;
    data?: Data;
}

export class Meta {
    code?: number;
    status?: string;
    message?: string;
}

export class Data {
    data?: DataAnalisis[]
}

export class DataAnalisis {
    today?: number;
    yesterday?: number;
    week?: number[];
    month?: Month;
    message?: string;
}

export class Month {
    income?: number;
    outcome?: number;
}