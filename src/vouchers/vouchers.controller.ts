import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { CreateVoucherDto } from './dtos/create-voucher.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('vouchers')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class VouchersController {
    constructor(private readonly vouchersService: VouchersService) { }

    @Post()
    @ApiOperation({ summary: 'Cria um novo voucher' })
    @ApiResponse({ status: 201, description: "Voucher criado com sucesso", type: CreateVoucherDto })
    @ApiBadRequestResponse({ description: 'Dados inválidos' })
    @ApiUnauthorizedResponse({ description: 'Token ausente ou inválido' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado' })
    create(@Body() createBenefitDto: CreateVoucherDto) {
        return this.vouchersService.create(createBenefitDto);
    }

    @Get()
    @ApiOperation({ summary: 'Retorna todos os beneficios cadastrados' })
    @ApiResponse({ status: 200, description: "Vouchers retornados com sucesso" })
    @ApiBadRequestResponse({ description: 'Dados inválidos' })
    @ApiUnauthorizedResponse({ description: 'Token ausente ou inválido' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado' })
    findAll() {
        return this.vouchersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Retorna um voucher por ID' })
    @ApiResponse({ status: 200, description: "Voucher retornado com sucesso" })
    @ApiBadRequestResponse({ description: 'Dados inválidos' })
    @ApiUnauthorizedResponse({ description: 'Token ausente ou inválido' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado' })
    findOne(@Param('id') id: string) {
        return this.vouchersService.findOne(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove um voucher cadastrado' })
    @ApiResponse({ status: 200, description: "Voucher removido com sucesso" })
    @ApiResponse({ status: 204, description: "Voucher não encontrado" })
    @ApiBadRequestResponse({ description: 'Dados inválidos' })
    @ApiUnauthorizedResponse({ description: 'Token ausente ou inválido' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado' })
    remove(@Param('id') id: string) {
        return this.vouchersService.remove(id);
    }

    @Post('useVoucher/:id')
    @ApiOperation({ summary: 'Utiliza um voucher cadastrado' })
    @ApiResponse({ status: 200, description: "Voucher utilizado com sucesso" })
    @ApiResponse({ status: 204, description: "Voucher não encontrado" })
    @ApiBadRequestResponse({ description: 'Dados inválidos' })
    @ApiUnauthorizedResponse({ description: 'Token ausente ou inválido' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado' })
    useVoucher(@Param('id') id: string) {
        return this.vouchersService.useVoucher(id)
    }
}
