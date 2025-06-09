import { ApiProperty } from "@nestjs/swagger";

export class CreateVoucherDto {
    @ApiProperty({ example: '684096c40938487a4ee70b9a' })
    userId: string;

    @ApiProperty({ example: '68474d8212ac38fd46d66b0f' })
    benefitId: string;

    @ApiProperty({ example: '100.0' })
    value: number;

    @ApiProperty({ example: '2025-02-12' })
    expiresAt: Date
}