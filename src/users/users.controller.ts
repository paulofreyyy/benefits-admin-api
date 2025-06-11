import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    @ApiOperation({ summary: 'Retorna usuários cadastrados' })
    @ApiResponse({ status: 201, description: "Usuários retornados com sucesso." })
    @ApiBadRequestResponse({ description: 'Dados inválidos' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado' })
    getUsers() {
        return this.usersService.findAll()
    }

    @Post()
    @ApiOperation({ summary: 'Cria um novo usuário' })
    @ApiResponse({ status: 201, description: "Usuário criado com sucesso." })
    @ApiBadRequestResponse({ description: 'Dados inválidos' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado' })
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get(':userId')
    @ApiOperation({ summary: 'Retorna perfil do usuário' })
    @ApiResponse({ status: 201, description: "Perfil carregado com sucesso." })
    @ApiBadRequestResponse({ description: 'Dados inválidos' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado' })
    getProfile(@Param('userId') userId: string) {
        return this.usersService.getProfile(userId)
    }
}
