import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private usersModel: Model<Users>) { }

    async create(createUserDto: CreateUserDto): Promise<Users> {
        const createUser = new this.usersModel(createUserDto);
        return createUser.save()
    }

    async findAll(): Promise<Users[]> {
        return this.usersModel.find().exec()
    }

    async findOne(email: string): Promise<Users> {
        return this.usersModel.findOne({ email }).exec()
    }

    async getUserProfile(userId: string): Promise<Users> {
        const user = this.usersModel.findById(userId);
        if (!user) throw new NotFoundException("Usuário não encontrado")

        return user
    }
}
