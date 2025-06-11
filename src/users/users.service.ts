import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private usersModel: Model<Users>) { }

    async create(createUserDto: CreateUserDto): Promise<Users> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const userData ={
            ...createUserDto,
            password: hashedPassword
        }
        const createUser = new this.usersModel(userData);
        return createUser.save()
    }

    async findAll(): Promise<Users[]> {
        return this.usersModel.find().exec()
    }

    async findOne(email: string): Promise<Users> {
        return this.usersModel.findOne({ email }).exec()
    }

    async getProfile(userId: string): Promise<Users> {
        const user = this.usersModel.findById(userId)
        if (!user) throw new NotFoundException("Usuário não encontrado")

        return user
    }
}
