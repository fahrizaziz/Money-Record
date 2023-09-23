import { ApiProperty } from "@nestjs/swagger";

export class Login {
    id: string;
    @ApiProperty({default: 'aziz@mail.com'})
    email: string;
    @ApiProperty({default: 'aziz0210'})
    password: string;
}