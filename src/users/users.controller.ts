import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()
    getUsers(){
        return this.usersService.findAll()
    }

    @Get(':userId')
    getUserProfile(@Param('userId') userId: string){
        return this.usersService.getUserProfile(userId)
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto){
        return this.usersService.create(createUserDto);
    }
}
