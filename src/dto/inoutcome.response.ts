export class InOutComeResponse {
    meta?: Meta;
    data?: DataInOutCome[];
}

export class Meta {
    code?: number;
    status?: string;
    message?: string;
}

export class DataInOutCome {
    id_history?: number
    id_user?: number
    type?: string
    date?: string
    total?: string
    details?: Detail[]
}

export class Detail {
    name?: string
    price?: string
}