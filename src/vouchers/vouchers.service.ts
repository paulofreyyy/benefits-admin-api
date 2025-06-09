import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vouchers } from './schemas/vouchers.schema';
import { CreateVoucherDto } from './dtos/create-voucher.dto';

@Injectable()
export class VouchersService {
    constructor(@InjectModel(Vouchers.name) private vouchersModel: Model<Vouchers>) { }

    async create(createVoucherDto: CreateVoucherDto): Promise<Vouchers> {
        const createdVoucher = new this.vouchersModel(createVoucherDto);

        if(!createVoucherDto.userId) throw new NotFoundException("Usuário não encontrado")
        if(!createVoucherDto.benefitId) throw new NotFoundException("Benefício não encontrado")

        return createdVoucher.save()
    }

    async findAll(): Promise<Vouchers[]> {
        return this.vouchersModel.find().exec()
    }

    async findOne(id: string): Promise<Vouchers> {
        return this.vouchersModel.findById(id)
    }

    async remove(id: string): Promise<void> {
        const voucher = await this.vouchersModel.findByIdAndDelete(id).exec()
        if (!voucher) throw new NotFoundException("Voucher não encontrado")
    }

    async useVoucher(id: string): Promise<Vouchers> {
        const voucher = await this.vouchersModel.findById(id).exec()
        if (!voucher) throw new NotFoundException("Voucher não encontrado");

        const now = new Date();

        if (voucher.status === 'active' && voucher.expiresAt < now) {
            voucher.status = 'expired'
            await voucher.save()
            throw new BadRequestException('Voucher expirado');
        }

        voucher.status = 'used';
        voucher.usedAt = now

        return voucher.save()
    }
}
