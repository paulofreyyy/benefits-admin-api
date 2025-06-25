import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Vouchers } from './schemas/vouchers.schema';
import { CreateVoucherDto } from './dtos/create-voucher.dto';
import { FindVouchersQueryDto } from './dtos/find-vouchers-query.dto';

@Injectable()
export class VouchersService {
    constructor(@InjectModel(Vouchers.name) private vouchersModel: Model<Vouchers>) { }

    async create(createVoucherDto: CreateVoucherDto): Promise<Vouchers> {
        const createdVoucher = new this.vouchersModel({
            ...createVoucherDto,
            userId: new Types.ObjectId(createVoucherDto.userId),
            benefitId: new Types.ObjectId(createVoucherDto.benefitId),
        });

        if (!createVoucherDto.userId) throw new NotFoundException("Usuário não encontrado")
        if (!createVoucherDto.benefitId) throw new NotFoundException("Benefício não encontrado")

        if (new Date(createVoucherDto.expiresAt) < new Date()) {
            throw new BadRequestException('Data de expiração não pode ser menor que a data atual');
        }

        const activeVouchers = await this.findVouchers({ userId: createVoucherDto.userId.toString(), status: 'active' });
        if (activeVouchers.length > 0) throw new BadRequestException('Usuário já possui um voucher ativo');

        return createdVoucher.save()
    }

    async findOne(id: string): Promise<Vouchers> {
        return this.vouchersModel.findById(id)
    }

    async findVouchers(filters: FindVouchersQueryDto): Promise<Vouchers[]> {
        const query: any = {};

        if (filters.userId) query.userId = new Types.ObjectId(filters.userId);
        if (filters.status) query.status = filters.status;

        return this.vouchersModel.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: 'benefits',
                    localField: 'benefitId',
                    foreignField: '_id',
                    as: 'benefit'
                }
            },
            { $unwind: { path: '$benefit', preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    userId: 1,
                    value: 1,
                    status: 1,
                    expiresAt: 1,
                    benefit: { name: 1, description: 1 }
                }
            }
        ]).exec()
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
