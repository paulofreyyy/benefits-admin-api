import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BenefitsModule } from './benefits/benefits.module';
import { VouchersModule } from './vouchers/vouchers.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/beneftisAdmin'),
        UsersModule,
        AuthModule,
        BenefitsModule,
        VouchersModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
