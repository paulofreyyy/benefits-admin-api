import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { RegisterDto } from './dto/register.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiResponse({status: 201,description:'Login realizado com sucesso'})
    signIn(@Body() signInDto: LoginDto) {
        return this.authService.signIn(signInDto.email, signInDto.password)
    }

    @Post('register')
    @ApiCreatedResponse({description:'Usuário registrado com sucesso.'})
    @ApiResponse({status: 409, description:'Usuário já registrado anteriormente.'})
    register(@Body(new ValidationPipe()) registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
    
    @UseGuards(AuthGuard)
    @Get('profile')
    @ApiBearerAuth()
    @ApiResponse({status: 401, description:"Usuário não autenticado"})
    @ApiResponse({status: 200, description:"Perfil de usuário autenticado."})
    getProfile(@Request() req) {
        return req.user;
    }

}
