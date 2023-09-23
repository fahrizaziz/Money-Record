import { ApiProperty } from "@nestjs/swagger";

export class Register {
    @ApiProperty({default: 'aziz@gmail.com'})
    email: string;
    @ApiProperty({default: 'aziz02100'})
    password: string;
    @ApiProperty({default: 'aziz'})
    name: string;
    created_at: Date;
    updated_at: Date;
}