import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { RegisterDto } from './dto/register.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { UserProfileDto } from './dto/user-profile.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOperation({summary: 'Realiza login de usuário cadastrado'})
    @ApiResponse({status: 201,description:'Login realizado com sucesso', type: LoginResponseDto})
    @ApiResponse({status: 401,description:'Credenciais inválidas'})
    signIn(@Body() signInDto: LoginDto) {
        return this.authService.signIn(signInDto.email, signInDto.password)
    }

    @Post('register')
    @ApiOperation({summary: 'Registra um novo usuário'})
    @ApiResponse({status: 201, description:'Usuário registrado com sucesso.'})
    @ApiResponse({status: 400, description:'Dados inválidos.'})
    @ApiResponse({status: 409, description:'Usuário já registrado anteriormente.'})
    register(@Body(new ValidationPipe()) registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
    
    @UseGuards(AuthGuard)
    @Get('profile')
    @ApiBearerAuth()
    @ApiOperation({summary: 'Retorna perfil de usuário logado'})
    @ApiResponse({status: 401, description:"Usuário não autenticado"})
    @ApiResponse({status: 200, description:"Perfil de usuário autenticado.", type: UserProfileDto})
    getProfile(@Request() req) {
        return req.user;
    }

}
