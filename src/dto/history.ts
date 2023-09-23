import { ApiProperty } from "@nestjs/swagger";

export class IncomeOutcome {
    @ApiProperty()
    id_user: number
    @ApiProperty()
    type: string
    @ApiProperty()
    date: string
}

export class Analisis {
    @ApiProperty()
    id_user: number;
    @ApiProperty()
    today: Date;
}

export class AddHistory {
    @ApiProperty()
    id_user: number;
    @ApiProperty()
    type: string;
    @ApiProperty()
    date : string;
    @ApiProperty()
    total: string;
    @ApiProperty()
    details: string;
    created_at: Date;
    updated_at: Date;
}

export class HistoryDto {
    @ApiProperty()
    id_user: number;
    @ApiProperty()
    date: string
}

export class DeleteHistory {
    @ApiProperty()
    id_history: number
}
export class UpdateHistory {
    @ApiProperty()
    id_user: number;
    @ApiProperty()
    type: string;
    @ApiProperty()
    date : string;
    @ApiProperty()
    total: string;
    @ApiProperty()
    details: string;
    created_at: Date;
    updated_at: Date;
}