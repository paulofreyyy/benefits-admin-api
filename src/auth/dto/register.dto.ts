import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    firstName: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    lastName: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @ApiProperty()
    password: string;
}
