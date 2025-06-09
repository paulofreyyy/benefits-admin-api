import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'paulo@exemple.com', description: 'E-mail do usuário'})
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Paulo', description: 'Nome do usuário'})
    firstName: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Pereira', description: 'Sobrenome do usuário'})
    lastName: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @ApiProperty({example: '123qwe', description: 'Senha do usuário'})
    password: string;
}
