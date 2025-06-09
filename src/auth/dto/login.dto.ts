import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'paulo@exemple.com'})
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @ApiProperty({example: '123qwe'})
    password: string;
}


export class LoginResponseDto{
    @ApiProperty()
    access_token: string
}