import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'Paulo'})
    firstName: string;
    
    @ApiProperty({example: 'Pereira'})
    lastName: string;

    @ApiProperty({example: 'paulo@exemple.com'})
    email: string;

    @ApiProperty({example: '123qwe'})
    password: string;
}