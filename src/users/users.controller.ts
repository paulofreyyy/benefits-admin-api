import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    @ApiOkResponse({description: "Usuários retornados com sucesso."})
    getUsers() {
        return this.usersService.findAll()
    }
    
    @Post()
    @ApiCreatedResponse({description: "Usuário criado com sucesso."})
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
}
