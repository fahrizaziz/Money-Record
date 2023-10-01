export class InOutComeResponse {
    meta?: Meta;
    data?: Data;
}

export class Meta {
    code?: number;
    status?: string;
    message?: string;
}

export class Data {
    data?: DataInOutCome[]
}

export class DataInOutCome {
    id_history?: number
    id_user?: number
    type?: string
    date?: string
    total?: string
    details?: string
}