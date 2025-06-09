import { ApiProperty } from "@nestjs/swagger";

export class CreateVoucherDto {
    @ApiProperty({ example: '684096c40938487a4ee70b9a', description: 'ID do usuário' })
    userId: string;

    @ApiProperty({ example: '68474d8212ac38fd46d66b0f', description: 'ID do benefício' })
    benefitId: string;

    @ApiProperty({ example: '100.0', description: 'Valor do voucher' })
    value: number;

    @ApiProperty({ example: '2025-02-12', description: 'Data de expiração' })
    expiresAt: Date
}