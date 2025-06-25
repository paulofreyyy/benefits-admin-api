import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindVouchersQueryDto {
    @ApiPropertyOptional({ description: 'ID do usuário (userId)', type: String })
    userId?: string;

    @ApiPropertyOptional({ description: 'Status do voucher', enum: ['active', 'used', 'expired'] })
    status?: string;
}
