import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async signIn(email: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findOne(email);
        if (user?.password !== pass) throw new UnauthorizedException()

        const payload = { sub: user._id.toString(), email: user.email }

        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }

    async register(registerDto: RegisterDto): Promise<{ message: string }> {
        const { email, password, firstName, lastName, role } = registerDto;

        const existingUser = await this.usersService.findOne(email);
        if (existingUser) {
            throw new ConflictException('Usuário já existe');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await this.usersService.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: 'user'
        });

        return { message: 'Usuário criado com sucesso' };
    }
}
