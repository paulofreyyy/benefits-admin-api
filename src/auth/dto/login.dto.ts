import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'paulo@exemple.com', description: 'E-mail cadastrado pelo usuário'})
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @ApiProperty({example: '123qwe', description: 'Senha cadastrada pelo usuário'})
    password: string;
}


export class LoginResponseDto{
    @ApiProperty()
    access_token: string
}