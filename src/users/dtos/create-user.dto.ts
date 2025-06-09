import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'Paulo', description: 'Nome do usuário'})
    firstName: string;
    
    @ApiProperty({example: 'Pereira', description: 'Sobrenome do usuário'})
    lastName: string;

    @ApiProperty({example: 'paulo@exemple.com', description: 'E-mail do usuário'})
    email: string;

    @ApiProperty({example: '123qwe', description: 'Senha do usuário'})
    password: string;
}