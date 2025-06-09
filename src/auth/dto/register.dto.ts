import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'paulo@exemple.com'})
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Paulo'})
    firstName: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({example: 'Pereira'})
    lastName: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @ApiProperty({example: '123qwe'})
    password: string;
}
