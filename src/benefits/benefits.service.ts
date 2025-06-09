import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBenefitDto } from './dto/create-benefit.dto';
import { UpdateBenefitDto } from './dto/update-benefit.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Benefits } from './schemas/benefits.schema';

@Injectable()
export class BenefitsService {
    constructor(@InjectModel(Benefits.name) private beneftisModel: Model<Benefits>) { }

    async create(createBenefitDto: CreateBenefitDto): Promise<Benefits> {
        const createdBenefit = new this.beneftisModel(createBenefitDto);
        return createdBenefit.save()
    }

    async findAll(): Promise<Benefits[]> {
        return this.beneftisModel.find().exec()
    }

    async findOne(id: string): Promise<Benefits> {
        return this.beneftisModel.findById(id)
    }

    async update(id: string, updateBenefitDto: UpdateBenefitDto) {
        const benefit = await this.beneftisModel.findByIdAndUpdate(id, updateBenefitDto).exec()
        if (!benefit) throw new NotFoundException("Benefício não encontrado")

        return updateBenefitDto
    }

    async remove(id: string): Promise<void> {
        const benefit = await this.beneftisModel.findByIdAndDelete(id).exec()
        if (!benefit) throw new NotFoundException("Benefício não encontrado")
    }
}
