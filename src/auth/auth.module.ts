import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '1h'}
        })
    ],
    exports: [AuthService]
})
export class AuthModule { }
