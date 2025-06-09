import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { CreateVoucherDto } from './dtos/create-voucher.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('vouchers')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class VouchersController {
    constructor(private readonly vouchersService: VouchersService) { }

    @Post()
    @ApiOperation({ summary: 'Cria um novo voucher' })
    @ApiResponse({ status: 201, description: "Voucher criado com sucesso", type: CreateVoucherDto })
    create(@Body() createBenefitDto: CreateVoucherDto) {
        return this.vouchersService.create(createBenefitDto);
    }

    @Get()
    @ApiResponse({ status: 200, description: "Vouchers retornados com sucesso" })
    @ApiOperation({ summary: 'Retorna todos os beneficios cadastrados' })
    findAll() {
        return this.vouchersService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: "Voucher retornado com sucesso" })
    @ApiResponse({ status: 204, description: "Voucher não encontrado" })
    @ApiOperation({ summary: 'Retorna um voucher por ID' })
    findOne(@Param('id') id: string) {
        return this.vouchersService.findOne(id);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: "Voucher removido com sucesso" })
    @ApiResponse({ status: 204, description: "Voucher não encontrado" })
    @ApiOperation({ summary: 'Remove um voucher cadastrado' })
    remove(@Param('id') id: string) {
        return this.vouchersService.remove(id);
    }

    @Post('useVoucher/:id')
    @ApiResponse({ status: 200, description: "Voucher utilizado com sucesso" })
    @ApiResponse({ status: 204, description: "Voucher não encontrado" })
    @ApiOperation({ summary: 'Utiliza um voucher cadastrado' })
    useVoucher(@Param('id') id: string) {
        return this.vouchersService.useVoucher(id)
    }
}
