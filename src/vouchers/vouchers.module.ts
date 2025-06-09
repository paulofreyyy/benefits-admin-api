import { Module } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { VouchersController } from './vouchers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Vouchers, VouchersSchema } from './schemas/vouchers.schema';

@Module({
    controllers: [VouchersController],
    providers: [VouchersService],
    imports: [MongooseModule.forFeature([{ name: Vouchers.name, schema: VouchersSchema }])],
    exports: [VouchersService]
})
export class VouchersModule { }
