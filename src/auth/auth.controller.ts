import { Body, Controller, Get, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { RegisterDto } from './dto/register.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { UserProfileDto } from './dto/user-profile.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Realiza login de usuário cadastrado' })
    @ApiResponse({ status: 201, description: 'Login realizado com sucesso', type: LoginResponseDto })
    @ApiBadRequestResponse({ description: 'Dados inválidos' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado' })
    signIn(@Body() signInDto: LoginDto): Promise<LoginResponseDto> {
        return this.authService.signIn(signInDto.email, signInDto.password)
    }

    @Post('register')
    @ApiOperation({ summary: 'Registra um novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso.' })
    @ApiConflictResponse({ description: 'Usuário já registrado anteriormente' })
    @ApiBadRequestResponse({ description: 'Dados inválidos' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado' })
    register(@Body(new ValidationPipe()) registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retorna perfil de usuário logado' })
    @ApiResponse({ status: 200, description: "Perfil obtido com sucesso", type: UserProfileDto })
    @ApiBadRequestResponse({ description: 'Dados inválidos' })
    @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
    @ApiUnauthorizedResponse({ description: 'Token ausente ou inválido' })
    getProfile(@Request() req):Promise<UserProfileDto> {
        return req.user;
    }

}
