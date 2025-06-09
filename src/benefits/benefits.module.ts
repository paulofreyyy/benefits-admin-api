import { Module } from '@nestjs/common';
import { BenefitsService } from './benefits.service';
import { BenefitsController } from './benefits.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Benefits, BenefitsSchema } from './schemas/benefits.schema';

@Module({
    controllers: [BenefitsController],
    providers: [BenefitsService],
    imports: [MongooseModule.forFeature([{ name: Benefits.name, schema: BenefitsSchema }])],
    exports: [BenefitsService]
})
export class BenefitsModule { }
