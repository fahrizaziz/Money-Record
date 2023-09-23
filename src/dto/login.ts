import { ApiProperty } from "@nestjs/swagger";

export class Login {
    id: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}