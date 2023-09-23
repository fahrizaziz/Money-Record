import { ApiProperty } from "@nestjs/swagger";

export class Register {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    created_at: Date;
    @ApiProperty()
    updated_at: Date;
}