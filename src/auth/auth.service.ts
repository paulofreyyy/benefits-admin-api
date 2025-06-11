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

    async signIn(email: string, pass: string): Promise<{ access_token: string, userId: unknown }> {
        const user = await this.usersService.findOne(email);
        if (!user) throw new UnauthorizedException('Credenciais inválidas: Usuário não encontrado')
        const isMatch = await bcrypt.compare(pass, user.password);
        if (!isMatch) throw new UnauthorizedException('Credenciais inválidas: Senha incorreta');

        const payload = { sub: user._id.toString(), email: user.email }

        return {
            access_token: await this.jwtService.signAsync(payload),
            userId: user._id
        }
    }

    async register(registerDto: RegisterDto): Promise<{ message: string }> {
        const { email, password, firstName, lastName } = registerDto;

        const existingUser = await this.usersService.findOne(email);
        if (existingUser) {
            throw new ConflictException('Usuário já existe');
        }

        await this.usersService.create({
            firstName,
            lastName,
            email,
            password,
        });

        return { message: 'Usuário criado com sucesso' };
    }
}
