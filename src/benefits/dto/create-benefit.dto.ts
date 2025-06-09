import { ApiProperty } from "@nestjs/swagger";

export class CreateBenefitDto {
    @ApiProperty({example: 'Vale alimentação'})
    name: string;
    
    @ApiProperty({example: 'Saldo destinado para alimentação (Mercado)'})
    description: string;
}