import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @ApiProperty()
    password: string;
}
