export class IncomeOutcome {
    id_user: number
    type: string
    date: string
}

export class Analisis {
    id_user: number;
    today: Date;
}

export class AddHistory {
    id_user: number;
    type: string;
    date : string;
    total: string;
    details: string;
    created_at: Date;
    updated_at: Date;
}

export class HistoryDto {
    id_user: number;
    date: string
}

export class DeleteHistory {
    id_history: number
}

export class UpdateHistory {
    id_user: number;
    type: string;
    date : string;
    total: string;
    details: string;
    created_at: Date;
    updated_at: Date;
}