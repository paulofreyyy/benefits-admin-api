import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
