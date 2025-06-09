import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BenefitsService } from './benefits.service';
import { CreateBenefitDto } from './dto/create-benefit.dto';
import { UpdateBenefitDto } from './dto/update-benefit.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('benefits')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class BenefitsController {
    constructor(private readonly benefitsService: BenefitsService) { }

    @Post()
    @ApiOperation({summary: 'Cria um novo benefício'})
    @ApiResponse({status: 201, description: "Benefício criado com sucesso", type: CreateBenefitDto})
    create(@Body() createBenefitDto: CreateBenefitDto) {
        return this.benefitsService.create(createBenefitDto);
    }
    
    @Get()
    @ApiResponse({status: 200, description: "Benefícios retornados com sucesso"})
    @ApiOperation({summary: 'Retorna todos os beneficios cadastrados'})
    findAll() {
        return this.benefitsService.findAll();
    }
    
    @Get(':id')
    @ApiResponse({status: 200, description: "Benefício retornado com sucesso"})
    @ApiResponse({status: 204, description: "Benefício não encontrado"})
    @ApiOperation({summary: 'Retorna um benefício por ID'})
    findOne(@Param('id') id: string) {
        return this.benefitsService.findOne(id);
    }
    
    @Patch(':id')
    @ApiOperation({summary: 'Atualiza as informações de um benefício'})
    @ApiResponse({status: 200, description: "Benefício atualizado com sucesso", type: UpdateBenefitDto})
    @ApiResponse({status: 204, description: "Benefício não encontrado"})
    update(@Param('id') id: string, @Body() updateBenefitDto: UpdateBenefitDto) {
        return this.benefitsService.update(id, updateBenefitDto);
    }
    
    @Delete(':id')
    @ApiResponse({status: 200, description: "Benefício removido com sucesso"})
    @ApiResponse({status: 204, description: "Benefício não encontrado"})
    @ApiOperation({summary: 'Remove um benefício cadastrado'})
    remove(@Param('id') id: string) {
        return this.benefitsService.remove(id);
    }
}
